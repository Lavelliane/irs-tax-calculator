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

// Input field for payment amounts
type PaymentFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  isRequired?: boolean;
};

const PaymentField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100000,
  isRequired = false 
}: PaymentFieldProps) => {
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

// Number input field for entering numbers (not currency)
type NumberFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  isRequired?: boolean;
};

const NumberField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 3,
  isRequired = false 
}: NumberFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(rawValue) || 0;
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
        <input
          type="text"
          id={id}
          value={value.toString()}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};

// Display field for calculated values
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

// Checkbox field for yes/no answers
type CheckboxFieldProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const CheckboxField = ({ id, label, checked, onChange }: CheckboxFieldProps) => {
  return (
    <div className="grid grid-cols-[1fr_2fr] items-center gap-4 mb-4">
      <div className="flex items-center justify-end">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300 text-right flex-grow">
          Your age:
        </span>
        <QuestionMark />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 mr-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={id} className="text-lg text-gray-700 dark:text-gray-300">
          {label}
        </label>
      </div>
    </div>
  );
};

export default function PaymentsAndRefundableCredits() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { formatNumber } = useTaxFormStore();
  
  // State for payments and credits
  const [federalIncomeTaxWithheld, setFederalIncomeTaxWithheld] = useState(0);
  const [estimatedTaxPayments, setEstimatedTaxPayments] = useState(0);
  const [excessSocialSecurity, setExcessSocialSecurity] = useState(0);
  const [otherPayments, setOtherPayments] = useState(0);
  const [netPremiumCredit, setNetPremiumCredit] = useState(0);
  const [otherRefundableCredits, setOtherRefundableCredits] = useState(0);
  const [scholarshipsPenalIncome, setScholarshipsPenalIncome] = useState(0);
  const [nonTaxableCombatPay, setNonTaxableCombatPay] = useState(0);
  const [qualifyingChildrenForEIC, setQualifyingChildrenForEIC] = useState(0);
  
  // Checkbox state
  const [isOver25Under65, setIsOver25Under65] = useState(false);
  const [livedInUS6Months, setLivedInUS6Months] = useState(true);
  const [isQualifyingChild, setIsQualifyingChild] = useState(false);
  
  // Calculated values
  const childTaxCredit = 0; // Calculate based on dependents
  const americanOpportunityRefundable = 0;
  const earnedIncomeCredit = 0; // Calculate based on income and dependents
  
  // Total payments & refundable credits
  const totalPaymentsAndRefundableCredits = 
    federalIncomeTaxWithheld + 
    estimatedTaxPayments + 
    childTaxCredit + 
    excessSocialSecurity + 
    otherPayments + 
    americanOpportunityRefundable +
    netPremiumCredit +
    otherRefundableCredits + 
    earnedIncomeCredit;
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 border-t-2 border-t-green-600 dark:border-t-green-500">
      <div 
        className="flex items-center justify-between py-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Total payments & refundable credits:
        </h2>
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mr-3">
            ${formatNumber(totalPaymentsAndRefundableCredits)}
          </span>
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-6 pb-6 space-y-2">
          <PaymentField
            id="federal-income-tax-withheld"
            label="Federal income tax withheld on forms W-2 and 1099:"
            value={federalIncomeTaxWithheld}
            onChange={setFederalIncomeTaxWithheld}
            isRequired={true}
            max={500000}
          />
          
          <PaymentField
            id="estimated-tax-payments"
            label="Estimated tax payments:"
            value={estimatedTaxPayments}
            onChange={setEstimatedTaxPayments}
            isRequired={true}
            max={500000}
          />
          
          <DisplayValue
            label="Child tax credit (Form 8812):"
            value={childTaxCredit}
          />
          
          <PaymentField
            id="excess-social-security"
            label="Excess Social Security and RRTA tax withheld:"
            value={excessSocialSecurity}
            onChange={setExcessSocialSecurity}
            isRequired={true}
            max={10000}
          />
          
          <PaymentField
            id="other-payments"
            label="Any other payments including amount paid with request for extension:"
            value={otherPayments}
            onChange={setOtherPayments}
            isRequired={true}
            max={500000}
          />
          
          <DisplayValue
            label="American opportunity credit refundable:"
            value={americanOpportunityRefundable}
          />
          
          <PaymentField
            id="net-premium-credit"
            label="Net premium credit (Form 8962):"
            value={netPremiumCredit}
            onChange={setNetPremiumCredit}
            isRequired={true}
            max={100000}
          />
          
          <PaymentField
            id="other-refundable-credits"
            label="Other refundable credits:"
            value={otherRefundableCredits}
            onChange={setOtherRefundableCredits}
            isRequired={true}
            max={500000}
          />
          
          <DisplayValue
            label="Earned income credit (EIC):"
            value={earnedIncomeCredit}
          />
          
          <NumberField
            id="qualifying-children-for-eic"
            label="Qualifying children for EIC:"
            value={qualifyingChildrenForEIC}
            onChange={setQualifyingChildrenForEIC}
            isRequired={true}
            max={3}
          />
          
          <PaymentField
            id="scholarships-penal-income"
            label="Scholarships, penal income and retirement income:"
            value={scholarshipsPenalIncome}
            onChange={setScholarshipsPenalIncome}
            isRequired={true}
            max={20000}
          />
          
          <PaymentField
            id="non-taxable-combat-pay"
            label="Non-taxable combat pay:"
            value={nonTaxableCombatPay}
            onChange={setNonTaxableCombatPay}
            isRequired={true}
            max={20000}
          />
          
          <CheckboxField
            id="is-over-25-under-65"
            label="Are you (or spouse if married) at least age 25 but under age 65?"
            checked={isOver25Under65}
            onChange={setIsOver25Under65}
          />
          
          <CheckboxField
            id="lived-in-us-6-months"
            label="Have you (and spouse) lived in the U.S. for at least six months?"
            checked={livedInUS6Months}
            onChange={setLivedInUS6Months}
          />
          
          <CheckboxField
            id="is-qualifying-child"
            label="Can you (or spouse) be claimed as a qualifying child of someone else?"
            checked={isQualifyingChild}
            onChange={setIsQualifyingChild}
          />
        </div>
      )}
    </div>
  );
} 