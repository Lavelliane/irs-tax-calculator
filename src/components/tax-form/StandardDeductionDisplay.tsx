'use client';

import { useTaxConfig } from '../../hooks/useTaxConfig';
import { FilingStatus } from '../../config/config';

interface StandardDeductionDisplayProps {
  filingStatus: FilingStatus;
  age65orOlder?: boolean;
  blind?: boolean;
}

export default function StandardDeductionDisplay({
  filingStatus,
  age65orOlder = false,
  blind = false,
}: StandardDeductionDisplayProps) {
  // Get the configuration from the context
  const taxConfig = useTaxConfig();
  
  // Calculate the standard deduction
  const standardDeduction = taxConfig.standardDeductions[filingStatus];
  
  // Calculate additional deductions for age or blindness
  const additionalAmount = taxConfig.additionalDeduction[filingStatus];
  const additionalDeductions = (age65orOlder ? additionalAmount : 0) + (blind ? additionalAmount : 0);
  
  // Total standard deduction
  const totalDeduction = standardDeduction + additionalDeductions;

  return (
    <div className="my-4 p-4 bg-gray-700 rounded-md">
      <h3 className="text-lg font-semibold text-white">Standard Deduction</h3>
      <div className="mt-2 grid grid-cols-2 gap-2 text-white">
        <div>Base standard deduction:</div>
        <div className="text-right">${standardDeduction.toLocaleString()}</div>
        
        {(age65orOlder || blind) && (
          <>
            <div>Additional deductions:</div>
            <div className="text-right">${additionalDeductions.toLocaleString()}</div>
          </>
        )}
        
        <div className="font-medium">Total standard deduction:</div>
        <div className="text-right font-medium">${totalDeduction.toLocaleString()}</div>
      </div>
    </div>
  );
} 