'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, DollarSign } from 'lucide-react';
import QuestionMarkIcon from './icons/QuestionMarkIcon';
import { useTaxFormStore } from '@/hooks/useTaxFormStore';
import { getTotalOtherIncome, getTaxableSocialSecurityBenefits, getTotalIncome } from '@/services/other-income';

// Helper component for income field
type IncomeFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
};

const IncomeField = ({ id, label, value, onChange, required = true }: IncomeFieldProps) => {
  const { formatNumber } = useTaxFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          className="w-full pl-8 p-3 border border-gray-300 dark:border-gray-600 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
    </div>
  );
};

// Static/display-only field without input
type DisplayFieldProps = {
  id: string;
  label: string;
  value: string;
  required?: boolean;
};

const DisplayField = ({ id, label, value, required = true }: DisplayFieldProps) => {
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

export default function OtherIncome() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [taxableSocialSecurityBenefitsUI, setTaxableSocialSecurityBenefitsUI] = useState(0);
  const [totalOtherIncome, setTotalOtherIncome] = useState(0);
  const {
    // Other Income Stat
    // Actions
    setTaxableInterest,
    setTaxExemptInterest,
    setOrdinaryDividends,
    setQualifiedDividends,
    setTaxableRefunds,
    setAlimony,
    setBusinessIncome,
    setSpouseBusinessIncome,
    setShortTermCapitalGain,
    setLongTermCapitalGain,
    setOtherGains,
    setTaxableIraDistributions,
    setTaxablePensions,
    setIntangibleDrillingCosts,
    setRentalIncomeSubjectToNiit,
    setRentalIncomeNotSubjectToNiit,
    setFarmIncome,
    setUnemploymentCompensation,
    setSocialSecurityBenefits,
    setTaxableSocialSecurityBenefits,
    setOtherIncome,
    setTaxableIncomeAdjustments,
    // Utilities
    formatNumber,
  } = useTaxFormStore();

  const taxFormState = useTaxFormStore.getState();
  console.log('taxFormState', taxFormState);

  const { 
    taxableInterest,
    taxExemptInterest,
    ordinaryDividends,
    qualifiedDividends,
    taxableRefunds,
    alimony,
    businessIncome,
    spouseBusinessIncome,
    shortTermCapitalGain,
    longTermCapitalGain,
    otherGains,
    taxableIraDistributions,
    taxablePensions,
    intangibleDrillingCosts,
    rentalIncomeSubjectToNiit,
    rentalIncomeNotSubjectToNiit,
    farmIncome,
    unemploymentCompensation,
    socialSecurityBenefits,
    otherIncome,
    taxableSocialSecurityBenefits,
    taxableIncomeAdjustments,
    wages,
    isW2Box5Different,
    w2Box5Amount,
    spouseWages,
    isSpouseW2Box5Different,
    spouseW2Box5Amount,
  } = taxFormState;

  // Create an object with all other income values for calculation
  const otherIncomeData = {
    taxableInterest,
    taxExemptInterest,
    ordinaryDividends,
    qualifiedDividends,
    taxableRefunds,
    alimony,
    businessIncome,
    spouseBusinessIncome,
    shortTermCapitalGain,
    longTermCapitalGain,
    otherGains,
    taxableIraDistributions,
    taxablePensions,
    intangibleDrillingCosts,
    rentalIncomeSubjectToNiit,
    rentalIncomeNotSubjectToNiit,
    farmIncome,
    unemploymentCompensation,
    socialSecurityBenefits,
    taxableSocialSecurityBenefits,
    otherIncome
  };

  // Calculate taxable Social Security benefits (85% of total) only as initial value
  useEffect(() => {
    // Only set an initial default value if the field hasn't been manually edited
      const calculatedTaxableSocialSecurity = getTaxableSocialSecurityBenefits({ socialSecurityBenefits });
      setTaxableSocialSecurityBenefits(calculatedTaxableSocialSecurity);
      setTaxableSocialSecurityBenefitsUI(calculatedTaxableSocialSecurity);
      console.log('calculatedTaxableSocialSecurity', calculatedTaxableSocialSecurity);
    
  }, [socialSecurityBenefits, taxableSocialSecurityBenefits, setTaxableSocialSecurityBenefits]);

  // Calculate total other income using the service function
  useEffect(() => {
    // Add missing required properties to match TotalIncomeState type
    const calculatedTotalIncome = getTotalIncome(taxFormState);
    const calculatedTotalOtherIncome = getTotalOtherIncome(taxFormState);
    setTotalIncome(calculatedTotalIncome);
    setTotalOtherIncome(calculatedTotalOtherIncome);
  }, [taxFormState]);

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700">
      <div 
        className="flex items-center justify-between py-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Income all other sources:
        </h2>
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mr-3">
            ${formatNumber(totalOtherIncome)}
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
          <IncomeField 
            id="taxable-interest"
            label="Taxable interest:"
            value={taxableInterest}
            onChange={setTaxableInterest}
          />
          
          <IncomeField 
            id="tax-exempt-interest"
            label="Tax-exempt interest:"
            value={taxExemptInterest}
            onChange={setTaxExemptInterest}
          />
          
          <IncomeField 
            id="ordinary-dividends"
            label="Ordinary dividends (this includes any qualified dividends):"
            value={ordinaryDividends}
            onChange={setOrdinaryDividends}
          />
          
          <IncomeField 
            id="qualified-dividends"
            label="Qualified dividends (included in ordinary dividends):"
            value={qualifiedDividends}
            onChange={setQualifiedDividends}
          />
          
          <IncomeField 
            id="taxable-refunds"
            label="Taxable refunds of state and local income taxes:"
            value={taxableRefunds}
            onChange={setTaxableRefunds}
          />
          
          <IncomeField 
            id="alimony"
            label="Alimony received:"
            value={alimony}
            onChange={setAlimony}
          />
          
          <IncomeField 
            id="business-income"
            label="Business income or loss (Schedule C & E subject to self-employment taxes):"
            value={businessIncome}
            onChange={setBusinessIncome}
          />
          
          <IncomeField 
            id="spouse-business-income"
            label="Spouse's business income or loss (Schedule C & E subject to self-employment taxes):"
            value={spouseBusinessIncome}
            onChange={setSpouseBusinessIncome}
          />
          
          <IncomeField 
            id="short-term-capital-gain"
            label="Short term capital gain or loss:"
            value={shortTermCapitalGain}
            onChange={setShortTermCapitalGain}
          />
          
          <IncomeField 
            id="long-term-capital-gain"
            label="Long term Capital gain or loss:"
            value={longTermCapitalGain}
            onChange={setLongTermCapitalGain}
          />
          
          <IncomeField 
            id="other-gains"
            label="Other gains or losses:"
            value={otherGains}
            onChange={setOtherGains}
          />
          
          <IncomeField 
            id="taxable-ira"
            label="Taxable IRA distributions:"
            value={taxableIraDistributions}
            onChange={setTaxableIraDistributions}
          />
          
          <IncomeField 
            id="taxable-pensions"
            label="Taxable pensions and annuity distributions:"
            value={taxablePensions}
            onChange={setTaxablePensions}
          />
          
          <IncomeField 
            id="intangible-drilling-costs"
            label="Intangible drilling costs (IDC) for investor general partners (this is an income reduction):"
            value={intangibleDrillingCosts}
            onChange={setIntangibleDrillingCosts}
          />
          
          <IncomeField 
            id="rental-subject-to-niit"
            label="Income from rentals, royalties, non-qualified annuities, S Corporations and Schedule E (not already included and subject to NIIT):"
            value={rentalIncomeSubjectToNiit}
            onChange={setRentalIncomeSubjectToNiit}
          />
          
          <IncomeField 
            id="rental-not-subject-to-niit"
            label="Income from rentals, royalties, S Corporations and Schedule E (not already included and not subject to NIIT):"
            value={rentalIncomeNotSubjectToNiit}
            onChange={setRentalIncomeNotSubjectToNiit}
          />
          
          <IncomeField 
            id="farm-income"
            label="Farm income or loss (Schedule F):"
            value={farmIncome}
            onChange={setFarmIncome}
          />
          
          <IncomeField 
            id="unemployment-compensation"
            label="Total unemployment compensation:"
            value={unemploymentCompensation}
            onChange={setUnemploymentCompensation}
          />
          
          <IncomeField 
            id="social-security-benefits"
            label="Social Security benefits:"
            value={socialSecurityBenefits}
            onChange={setSocialSecurityBenefits}
          />
          
          {socialSecurityBenefits > 0 ? (
            <IncomeField 
              id="taxable-social-security-adjustments"
              label="Taxable income adjustments for Social Security, student loan interest:"
              value={taxableIncomeAdjustments}
              onChange={setTaxableIncomeAdjustments}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] items-center gap-4 mb-4">
              <div className="flex items-center justify-end">
                <label className="text-lg font-medium text-gray-700 dark:text-gray-300 text-right">
                  Taxable income adjustments for Social Security, student loan interest:
                </label>
                <QuestionMarkIcon />
              </div>
              <div className="relative">
                <span className="text-lg text-gray-500 dark:text-gray-400 italic">
                  Enter Social Security benefits to enable this field
                </span>
              </div>
            </div>
          )}
          
          <DisplayField 
            id="taxable-social-security"
            label="Taxable Social Security benefits:"
            value={`$${formatNumber(taxableSocialSecurityBenefitsUI)}`} 
            required={false}
          />
          
          <IncomeField 
            id="other-income"
            label="Other income:"
            value={otherIncome}
            onChange={setOtherIncome}
          />
          
          <DisplayField 
            id="total-income"
            label="Total income:"
            value={`$${formatNumber(totalIncome)}`}
            required={false}
          />
        </div>
      )}
    </div>
  );
} 