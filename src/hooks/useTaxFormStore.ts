import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FilingStatus } from '@/config/config';

interface TaxFormState {
  // Filing Status & Dependents
  filingStatus: FilingStatus;
  isDependent: boolean;
  childTaxCreditDependents: number;
  otherDependentTaxCreditDependents: number;
  
  // Income
  wages: number;
  isW2Box5Different: boolean;
  w2Box5Amount: number;
  spouseWages: number;
  isSpouseW2Box5Different: boolean;
  spouseW2Box5Amount: number;
  
  // Other Income
  taxableInterest: number;
  taxExemptInterest: number;
  ordinaryDividends: number;
  qualifiedDividends: number;
  taxableRefunds: number;
  alimony: number;
  businessIncome: number;
  spouseBusinessIncome: number;
  shortTermCapitalGain: number;
  longTermCapitalGain: number;
  otherGains: number;
  taxableIraDistributions: number;
  taxablePensions: number;
  intangibleDrillingCosts: number;
  rentalIncomeSubjectToNiit: number;
  rentalIncomeNotSubjectToNiit: number;
  farmIncome: number;
  unemploymentCompensation: number;
  socialSecurityBenefits: number;
  taxableSocialSecurityBenefits: number;
  otherIncome: number;
  taxableIncomeAdjustments: number;
  // Adjustments to Income
  educatorExpenses: number;
  employeeBusinessExpenses: number;
  hsaDeduction: number;
  selfEmploymentTaxDeduction: number;
  sepSimpleQualifiedPlans: number;
  selfEmployedHealthInsurance: number;
  earlyWithdrawalPenalty: number;
  alimonyPaid: number;
  iraDeduction: number;
  studentLoanInterest: number;
  
  // Deductions
  is65OrOlder: boolean;
  isBlind: boolean;
  spouseIs65OrOlder: boolean;
  spouseIsBlind: boolean;
  forceItemizedDeduction: boolean;
  medicalDentalExpenses: number;
  stateLocalTaxes: number;
  interestPaid: number;
  charitableCashContributions: number;
  charitableNonCashContributions: number;
  totalDeduction: number;
  // Tax Credits
  foreignTaxCredit: number;
  childDependentCareCredit: number;
  educationCredits: number;
  retirementSavingsCredit: number;
  energyEfficientHomeCredit: number;
  americanOpportunityCredit: number;
  otherNonRefundableCredits: number;
  
  // Additional Taxes
  unreportedSocialSecurity: number;
  additionalTaxOnIRAs: number;
  householdEmploymentTaxes: number;
  firstTimeHomeBuyerCredit: number;
  
  // Payments and Refundable Credits
  federalIncomeTaxWithheld: number;
  estimatedTaxPayments: number;
  excessSocialSecurity: number;
  otherPayments: number;
  netPremiumCredit: number;
  otherRefundableCredits: number;
  qualifyingChildrenForEIC: number;
  scholarshipsPenalIncome: number;
  nonTaxableCombatPay: number;
  isOver25Under65: boolean;
  livedInUS6Months: boolean;
  isQualifyingChild: boolean;

  // Actions
  setFilingStatus: (status: FilingStatus) => void;
  setIsDependent: (isDep: boolean) => void;
  setChildTaxCreditDependents: (count: number) => void;
  setOtherDependentTaxCreditDependents: (count: number) => void;
  
  // Income Actions
  setWages: (amount: number) => void;
  setIsW2Box5Different: (isDifferent: boolean) => void;
  setW2Box5Amount: (amount: number) => void;
  setSpouseWages: (amount: number) => void;
  setIsSpouseW2Box5Different: (isDifferent: boolean) => void;
  setSpouseW2Box5Amount: (amount: number) => void;
  
