'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronUp, ChevronDown, DollarSign } from 'lucide-react';
import QuestionMarkIcon from './icons/QuestionMarkIcon';
import { useTaxFormStore } from '@/hooks/useTaxFormStore';
import { getItemizedDeduction, getStandardDeduction } from '@/services/deductions';
import { additionalDeduction } from '@/config/config';
// Helper component for checkbox
type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox = ({ id, label, checked, onChange }: CheckboxProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4 mb-4">
      <div className="flex items-center justify-end">
        <label htmlFor={id} className="text-lg font-medium text-gray-700 dark:text-gray-300 text-right">
          Check if:
        </label>
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

// Helper component for deduction field
type DeductionFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
  readOnly?: boolean;
  min?: number;
  max?: number;
};

const DeductionField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  required = false, 
  readOnly = false,
  min = 0,
  max = 500000
}: DeductionFieldProps) => {
  const { formatNumber } = useTaxFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    const numValue = parseFloat(rawValue) || 0;
    onChange(numValue);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const numValue = parseFloat(e.target.value) || 0;
    onChange(numValue);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] items-center gap-4 mb-6">
      <div className="flex items-center justify-end">
        <label htmlFor={id} className="text-lg font-medium text-gray-700 dark:text-gray-300 text-right">
          {label}
        </label>
        {required && <span className="text-red-500 ml-1">*</span>}
        <QuestionMarkIcon />
      </div>
      <div className="space-y-2 w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <DollarSign size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            id={id}
            value={formatNumber(value)}
            onChange={handleChange}
            readOnly={readOnly}
            className={`w-full pl-8 p-3 border border-gray-300 dark:border-gray-600 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${readOnly ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">${formatNumber(min)}</span>
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleSliderChange}
            step="100"
            className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">${formatNumber(max)}</span>
        </div>
      </div>
    </div>
  );
};

// Display-only field component
type DisplayFieldProps = {
  id: string;
  label: string;
  value: string;
  required?: boolean;
};

const DisplayField = ({ id, label, value, required = false }: DisplayFieldProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] items-center gap-4 mb-4">
      <div className="flex items-center justify-end">
        <label htmlFor={id} className="text-lg font-medium text-gray-700 dark:text-gray-300 text-right">
          {label}
        </label>
        {required && <span className="text-red-500 ml-1">*</span>}
        <QuestionMarkIcon />
      </div>
      <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        {value}
      </div>
    </div>
  );
};

export default function Deductions() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [totalDeduction, setTotalDeduction] = useState(0);
  
  const {
    
    // Deduction actions
    setIs65OrOlder,
    setIsBlind,
    setSpouseIs65OrOlder,
    setSpouseIsBlind,
    setForceItemizedDeduction,
    setMedicalDentalExpenses,
    setStateLocalTaxes,
    setInterestPaid,
    setCharitableCashContributions,
    setCharitableNonCashContributions,
    setTotalDeduction: setTotalDeductionOnStore,
    // Utilities
    formatNumber,
  } = useTaxFormStore();


  
  const taxFormState = useTaxFormStore.getState();


  const {
     // Filing status for spouse-related fields
     filingStatus,
    
     // Deduction state
     is65OrOlder,
     isBlind,
     spouseIs65OrOlder,
     spouseIsBlind,
     forceItemizedDeduction,
     medicalDentalExpenses,
     stateLocalTaxes,
     interestPaid,
     charitableCashContributions,
     charitableNonCashContributions,
  } = taxFormState;

  const standardDeduction = useMemo(() => getStandardDeduction(taxFormState), [taxFormState]);
  const itemizedDeduction = useMemo(() => getItemizedDeduction(taxFormState), [taxFormState]);

  useEffect(() => {
    if(forceItemizedDeduction) {
      setTotalDeduction(itemizedDeduction);
    } else {
      setTotalDeduction(standardDeduction);
    }
  }, [taxFormState.forceItemizedDeduction]);

  useEffect(() => {
    // Calculate additional deductions based on age and disability
    const additionalDeductionCount = (taxFormState.is65OrOlder ? 1 : 0) + (taxFormState.isBlind ? 1 : 0) + (taxFormState.spouseIs65OrOlder ? 1 : 0) + (taxFormState.spouseIsBlind ? 1 : 0);
    const totalAdditionalDeduction = additionalDeduction[filingStatus] * additionalDeductionCount;
    
    // Calculate base deduction based on whether itemized or standard
    const baseDeduction = taxFormState.forceItemizedDeduction ? itemizedDeduction : standardDeduction;
    
    // Set the total deduction
    setTotalDeduction(baseDeduction + totalAdditionalDeduction);
    setTotalDeductionOnStore(baseDeduction + totalAdditionalDeduction);
  }, [taxFormState.is65OrOlder, taxFormState.isBlind, taxFormState.forceItemizedDeduction, filingStatus, itemizedDeduction, standardDeduction, taxFormState.spouseIs65OrOlder, taxFormState.spouseIsBlind, taxFormState.filingStatus]);



  // Determine if spouse fields should be shown
  const showSpouseFields = filingStatus === 'MarriedFilingJointly' || 
                          filingStatus === 'QualifyingWidow';


  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700">
      <div 
        className="flex items-center justify-between py-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Standard or itemized deduction:
        </h2>
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mr-3">
            ${formatNumber(totalDeduction)}
          </span>
          {isExpanded ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="pb-8 space-y-2">
          <Checkbox 
            id="is-65-or-older"
            label="You are 65 or older"
            checked={is65OrOlder}
            onChange={setIs65OrOlder}
          />
          
          <Checkbox 
            id="is-blind"
            label="You are blind"
            checked={isBlind}
            onChange={setIsBlind}
          />
          
          {showSpouseFields && (
            <>
              <Checkbox 
                id="spouse-is-65-or-older"
                label="Spouse is 65 or older"
                checked={spouseIs65OrOlder}
                onChange={setSpouseIs65OrOlder}
              />
              
              <Checkbox 
                id="spouse-is-blind"
                label="Spouse is blind"
                checked={spouseIsBlind}
                onChange={setSpouseIsBlind}
              />
            </>
          )}
          
          <DisplayField 
            id="standard-deduction"
            label="Standard deduction:"
            value={`$${formatNumber(standardDeduction)}`}
          />
          
          <DeductionField 
            id="medical-dental-expenses"
            label="Medical and dental expenses:"
            value={medicalDentalExpenses}
            onChange={setMedicalDentalExpenses}
            required={true}
            min={0}
            max={100000}
          />
          
          <DeductionField 
            id="state-local-taxes"
            label="Taxes paid (generally state and local):"
            value={stateLocalTaxes}
            onChange={setStateLocalTaxes}
            required={true}
            min={0}
            max={100000}
          />
          
          <DeductionField 
            id="interest-paid"
            label="Interest paid:"
            value={interestPaid}
            onChange={setInterestPaid}
            required={true}
            min={0}
            max={100000}
          />
          
          <DeductionField 
            id="charitable-cash-contributions"
            label="Gifts to charity (cash):"
            value={charitableCashContributions}
            onChange={setCharitableCashContributions}
            required={true}
            min={0}
            max={100000}
          />
          
          <DeductionField 
            id="charitable-non-cash-contributions"
            label="Gifts to charity (non-cash):"
            value={charitableNonCashContributions}
            onChange={setCharitableNonCashContributions}
            required={true}
            min={0}
            max={100000}
          />
          
          <DisplayField 
            id="itemized-deduction"
            label="Itemized deduction:"
            value={`$${formatNumber(itemizedDeduction)}`}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] items-center gap-4 mb-4 mt-8">
            <div className="flex items-center justify-end">
              <label htmlFor="force-itemized" className="text-lg font-medium text-gray-700 dark:text-gray-300 text-right">
                Do not use standard deduction:
              </label>
              <QuestionMarkIcon />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="force-itemized"
                checked={forceItemizedDeduction}
                onChange={(e) => setForceItemizedDeduction(e.target.checked)}
                className="w-5 h-5 mr-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="force-itemized" className="text-lg text-gray-700 dark:text-gray-300">
                Use itemized deductions even if the standard deduction produces a lower tax amount.
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 