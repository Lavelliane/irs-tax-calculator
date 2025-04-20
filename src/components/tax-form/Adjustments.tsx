'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronUp, ChevronDown, DollarSign } from 'lucide-react';
import QuestionMarkIcon from './icons/QuestionMarkIcon';
import { useTaxFormStore } from '@/hooks/useTaxFormStore';
import { calculateSelfEmploymentTaxDeduction, getAdjustmentsToIncome } from '@/services/adjustments';

// Helper component for adjustment field
type AdjustmentFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
  readOnly?: boolean;
};

const AdjustmentField = ({ id, label, value, onChange, required = true, readOnly = false }: AdjustmentFieldProps) => {
  const { formatNumber } = useTaxFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    const numValue = parseFloat(rawValue) || 0;
    onChange(numValue);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] items-center gap-4 mb-4">
      <div className="flex items-center justify-end">
        <label htmlFor={id} className="text-lg font-medium text-gray-700 dark:text-gray-300 text-right">
          {label}
        </label>
        {required && <span className="text-red-500 ml-1">*</span>}
        <QuestionMarkIcon />
      </div>
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
    <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] items-center gap-4 mb-4">
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

export default function Adjustments() {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const {
    // Adjustments to Income State
    educatorExpenses,
    employeeBusinessExpenses,
    hsaDeduction,
    selfEmploymentTaxDeduction,
    sepSimpleQualifiedPlans,
    selfEmployedHealthInsurance,
    earlyWithdrawalPenalty,
    alimonyPaid,
    iraDeduction,
    studentLoanInterest,
    
    // Adjustments to Income Actions
    setEducatorExpenses,
    setEmployeeBusinessExpenses,
    setHsaDeduction,
    setSelfEmploymentTaxDeduction,
    setSepSimpleQualifiedPlans,
    setSelfEmployedHealthInsurance,
    setEarlyWithdrawalPenalty,
    setAlimonyPaid,
    setIraDeduction,
    setStudentLoanInterest,
    
    formatNumber,
  } = useTaxFormStore();

  const taxFormState = useTaxFormStore.getState();

  // Calculate self-employment tax deduction (half of self-employment tax)
  useEffect(() => {
    console.log('calculateSelfEmploymentTaxDeduction', calculateSelfEmploymentTaxDeduction(taxFormState));
    setSelfEmploymentTaxDeduction(calculateSelfEmploymentTaxDeduction(taxFormState));
  }, [taxFormState.businessIncome, taxFormState.spouseBusinessIncome, taxFormState.farmIncome]);

  const totalAdjustments = useMemo(() => {
    return getAdjustmentsToIncome(taxFormState);
  }, [taxFormState]);

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700">
      <div 
        className="flex items-center justify-between py-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Adjustments to income:
        </h2>
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mr-3">
            ${formatNumber(totalAdjustments)}
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
          <AdjustmentField 
            id="educator-expenses"
            label="Educator expenses:"
            value={educatorExpenses}
            onChange={setEducatorExpenses}
          />
          
          <AdjustmentField 
            id="employee-business-expenses"
            label="Employee business expenses (Form 2106 which includes military reservists and limited other employees):"
            value={employeeBusinessExpenses}
            onChange={setEmployeeBusinessExpenses}
          />
          
          <AdjustmentField 
            id="hsa-deduction"
            label="Health Savings Account (HSA) deduction (Form 8889):"
            value={hsaDeduction}
            onChange={setHsaDeduction}
          />
          
          <AdjustmentField 
            id="self-employment-tax"
            label="One-half of self-employment tax (Schedule SE):"
            value={selfEmploymentTaxDeduction}
            onChange={setSelfEmploymentTaxDeduction}
            readOnly={true} // This is calculated automatically
          />
          
          <AdjustmentField 
            id="sep-simple-qualified-plans"
            label="Self-employed SEP, SIMPLE and qualified plans:"
            value={sepSimpleQualifiedPlans}
            onChange={setSepSimpleQualifiedPlans}
          />
          
          <AdjustmentField 
            id="self-employed-health-insurance"
            label="Self-employed health insurance deduction:"
            value={selfEmployedHealthInsurance}
            onChange={setSelfEmployedHealthInsurance}
          />
          
          <AdjustmentField 
            id="early-withdrawal-penalty"
            label="Penalty on early withdrawal of savings:"
            value={earlyWithdrawalPenalty}
            onChange={setEarlyWithdrawalPenalty}
          />
          
          <AdjustmentField 
            id="alimony-paid"
            label="Alimony paid:"
            value={alimonyPaid}
            onChange={setAlimonyPaid}
          />
          
          <AdjustmentField 
            id="ira-deduction"
            label="IRA deduction:"
            value={iraDeduction}
            onChange={setIraDeduction}
          />
          
          <AdjustmentField 
            id="student-loan-interest"
            label="Student loan interest deduction:"
            value={studentLoanInterest}
            onChange={setStudentLoanInterest}
          />
          
          <DisplayField 
            id="total-adjustments"
            label="Total adjustments:"
            value={`$${formatNumber(totalAdjustments)}`}
          />
        </div>
      )}
    </div>
  );
} 