import { useTaxFormStore } from './useTaxFormStore';

/**
 * Custom hook for accessing and manipulating tax form data
 * This serves as a wrapper around the Zustand store
 * and can be extended with additional functionality in the future
 */
export function useTaxForm() {
  const taxFormState = useTaxFormStore();
  
  return {
    ...taxFormState,
    
    // Additional helper functions can be added here
    
    // Example of a helper function to check if the form is valid
    isFormValid: () => {
      // Add validation logic here
      return true;
    },
    
    // Example of a helper function to reset the form
    resetForm: () => {
      taxFormState.setFilingStatus('Single');
      taxFormState.setIsDependent(false);
      taxFormState.setChildTaxCreditDependents(0);
      taxFormState.setOtherDependentTaxCreditDependents(0);
    }
  };
} 