'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, HelpCircle } from 'lucide-react';
import { useTaxFormStore } from '@/hooks/useTaxFormStore';
import { getTotalIncome } from '@/services/other-income';
import { getAdjustmentsToIncome } from '@/services/adjustments';

// Utility for question mark tooltip
const QuestionMark = () => (
  <HelpCircle 
    size={16} 
    className="ml-2 text-gray-400 cursor-help hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
  />
);

// Input field for values that can be adjusted
type AdjustableFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  isRequired?: boolean;
};

const AdjustableField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100000,
  isRequired = false 
}: AdjustableFieldProps) => {
  const { formatNumber } = useTaxFormStore();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    const numValue = parseFloat(rawValue) || 0;
    onChange(numValue);
  };

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 mb-4">
      <div className="flex items-center justify-end">
        <label htmlFor={id} className="text-lg font-medium text-gray-700 dark:text-gray-300 text-right flex-grow">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
        <QuestionMark />
      </div>
      <div className="relative w-full">
        <input
          type="text"
          id={id}
          value={formatNumber(value)}
          onChange={handleChange}
          className="w-full pl-8 p-3 border border-gray-300 dark:border-gray-600 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">$</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
    </div>
  );
};

// Display field for calculated values (non-editable)
type DisplayValueProps = {
  label: string;
  value: number;
  isNegative?: boolean;
};

const DisplayValue = ({ label, value, isNegative = false }: DisplayValueProps) => {
  const { formatNumber } = useTaxFormStore();
  const displayValue = isNegative ? `-$${formatNumber(value)}` : `$${formatNumber(value)}`;
  
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 mb-4">
      <div className="flex items-center justify-end">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300 text-right flex-grow">
          {label}
        </span>
        <QuestionMark />
      </div>
      <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        {displayValue}
      </div>
    </div>
  );
};

// Collapsible section component
type CollapsibleSectionProps = {
  title: string;
  value: number;
  isInitiallyExpanded?: boolean;
  highlightBackground?: boolean;
  children: React.ReactNode;
};

const CollapsibleSection = ({ 
  title, 
  value, 
  isInitiallyExpanded = false,
  highlightBackground = false, 
  children 
}: CollapsibleSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
  const { formatNumber } = useTaxFormStore();
  
  return (
    <div className={`border-b border-gray-200 dark:border-gray-700 ${highlightBackground ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
      <div 
        className="flex items-center justify-between py-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mr-3">
            ${formatNumber(value)}
          </span>
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-6 pb-6 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

// Main component
export default function TaxBreakdown() {
  // State for QBI deduction and AMT adjustments
  const [qbiDeduction, setQbiDeduction] = useState(0);
  const [amtAdjustments, setAmtAdjustments] = useState(0);
  const [premiumTaxCredit, setPremiumTaxCredit] = useState(0);

  const [taxableIncome, setTaxableIncome] = useState(0);
  const [deduction, setDeduction] = useState(0);
  const [adjustments, setAdjustments] = useState(0);
  const [agi, setAgi] = useState(0);
  
  // Get values from the store
  const taxFormState = useTaxFormStore.getState();

  const { totalDeduction } = useTaxFormStore();
  
  const alternativeMinimumTax = 0; // Placeholder

  
  // Simple progressive tax calculation function
  function calculateIncomeTax() {
    const agi = getTotalIncome(taxFormState) - getAdjustmentsToIncome(taxFormState);
    const taxableIncome = agi - taxFormState.totalDeduction - qbiDeduction;
    return taxableIncome;
  }
  
  useEffect(() => {
    console.log(taxFormState.totalDeduction);
  }, [taxFormState])

  useEffect(() => {
    setAgi(getTotalIncome(taxFormState) - getAdjustmentsToIncome(taxFormState));
    setDeduction(totalDeduction);
    setTaxableIncome(Math.max(0, calculateIncomeTax()));
  }, [taxFormState, qbiDeduction, taxFormState.filingStatus]);
  
  return (
    <div className="mt-1">
      {/* Taxable Income Section */}
      <CollapsibleSection
        title="Taxable income:"
        value={taxableIncome}
        isInitiallyExpanded={true}
      >
        <DisplayValue 
          label="Adjusted gross income:"
          value={agi}
        />
        
        <DisplayValue 
          label="Standard or itemized deduction:"
          value={deduction}
        />
        
        <AdjustableField
          id="qbi-deduction"
          label="Qualified business income deduction (Form 8995):"
          value={qbiDeduction}
          onChange={setQbiDeduction}
          isRequired={true}
        />
        
        <DisplayValue 
          label="Taxable income:"
          value={taxableIncome}
        />
      </CollapsibleSection>
      
      {/* Tax Before Credits Section */}
      <CollapsibleSection
        title="Total tax before credits:"
        value={0} 
        highlightBackground={true}
      >
        <DisplayValue 
          label="Income tax:"
          value={0}
        />
        
        <AdjustableField
          id="premium-tax-credit"
          label="Excess advance premium tax credit reconciliation (Form 8962):"
          value={premiumTaxCredit}
          onChange={setPremiumTaxCredit}
          isRequired={true}
        />
        
        <AdjustableField
          id="amt-adjustments"
          label="Alternative minimum tax (AMT) income adjustments:"
          value={amtAdjustments}
          onChange={setAmtAdjustments}
          isRequired={true}
        />
        
        <DisplayValue 
          label="Alternative minimum tax:"
          value={alternativeMinimumTax}
        />
        
        <DisplayValue 
          label="Total tax before credits:"
          value={0} 
        />
      </CollapsibleSection>
    </div>
  );
} 