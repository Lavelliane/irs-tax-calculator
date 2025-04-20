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

// Input field for tax credits
type CreditFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  isRequired?: boolean;
};

const CreditField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 10000,
  isRequired = false 
}: CreditFieldProps) => {
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

// Display-only field for calculated values
type DisplayValueProps = {
  label: string;
  value: number;
};

const DisplayValue = ({ label, value }: DisplayValueProps) => {
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
        ${formatNumber(value)}
      </div>
    </div>
  );
};

export default function TaxCredits() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { formatNumber } = useTaxFormStore();
  
  // Tax credits state
  const [foreignTaxCredit, setForeignTaxCredit] = useState(0);
  const [childDependentCareCredit, setChildDependentCareCredit] = useState(0);
  const [educationCredits, setEducationCredits] = useState(0);
  const [retirementSavingsCredit, setRetirementSavingsCredit] = useState(0);
  const [energyEfficientHomeCredit, setEnergyEfficientHomeCredit] = useState(0);
  const [americanOpportunityCredit, setAmericanOpportunityCredit] = useState(0);
  const [otherNonRefundableCredits, setOtherNonRefundableCredits] = useState(0);
  
  // Calculated values
  const dependentTaxCredits = 0; // This would be calculated based on dependents
  const americanOpportunityNonRefundable = americanOpportunityCredit > 0 ? 
    Math.min(americanOpportunityCredit, 1500) : 0;
  
  // Total tax credits
  const totalTaxCredits = 
    foreignTaxCredit + 
    childDependentCareCredit + 
    educationCredits + 
    retirementSavingsCredit +
    dependentTaxCredits +
    energyEfficientHomeCredit +
    americanOpportunityNonRefundable +
    otherNonRefundableCredits;
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div 
        className="flex items-center justify-between py-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Total tax credits:
        </h2>
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mr-3">
            ${formatNumber(totalTaxCredits)}
          </span>
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-6 pb-6 space-y-2">
          <CreditField
            id="foreign-tax-credit"
            label="Foreign tax credit (Form 1116):"
            value={foreignTaxCredit}
            onChange={setForeignTaxCredit}
            isRequired={true}
            max={10000}
          />
          
          <CreditField
            id="child-dependent-care-credit"
            label="Child and dependent care credit (Form 2441):"
            value={childDependentCareCredit}
            onChange={setChildDependentCareCredit}
            isRequired={true}
            max={5000}
          />
          
          <CreditField
            id="education-credits"
            label="Education credits (Form 8863):"
            value={educationCredits}
            onChange={setEducationCredits}
            isRequired={true}
            max={10000}
          />
          
          <CreditField
            id="retirement-savings-credit"
            label="Retirement savings contributions credit (Form 8880):"
            value={retirementSavingsCredit}
            onChange={setRetirementSavingsCredit}
            isRequired={true}
            max={1000}
          />
          
          <DisplayValue
            label="Dependent tax credits:"
            value={dependentTaxCredits}
          />
          
          <CreditField
            id="energy-efficient-home-credit"
            label="Energy efficient home improvement credit and residential clean energy credit (Form 5695):"
            value={energyEfficientHomeCredit}
            onChange={setEnergyEfficientHomeCredit}
            isRequired={true}
            max={1000}
          />
          
          <CreditField
            id="american-opportunity-credit"
            label="American opportunity credit (Form 8863, line 14):"
            value={americanOpportunityCredit}
            onChange={setAmericanOpportunityCredit}
            isRequired={true}
            max={5000}
          />
          
          <DisplayValue
            label="American opportunity credit non-refundable:"
            value={americanOpportunityNonRefundable}
          />
          
          <CreditField
            id="other-nonrefundable-credits"
            label="Other credits that are not refundable:"
            value={otherNonRefundableCredits}
            onChange={setOtherNonRefundableCredits}
            isRequired={true}
            max={5000}
          />
        </div>
      )}
    </div>
  );
} 