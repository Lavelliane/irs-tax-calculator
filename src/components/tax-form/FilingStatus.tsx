'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import QuestionMarkIcon from './icons/QuestionMarkIcon';
import { useTaxFormStore } from '@/hooks/useTaxFormStore';


export default function FilingStatus() {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Use the Zustand store
  const { 
    filingStatus,
    isDependent,
    childTaxCreditDependents,
    otherDependentTaxCreditDependents,
    setFilingStatus,
    setIsDependent,
    setChildTaxCreditDependents,
    setOtherDependentTaxCreditDependents,
    formatNumber
  } = useTaxFormStore();

  // Handle number input changes with formatting
  const handleChildTaxCreditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove commas to get the actual number
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseInt(rawValue) || 0;
    setChildTaxCreditDependents(numValue);
  };

  const handleOtherDependentTaxCreditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove commas to get the actual number
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseInt(rawValue) || 0;
    setOtherDependentTaxCreditDependents(numValue);
  };

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700">
      <div 
        className="flex items-center justify-between py-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Filing status & dependents:
        </h2>
        <div className="transform transition-transform duration-200">
          {isExpanded ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="pb-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
            <div className="flex items-center">
              <label htmlFor="filing-status" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Filing status:
              </label>
              <span className="text-red-500 ml-1">*</span>
              <QuestionMarkIcon />
            </div>
            <div className="relative">
              <select
                id="filing-status"
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as any)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="Single">Single</option>
                <option value="MarriedFilingJointly">Married filing jointly</option>
                <option value="MarriedFilingSeparately">Married filing separately</option>
                <option value="HeadOfHousehold">Head of household</option>
                <option value="QualifyingWidow">Qualifying widow(er)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={20} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
            <div className="flex items-center">
              <label htmlFor="dependent-status" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Are you someone's dependent?:
              </label>
              <span className="text-red-500 ml-1">*</span>
              <QuestionMarkIcon />
            </div>
            <div className="relative">
              <select
                id="dependent-status"
                value={isDependent ? "Yes" : "No"}
                onChange={(e) => setIsDependent(e.target.value === "Yes")}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={20} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] items-center gap-4">
            <div className="flex items-center">
              <label htmlFor="child-tax-credit" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Dependents qualifying for child tax credit:
              </label>
              <span className="text-red-500 ml-1">*</span>
              <QuestionMarkIcon />
            </div>
            <div>
              <input
                type="text"
                id="child-tax-credit"
                value={formatNumber(childTaxCreditDependents)}
                onChange={handleChildTaxCreditChange}
                min="0"
                max="99"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] items-center gap-4">
            <div className="flex items-center">
              <label htmlFor="other-dependent-tax-credit" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Dependents qualifying for other dependent tax credit:
              </label>
              <span className="text-red-500 ml-1">*</span>
              <QuestionMarkIcon />
            </div>
            <div>
              <input
                type="text"
                id="other-dependent-tax-credit"
                value={formatNumber(otherDependentTaxCreditDependents)}
                onChange={handleOtherDependentTaxCreditChange}
                min="0"
                max="99"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 