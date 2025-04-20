'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, HelpCircle } from 'lucide-react';
import { useTaxFormStore } from '@/hooks/useTaxFormStore';

// Question mark icon for tooltips
const QuestionMark = () => (
  <HelpCircle 
    size={16} 
    className="ml-2 text-gray-400 cursor-help hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
  />
);

// Input field for tax values
type TaxFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  isRequired?: boolean;
};

const TaxField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100000,
  isRequired = false 
}: TaxFieldProps) => {
  const { formatNumber } = useTaxFormStore();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    const numValue = parseFloat(rawValue) || 0;
    onChange(numValue);
  };

  return (
    <div className="grid grid-cols-[2fr_1fr] items-center gap-4 mb-4">
      <div className="flex items-center justify-end">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300 text-right flex-grow">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </span>
        <QuestionMark />
      </div>
      <div className="flex flex-col">
        <div className="relative">
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
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>${formatNumber(min)}</span>
          <span>${formatNumber(max)}</span>
        </div>
      </div>
    </div>
  );
};

// Display field for calculated/formula values
type FormulaDisplayProps = {
  label: string;
  value: number;
  formula?: string;
};

const FormulaDisplay = ({ label, value, formula }: FormulaDisplayProps) => {
  const { formatNumber } = useTaxFormStore();
  
  return (
    <div className="grid grid-cols-[2fr_1fr] items-center gap-4 mb-4">
      <div className="flex items-center justify-end">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300 text-right flex-grow">
          {label}
        </span>
        <QuestionMark />
      </div>
      <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        {formula ? `${formatNumber(value)} ${formula}` : `$${formatNumber(value)}`}
      </div>
    </div>
  );
};

export default function TaxAfterCredits() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { formatNumber } = useTaxFormStore();
  
  // Additional taxes state
  const [unreportedSocialSecurity, setUnreportedSocialSecurity] = useState(0);
  const [additionalTaxOnIRAs, setAdditionalTaxOnIRAs] = useState(0);
  const [householdEmploymentTaxes, setHouseholdEmploymentTaxes] = useState(0);
  const [firstTimeHomeBuyerCredit, setFirstTimeHomeBuyerCredit] = useState(0);
  
  // Calculate other taxes
  const selfEmploymentTax = 0; // Calculate based on business income
  const medicareSurtax = 0; // Calculate based on income (0.9% over threshold)
  const netInvestmentIncomeTax = 0; // Calculate based on investment income (3.8% over threshold)
  
  // Mock values for display
  const incomeTaxBeforeCredits = 27066;
  const totalTaxCredits = 0;

  // Total tax after credits
  const totalTaxAfterCredits = 
    Math.max(0, incomeTaxBeforeCredits - totalTaxCredits) +
    selfEmploymentTax +
    unreportedSocialSecurity +
    additionalTaxOnIRAs +
    householdEmploymentTaxes +
    firstTimeHomeBuyerCredit +
    medicareSurtax +
    netInvestmentIncomeTax;
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div 
        className="flex items-center justify-between py-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Total tax after credits:
        </h2>
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mr-3">
            ${formatNumber(totalTaxAfterCredits)}
          </span>
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-6 pb-6 space-y-2">
          <FormulaDisplay
            label="Self-employment tax:"
            value={selfEmploymentTax}
          />
          
          <TaxField
            id="unreported-social-security"
            label="Unreported Social Security and Medicare tax (forms 4137 & 5329):"
            value={unreportedSocialSecurity}
            onChange={setUnreportedSocialSecurity}
            isRequired={true}
            max={100000}
          />
          
          <TaxField
            id="additional-ira-tax"
            label="Additional tax on IRAs and other retirement plans (Form 5329):"
            value={additionalTaxOnIRAs}
            onChange={setAdditionalTaxOnIRAs}
            isRequired={true}
            max={100000}
          />
          
          <TaxField
            id="household-employment-taxes"
            label="Household employment taxes (Schedule H):"
            value={householdEmploymentTaxes}
            onChange={setHouseholdEmploymentTaxes}
            isRequired={true}
            max={100000}
          />
          
          <TaxField
            id="first-time-homebuyer-credit"
            label="First-time home buyer credit repayment (Form 5405):"
            value={firstTimeHomeBuyerCredit}
            onChange={setFirstTimeHomeBuyerCredit}
            isRequired={true}
            max={100000}
          />
          
          <FormulaDisplay
            label="Medicare tax sur-tax on earned income (Form 8959):"
            value={medicareSurtax}
            formula="( 0.9% X $0.00 )"
          />
          
          <FormulaDisplay
            label="Net Investment Income Tax (NIIT) (Form 8960):"
            value={netInvestmentIncomeTax}
            formula="( 3.8% X $0.00 )"
          />
        </div>
      )}
    </div>
  );
} 