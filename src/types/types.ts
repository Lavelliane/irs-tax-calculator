import { FilingStatus } from "@/config/config";

export interface TaxFormState {
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
}


export interface AdjustmentsToIncomeState {
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
}

export interface OtherIncomeState {
  // Income
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
}

export interface IncomeState {
  wages: number;
  isW2Box5Different: boolean;
  w2Box5Amount: number;
  spouseWages: number;
  isSpouseW2Box5Different: boolean;
  spouseW2Box5Amount: number;
}

export interface TotalIncomeState extends IncomeState, OtherIncomeState {}
