import { FilingStatus } from "@/config/config";

export interface IncomeState {
  filingStatus: FilingStatus;
  wages: number;
  isW2Box5Different: boolean;
  w2Box5Amount: number;
  spouseWages: number;
  isSpouseW2Box5Different: boolean;
  spouseW2Box5Amount: number;
}

export function calculateTotalWages(income: IncomeState): number {
  const taxpayerWages = income.isW2Box5Different
    ? income.w2Box5Amount
    : income.wages;

  const spouseWages =
    income.filingStatus === 'MarriedFilingJointly'
      ? income.isSpouseW2Box5Different
        ? income.spouseW2Box5Amount
        : income.spouseWages
      : 0;

  return taxpayerWages + spouseWages;
}