  // Other Income Actions
  setTaxableInterest: (amount: number) => void;
  setTaxExemptInterest: (amount: number) => void;
  setOrdinaryDividends: (amount: number) => void;
  setQualifiedDividends: (amount: number) => void;
  setTaxableRefunds: (amount: number) => void;
  setAlimony: (amount: number) => void;
  setBusinessIncome: (amount: number) => void;
  setSpouseBusinessIncome: (amount: number) => void;
  setShortTermCapitalGain: (amount: number) => void;
  setLongTermCapitalGain: (amount: number) => void;
  setOtherGains: (amount: number) => void;
  setTaxableIraDistributions: (amount: number) => void;
  setTaxablePensions: (amount: number) => void;
  setIntangibleDrillingCosts: (amount: number) => void;
  setRentalIncomeSubjectToNiit: (amount: number) => void;
  setRentalIncomeNotSubjectToNiit: (amount: number) => void;
  setFarmIncome: (amount: number) => void;
  setUnemploymentCompensation: (amount: number) => void;
  setSocialSecurityBenefits: (amount: number) => void;
  setTaxableSocialSecurityBenefits: (amount: number) => void;
  setOtherIncome: (amount: number) => void;
  setTaxableIncomeAdjustments: (amount: number) => void;
  // Adjustments to Income Actions
  setEducatorExpenses: (amount: number) => void;
  setEmployeeBusinessExpenses: (amount: number) => void;
  setHsaDeduction: (amount: number) => void;
  setSelfEmploymentTaxDeduction: (amount: number) => void;
  setSepSimpleQualifiedPlans: (amount: number) => void;
  setSelfEmployedHealthInsurance: (amount: number) => void;
  setEarlyWithdrawalPenalty: (amount: number) => void;
  setAlimonyPaid: (amount: number) => void;
  setIraDeduction: (amount: number) => void;
  setStudentLoanInterest: (amount: number) => void;
  
  // Deduction Actions
  setIs65OrOlder: (is65OrOlder: boolean) => void;
  setIsBlind: (isBlind: boolean) => void;
  setSpouseIs65OrOlder: (is65OrOlder: boolean) => void;
  setSpouseIsBlind: (isBlind: boolean) => void;
  setForceItemizedDeduction: (forceItemized: boolean) => void;
  setMedicalDentalExpenses: (amount: number) => void;
  setStateLocalTaxes: (amount: number) => void;
  setInterestPaid: (amount: number) => void;
  setCharitableCashContributions: (amount: number) => void;
  setCharitableNonCashContributions: (amount: number) => void;
  setTotalDeduction: (amount: number) => void;
  // Tax Credits Actions
  setForeignTaxCredit: (amount: number) => void;
  setChildDependentCareCredit: (amount: number) => void;
  setEducationCredits: (amount: number) => void;
  setRetirementSavingsCredit: (amount: number) => void;
  setEnergyEfficientHomeCredit: (amount: number) => void;
  setAmericanOpportunityCredit: (amount: number) => void;
  setOtherNonRefundableCredits: (amount: number) => void;
  
  // Additional Taxes Actions
  setUnreportedSocialSecurity: (amount: number) => void;
  setAdditionalTaxOnIRAs: (amount: number) => void;
  setHouseholdEmploymentTaxes: (amount: number) => void;
  setFirstTimeHomeBuyerCredit: (amount: number) => void;
  
  // Payments and Refundable Credits Actions
  setFederalIncomeTaxWithheld: (amount: number) => void;
  setEstimatedTaxPayments: (amount: number) => void;
  setExcessSocialSecurity: (amount: number) => void;
  setOtherPayments: (amount: number) => void;
  setNetPremiumCredit: (amount: number) => void;
  setOtherRefundableCredits: (amount: number) => void;
  setQualifyingChildrenForEIC: (count: number) => void;
  setScholarshipsPenalIncome: (amount: number) => void;
  setNonTaxableCombatPay: (amount: number) => void;
  setIsOver25Under65: (value: boolean) => void;
  setLivedInUS6Months: (value: boolean) => void;
  setIsQualifyingChild: (value: boolean) => void;
  
  // Utility functions
  formatNumber: (num: number) => string;
}

