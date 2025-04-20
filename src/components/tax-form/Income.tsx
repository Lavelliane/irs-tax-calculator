'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, HelpCircle, DollarSign } from 'lucide-react';
import { useTaxFormStore } from '@/hooks/useTaxFormStore';
import { calculateTotalWages } from '@/services/income';

// Question mark icon for tooltips
const QuestionMark = () => (
  <HelpCircle 
    size={16} 
    className="ml-2 text-gray-400 cursor-help hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
  />
);

// Income field component
type IncomeFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  isRequired?: boolean;
};

const IncomeField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 500000,
  isRequired = false 
}: IncomeFieldProps) => {
  const { formatNumber } = useTaxFormStore();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    const numValue = parseFloat(rawValue) || 0;
    onChange(numValue);
  };

  return (
    <div className="grid grid-cols-[1fr_1fr] items-center gap-4 mb-4">
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
            <DollarSign size={18} className="text-gray-500" />
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

// Checkbox component
type CheckboxProps = {
  id: string;
  label: string;
  labelText?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox = ({ id, label, labelText = "Medicare (W-2 Box 5):", checked, onChange }: CheckboxProps) => {
  return (
    <div className="grid grid-cols-[1fr_1fr] items-center gap-4 mb-4">
      <div className="flex items-center justify-end">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300 text-right flex-grow">
          {labelText}
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

export default function Income() {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Get store values and actions
  const {
    wages,
    isW2Box5Different,
    w2Box5Amount,
    spouseWages,
    isSpouseW2Box5Different,
    spouseW2Box5Amount,
    filingStatus,
    setWages,
    setIsW2Box5Different,
    setW2Box5Amount,
    setSpouseWages,
    setIsSpouseW2Box5Different,
    setSpouseW2Box5Amount,
    formatNumber
  } = useTaxFormStore();

  // Calculate total to display in header
  const totalWages = calculateTotalWages({
    filingStatus,
    wages,
    isW2Box5Different,
    w2Box5Amount,
    spouseWages,
    isSpouseW2Box5Different,
    spouseW2Box5Amount,
  });
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div 
        className="flex items-center justify-between py-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Wages, salaries, tips:
        </h2>
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mr-3">
            ${formatNumber(totalWages)}
          </span>
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-2">
          <IncomeField
            id="wages"
            label="Wages, salaries, tips, etc.:"
            value={wages}
            onChange={setWages}
            isRequired={true}
            max={500000}
          />
          
          <Checkbox
            id="is-w2-box5-different"
            label="Check here if W-2's Box 5 is different than Box 1."
            labelText="Medicare (W-2 Box 5):"
            checked={isW2Box5Different}
            onChange={setIsW2Box5Different}
          />
          
          {isW2Box5Different && (
            <IncomeField
              id="w2-box5-amount"
              label="Medicare (W-2 Box 5) wages, salaries, tips, etc.:"
              value={w2Box5Amount}
              onChange={setW2Box5Amount}
              max={500000}
            />
          )}
          
          <IncomeField
            id="spouse-wages"
            label="Spouse wages, salaries, tips, etc.:"
            value={spouseWages}
            onChange={setSpouseWages}
            max={500000}
          />
          
          <Checkbox
            id="is-spouse-w2-box5-different"
            label="Check here if W-2's Box 5 for spouse is different than Box 1."
            labelText="Spouse Medicare (W-2 Box 5):"
            checked={isSpouseW2Box5Different}
            onChange={setIsSpouseW2Box5Different}
          />
          
          {isSpouseW2Box5Different && (
            <IncomeField
              id="spouse-w2-box5-amount"
              label="Medicare (W-2 Box 5) spouse wages, salaries, tips, etc.:"
              value={spouseW2Box5Amount}
              onChange={setSpouseW2Box5Amount}
              max={500000}
            />
          )}
        </div>
      )}
    </div>
  );
} 