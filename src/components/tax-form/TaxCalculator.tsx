'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { useTaxFormStore } from '@/hooks/useTaxFormStore';

// Define tax results interface
interface TaxResults {
  totalTax: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  adjustedGrossIncome: number;
  deductions: number;
  taxableIncome: number;
  incomeTax: number;
  alternativeMinimumTax: number;
  totalTaxBeforeCredits: number;
}

export default function TaxCalculator() {
  const taxFormStore = useTaxFormStore();
  const { formatNumber } = taxFormStore;
  const [showResults, setShowResults] = useState(false);
  const [taxResults, setTaxResults] = useState<TaxResults>({
    totalTax: 0,
    effectiveTaxRate: 0,
    marginalTaxRate: 0,
    adjustedGrossIncome: 0,
    deductions: 0,
    taxableIncome: 0,
    incomeTax: 0,
    alternativeMinimumTax: 0,
    totalTaxBeforeCredits: 0
  });

  const getTaxFormData = () => {
    // Extract everything except the setter functions
    const {
     
      ...formData
    } = taxFormStore;
    
    return formData;
  };

  const handleCalculate = () => {
    // Get all form data
    const formData = getTaxFormData();
    
    // Will implement calculation logic later
    console.log('Tax form data:', formData);
    
    setShowResults(true);
  };

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex justify-end">
          <button 
            type="button"
            onClick={handleCalculate}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-sm font-medium transition-colors flex items-center gap-2"
          >
            <Calculator size={18} />
            Calculate Tax
          </button>
        </div>
      </div>

      {showResults && taxResults && (
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-t border-gray-200 dark:border-gray-600">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Tax Calculation Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Tax</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ${formatNumber(taxResults.totalTax)}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">Effective Tax Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {taxResults.effectiveTaxRate.toFixed(2)}%
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500 dark:text-gray-400">Marginal Tax Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {taxResults.marginalTaxRate.toFixed(2)}%
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Income Summary
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Adjusted Gross Income:</span>
                  <span className="font-medium">${formatNumber(taxResults.adjustedGrossIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Deductions:</span>
                  <span className="font-medium">-${formatNumber(taxResults.deductions)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300 font-semibold">Taxable Income:</span>
                  <span className="font-semibold">${formatNumber(taxResults.taxableIncome)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Tax Breakdown
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Income Tax:</span>
                  <span className="font-medium">${formatNumber(taxResults.incomeTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Alternative Minimum Tax:</span>
                  <span className="font-medium">${formatNumber(taxResults.alternativeMinimumTax)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300 font-semibold">Total Tax Before Credits:</span>
                  <span className="font-semibold">${formatNumber(taxResults.totalTaxBeforeCredits)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>This tax calculation is for informational purposes only. Please consult with a tax professional for personalized advice.</p>
          </div>
        </div>
      )}
    </>
  );
} 