// Utility function to format numbers with commas
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const useTaxFormStore = create<TaxFormState>()(
  persist(
    (set) => ({
      // Initial state
      filingStatus: 'Single',
      isDependent: false,
      childTaxCreditDependents: 0,
      otherDependentTaxCreditDependents: 0,
      
      // Income initial state
      wages: 0,
      isW2Box5Different: false,
      w2Box5Amount: 0,
      spouseWages: 0,
      isSpouseW2Box5Different: false,
      spouseW2Box5Amount: 0,
      
      // Other Income initial state
      taxableInterest: 0,
      taxExemptInterest: 0,
      ordinaryDividends: 0,
      qualifiedDividends: 0,
      taxableRefunds: 0,
      alimony: 0,
      businessIncome: 0,
      spouseBusinessIncome: 0,
      shortTermCapitalGain: 0,
      longTermCapitalGain: 0,
      otherGains: 0,
      taxableIraDistributions: 0,
      taxablePensions: 0,
      intangibleDrillingCosts: 0,
      rentalIncomeSubjectToNiit: 0,
      rentalIncomeNotSubjectToNiit: 0,
      farmIncome: 0,
      unemploymentCompensation: 0,
      socialSecurityBenefits: 0,
      taxableSocialSecurityBenefits: 0,
      otherIncome: 0,
      taxableIncomeAdjustments: 0,
      
      // Adjustments to Income initial state
      educatorExpenses: 0,
      employeeBusinessExpenses: 0,
      hsaDeduction: 0,
      selfEmploymentTaxDeduction: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      alimonyPaid: 0,
      iraDeduction: 0,
      studentLoanInterest: 0,
      
      // Deductions initial state
      is65OrOlder: false,
      isBlind: false,
      spouseIs65OrOlder: false,
      spouseIsBlind: false,
      forceItemizedDeduction: false,
      medicalDentalExpenses: 0,
      stateLocalTaxes: 0,
      interestPaid: 0,
      charitableCashContributions: 0,
      charitableNonCashContributions: 0,
      totalDeduction: 0,
      
      // Tax Credits initial state
      foreignTaxCredit: 0,
      childDependentCareCredit: 0,
      educationCredits: 0,
      retirementSavingsCredit: 0,
      energyEfficientHomeCredit: 0,
      americanOpportunityCredit: 0,
      otherNonRefundableCredits: 0,
      
      // Additional Taxes initial state
      unreportedSocialSecurity: 0,
      additionalTaxOnIRAs: 0,
      householdEmploymentTaxes: 0,
      firstTimeHomeBuyerCredit: 0,
      
      // Payments and Refundable Credits initial state
      federalIncomeTaxWithheld: 0,
      estimatedTaxPayments: 0,
      excessSocialSecurity: 0,
      otherPayments: 0,
      netPremiumCredit: 0,
      otherRefundableCredits: 0,
      qualifyingChildrenForEIC: 0,
      scholarshipsPenalIncome: 0,
      nonTaxableCombatPay: 0,
      isOver25Under65: false,
      livedInUS6Months: true,
      isQualifyingChild: false,

      // Actions
      setFilingStatus: (status) => set({ filingStatus: status }),
      setIsDependent: (isDep) => set({ isDependent: isDep }),
      setChildTaxCreditDependents: (count) => set({ childTaxCreditDependents: count }),
      setOtherDependentTaxCreditDependents: (count) => set({ otherDependentTaxCreditDependents: count }),
      
      // Income Actions
      setWages: (amount) => set({ wages: amount }),
      setIsW2Box5Different: (isDifferent) => set({ isW2Box5Different: isDifferent }),
      setW2Box5Amount: (amount) => set({ w2Box5Amount: amount }),
      setSpouseWages: (amount) => set({ spouseWages: amount }),
      setIsSpouseW2Box5Different: (isDifferent) => set({ isSpouseW2Box5Different: isDifferent }),
      setSpouseW2Box5Amount: (amount) => set({ spouseW2Box5Amount: amount }),
      
      // Other Income Actions
      setTaxableInterest: (amount) => set({ taxableInterest: amount }),
      setTaxExemptInterest: (amount) => set({ taxExemptInterest: amount }),
      setOrdinaryDividends: (amount) => set({ ordinaryDividends: amount }),
      setQualifiedDividends: (amount) => set({ qualifiedDividends: amount }),
      setTaxableRefunds: (amount) => set({ taxableRefunds: amount }),
      setAlimony: (amount) => set({ alimony: amount }),
      setBusinessIncome: (amount) => set({ businessIncome: amount }),
      setSpouseBusinessIncome: (amount) => set({ spouseBusinessIncome: amount }),
      setShortTermCapitalGain: (amount) => set({ shortTermCapitalGain: amount }),
      setLongTermCapitalGain: (amount) => set({ longTermCapitalGain: amount }),
      setOtherGains: (amount) => set({ otherGains: amount }),
      setTaxableIraDistributions: (amount) => set({ taxableIraDistributions: amount }),
      setTaxablePensions: (amount) => set({ taxablePensions: amount }),
      setIntangibleDrillingCosts: (amount) => set({ intangibleDrillingCosts: amount }),
      setRentalIncomeSubjectToNiit: (amount) => set({ rentalIncomeSubjectToNiit: amount }),
      setRentalIncomeNotSubjectToNiit: (amount) => set({ rentalIncomeNotSubjectToNiit: amount }),
      setFarmIncome: (amount) => set({ farmIncome: amount }),
      setUnemploymentCompensation: (amount) => set({ unemploymentCompensation: amount }),
      setSocialSecurityBenefits: (amount) => set({ socialSecurityBenefits: amount }),
      setTaxableSocialSecurityBenefits: (amount) => set({ taxableSocialSecurityBenefits: amount }),
      setOtherIncome: (amount) => set({ otherIncome: amount }),
      setTaxableIncomeAdjustments: (amount) => set({ taxableIncomeAdjustments: amount }),
      // Adjustments to Income Actions
      setEducatorExpenses: (amount) => set({ educatorExpenses: amount }),
      setEmployeeBusinessExpenses: (amount) => set({ employeeBusinessExpenses: amount }),
      setHsaDeduction: (amount) => set({ hsaDeduction: amount }),
      setSelfEmploymentTaxDeduction: (amount) => set({ selfEmploymentTaxDeduction: amount }),
      setSepSimpleQualifiedPlans: (amount) => set({ sepSimpleQualifiedPlans: amount }),
      setSelfEmployedHealthInsurance: (amount) => set({ selfEmployedHealthInsurance: amount }),
      setEarlyWithdrawalPenalty: (amount) => set({ earlyWithdrawalPenalty: amount }),
      setAlimonyPaid: (amount) => set({ alimonyPaid: amount }),
      setIraDeduction: (amount) => set({ iraDeduction: amount }),
      setStudentLoanInterest: (amount) => set({ studentLoanInterest: amount }),
      
      // Deduction Actions
      setIs65OrOlder: (is65OrOlder) => set({ is65OrOlder }),
      setIsBlind: (isBlind) => set({ isBlind }),
      setSpouseIs65OrOlder: (is65OrOlder) => set({ spouseIs65OrOlder: is65OrOlder }),
      setSpouseIsBlind: (isBlind) => set({ spouseIsBlind: isBlind }),
      setForceItemizedDeduction: (forceItemized) => set({ forceItemizedDeduction: forceItemized }),
      setMedicalDentalExpenses: (amount) => set({ medicalDentalExpenses: amount }),
      setStateLocalTaxes: (amount) => set({ stateLocalTaxes: amount }),
      setInterestPaid: (amount) => set({ interestPaid: amount }),
      setCharitableCashContributions: (amount) => set({ charitableCashContributions: amount }),
      setCharitableNonCashContributions: (amount) => set({ charitableNonCashContributions: amount }),
      setTotalDeduction: (amount) => set({ totalDeduction: amount }),

      // Tax Credits Actions
      setForeignTaxCredit: (amount) => set({ foreignTaxCredit: amount }),
      setChildDependentCareCredit: (amount) => set({ childDependentCareCredit: amount }),
      setEducationCredits: (amount) => set({ educationCredits: amount }),
      setRetirementSavingsCredit: (amount) => set({ retirementSavingsCredit: amount }),
      setEnergyEfficientHomeCredit: (amount) => set({ energyEfficientHomeCredit: amount }),
      setAmericanOpportunityCredit: (amount) => set({ americanOpportunityCredit: amount }),
      setOtherNonRefundableCredits: (amount) => set({ otherNonRefundableCredits: amount }),
      
      // Additional Taxes Actions
      setUnreportedSocialSecurity: (amount) => set({ unreportedSocialSecurity: amount }),
      setAdditionalTaxOnIRAs: (amount) => set({ additionalTaxOnIRAs: amount }),
      setHouseholdEmploymentTaxes: (amount) => set({ householdEmploymentTaxes: amount }),
      setFirstTimeHomeBuyerCredit: (amount) => set({ firstTimeHomeBuyerCredit: amount }),
      
      // Payments and Refundable Credits Actions
      setFederalIncomeTaxWithheld: (amount) => set({ federalIncomeTaxWithheld: amount }),
      setEstimatedTaxPayments: (amount) => set({ estimatedTaxPayments: amount }),
      setExcessSocialSecurity: (amount) => set({ excessSocialSecurity: amount }),
      setOtherPayments: (amount) => set({ otherPayments: amount }),
      setNetPremiumCredit: (amount) => set({ netPremiumCredit: amount }),
      setOtherRefundableCredits: (amount) => set({ otherRefundableCredits: amount }),
      setQualifyingChildrenForEIC: (count) => set({ qualifyingChildrenForEIC: count }),
      setScholarshipsPenalIncome: (amount) => set({ scholarshipsPenalIncome: amount }),
      setNonTaxableCombatPay: (amount) => set({ nonTaxableCombatPay: amount }),
      setIsOver25Under65: (value) => set({ isOver25Under65: value }),
      setLivedInUS6Months: (value) => set({ livedInUS6Months: value }),
      setIsQualifyingChild: (value) => set({ isQualifyingChild: value }),
      
      // Utility functions
      formatNumber,
    }),
    {
      name: 'tax-form-storage', // unique name for localStorage
    }
  )
); 