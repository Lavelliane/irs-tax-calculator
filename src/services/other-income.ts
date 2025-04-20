import { OtherIncomeState, TaxFormState, TotalIncomeState } from "@/types/types";


export function getTaxableSocialSecurityBenefits(data: { socialSecurityBenefits: number }): number {
    return data.socialSecurityBenefits * 0.85;
}

export function getTotalOtherIncome(state: TaxFormState): number {
    // Positive “other income” items (Schedule 1, Part I, lines 1–7 + misc)
    const baseTotal =
        state.taxableRefunds
      + state.alimony
      + state.businessIncome + state.spouseBusinessIncome
      + state.otherGains
      + state.rentalIncomeSubjectToNiit + state.rentalIncomeNotSubjectToNiit
      + state.farmIncome
      + state.unemploymentCompensation
      + state.otherIncome
      + state.shortTermCapitalGain + state.longTermCapitalGain
      + state.taxableIraDistributions + state.taxablePensions
      + state.scholarshipsPenalIncome
      + state.otherIncome
      + state.socialSecurityBenefits;
    
    // Subtract IDC as an immediate loss of capital (section 59(e) election)
    const idcReduction = state.intangibleDrillingCosts;  // positive in state
  
    return baseTotal - idcReduction;
  }
  
  

/**
 * Total Income (Form 1040, Line 9) = wages + other income
 */
export function getTotalIncome(data: TaxFormState): number {
    const primaryWages = data.isW2Box5Different ? data.w2Box5Amount : data.wages;
    const spouseWages = data.isSpouseW2Box5Different ? data.spouseW2Box5Amount : data.spouseWages;
  
    return primaryWages + spouseWages + getTotalOtherIncome(data) + data.taxableSocialSecurityBenefits;
  }