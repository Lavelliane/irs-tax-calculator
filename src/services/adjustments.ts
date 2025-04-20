import { selfEmploymentConfig } from "@/config/config";
import { TaxFormState } from "@/types/types";

export function calculateSelfEmploymentTaxDeduction(data: TaxFormState): number {
  const selfEmploymentIncome = data.businessIncome + data.spouseBusinessIncome + data.farmIncome;
  
  // Calculate taxable self-employment income (92.35% of total self-employment income)
  const taxableSelfEmploymentIncome = selfEmploymentIncome * selfEmploymentConfig.taxablePercentage;
  
  // Calculate self-employment tax based on income thresholds
  let selfEmploymentTax = 0;
  if (taxableSelfEmploymentIncome <= selfEmploymentConfig.selfEmploymentLimit) {
    // If income is below threshold, apply 15.3% rate to all income
    selfEmploymentTax = taxableSelfEmploymentIncome * selfEmploymentConfig.selfEmploymentTaxRate;
  } else {
    // If income exceeds threshold, apply 12.4% to threshold amount and 2.9% to all income
    selfEmploymentTax = (selfEmploymentConfig.selfEmploymentLimit * selfEmploymentConfig.exceedingThresholdTaxRate) + 
                        (taxableSelfEmploymentIncome * selfEmploymentConfig.medicarePercent);
  }
  
  // Deductible portion is half of the self-employment tax
  return Math.round(selfEmploymentTax / 2);
}

export function getAdjustmentsToIncome(data: TaxFormState): number {
  const selfEmploymentTaxDeduction = calculateSelfEmploymentTaxDeduction(data);

  return (
    data.employeeBusinessExpenses +
    data.hsaDeduction +
    data.sepSimpleQualifiedPlans +
    data.selfEmployedHealthInsurance +
    data.earlyWithdrawalPenalty +
    data.alimonyPaid +
    data.iraDeduction +
    selfEmploymentTaxDeduction);
}