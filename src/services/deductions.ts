import { standardDeductions } from "@/config/config";
import { TaxFormState } from "@/types/types";

export const getStandardDeduction = (data: TaxFormState) => {
  return standardDeductions[data.filingStatus];
};

export const getItemizedDeduction = (data: TaxFormState) => {
  return data.stateLocalTaxes + data.interestPaid + data.charitableCashContributions + data.charitableNonCashContributions;
};

