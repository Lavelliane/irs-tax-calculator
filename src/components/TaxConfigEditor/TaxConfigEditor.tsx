'use client';

import { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { filingStatuses, FilingStatus } from '../../config/config';

// Define type for education credit field names
type EducationCreditField = 'maxCredit' | 'phaseOutStart' | 'phaseOutEnd';

export function TaxConfigEditor() {
  const { config, updateConfig, resetConfig } = useConfig();
  const [activeTab, setActiveTab] = useState<string>('standardDeductions');
  
  // Handler for standard deduction changes
  const handleStandardDeductionChange = (status: FilingStatus, value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      updateConfig({
        standardDeductions: {
          ...config.standardDeductions,
          [status]: numValue
        }
      });
    }
  };
  
  // Handler for additional deduction changes
  const handleAdditionalDeductionChange = (status: FilingStatus, value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      updateConfig({
        additionalDeduction: {
          ...config.additionalDeduction,
          [status]: numValue
        }
      });
    }
  };
  
  // Handler for tax bracket changes
  const handleTaxBracketChange = (status: FilingStatus, bracketIndex: number, field: 'rate' | 'threshold', value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      const newBrackets = [...config.taxBrackets[status]];
      newBrackets[bracketIndex] = {
        ...newBrackets[bracketIndex],
        [field]: field === 'rate' ? numValue : Math.floor(numValue)
      };
      
      updateConfig({
        taxBrackets: {
          ...config.taxBrackets,
          [status]: newBrackets
        }
      });
    }
  };

  // Handler for child tax credit changes
  const handleChildTaxCreditChange = (field: string, status: FilingStatus | null, value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      if (status) {
        updateConfig({
          childTaxCredit: {
            ...config.childTaxCredit,
            phaseOutThreshold: {
              ...config.childTaxCredit.phaseOutThreshold,
              [status]: numValue
            }
          }
        });
      } else {
        updateConfig({
          childTaxCredit: {
            ...config.childTaxCredit,
            [field]: numValue
          }
        });
      }
    }
  };

  // Handler for EITC limit changes
  const handleEITCLimitChange = (childCount: number, status: FilingStatus, field: 'maxAGI' | 'maxCredit', value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      updateConfig({
        eitcLimits: {
          ...config.eitcLimits,
          [childCount]: {
            ...config.eitcLimits[childCount],
            [status]: {
              ...config.eitcLimits[childCount][status],
              [field]: numValue
            }
          }
        }
      });
    }
  };

  // Handler for education credit changes
  const handleEducationCreditChange = (
    creditType: 'americanOpportunity' | 'lifetimeLearning',
    field: EducationCreditField,
    status: FilingStatus | null,
    value: string
  ) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      if (status && field !== 'maxCredit') {
        updateConfig({
          educationCredits: {
            ...config.educationCredits,
            [creditType]: {
              ...config.educationCredits[creditType],
              [field]: {
                ...config.educationCredits[creditType][field],
                [status]: numValue
              }
            }
          }
        });
      } else {
        updateConfig({
          educationCredits: {
            ...config.educationCredits,
            [creditType]: {
              ...config.educationCredits[creditType],
              [field]: numValue
            }
          }
        });
      }
    }
  };

  // Handler for retirement savings credit changes
  const handleRetirementCreditChange = (field: string, status: FilingStatus | null, value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      if (status) {
        updateConfig({
          retirementSavingsCredit: {
            ...config.retirementSavingsCredit,
            incomeLimits: {
              ...config.retirementSavingsCredit.incomeLimits,
              [status]: numValue
            }
          }
        });
      } else {
        updateConfig({
          retirementSavingsCredit: {
            ...config.retirementSavingsCredit,
            [field]: numValue
          }
        });
      }
    }
  };

  // Handler for self employment config changes
  const handleSelfEmploymentConfigChange = (field: string, value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      updateConfig({
        selfEmploymentConfig: {
          ...config.selfEmploymentConfig,
          [field]: numValue
        }
      });
    }
  };
  
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Tax Configuration Editor</h2>
      
      <div className="flex border-b border-gray-700 mb-4 overflow-x-auto pb-1">
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'standardDeductions' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
          onClick={() => setActiveTab('standardDeductions')}
        >
          Standard Deductions
        </button>
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'additionalDeductions' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
          onClick={() => setActiveTab('additionalDeductions')}
        >
          Additional Deductions
        </button>
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'taxBrackets' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
          onClick={() => setActiveTab('taxBrackets')}
        >
          Tax Brackets
        </button>
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'childTaxCredit' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
          onClick={() => setActiveTab('childTaxCredit')}
        >
          Child Tax Credit
        </button>
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'eitcLimits' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
          onClick={() => setActiveTab('eitcLimits')}
        >
          EITC Limits
        </button>
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'educationCredits' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
          onClick={() => setActiveTab('educationCredits')}
        >
          Education Credits
        </button>
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'retirementCredits' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
          onClick={() => setActiveTab('retirementCredits')}
        >
          Retirement Credits
        </button>
        <button 
          className={`py-2 px-4 whitespace-nowrap ${activeTab === 'selfEmployment' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
          onClick={() => setActiveTab('selfEmployment')}
        >
          Self Employment
        </button>
      </div>
      
      <div className="mb-4 overflow-y-auto max-h-[60vh]">
        {/* Standard Deductions Tab */}
        {activeTab === 'standardDeductions' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Standard Deductions (2024)</h3>
            {filingStatuses.map((status) => (
              <div key={status} className="flex items-center mb-2">
                <label className="w-48 font-medium">{status}:</label>
                <input
                  type="number"
                  value={config.standardDeductions[status]}
                  onChange={(e) => handleStandardDeductionChange(status, e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Additional Deductions Tab */}
        {activeTab === 'additionalDeductions' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Additional Deductions for Age 65+ or Blindness (2024)</h3>
            {filingStatuses.map((status) => (
              <div key={status} className="flex items-center mb-2">
                <label className="w-48 font-medium">{status}:</label>
                <input
                  type="number"
                  value={config.additionalDeduction[status]}
                  onChange={(e) => handleAdditionalDeductionChange(status, e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Tax Brackets Tab */}
        {activeTab === 'taxBrackets' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Tax Brackets (2024)</h3>
            
            {filingStatuses.map((status) => (
              <div key={status} className="mb-6">
                <h4 className="text-md font-semibold mb-2 text-blue-400">{status}</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-700 rounded-md">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">Bracket</th>
                        <th className="px-4 py-2 text-left">Rate (%)</th>
                        <th className="px-4 py-2 text-left">Threshold ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.taxBrackets[status].map((bracket, index) => (
                        <tr key={index} className="border-t border-gray-600">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              max="1"
                              value={bracket.rate}
                              onChange={(e) => handleTaxBracketChange(status, index, 'rate', e.target.value)}
                              className="border rounded p-1 w-20 bg-gray-700 border-gray-600 text-white"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={bracket.threshold}
                              onChange={(e) => handleTaxBracketChange(status, index, 'threshold', e.target.value)}
                              className="border rounded p-1 w-32 bg-gray-700 border-gray-600 text-white"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Child Tax Credit Tab */}
        {activeTab === 'childTaxCredit' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Child Tax Credit (2024)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <label className="w-48 font-medium">Max Credit Per Child:</label>
                <input
                  type="number"
                  value={config.childTaxCredit.maxPerChild}
                  onChange={(e) => handleChildTaxCreditChange('maxPerChild', null, e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div className="flex items-center">
                <label className="w-48 font-medium">Refundable Limit:</label>
                <input
                  type="number"
                  value={config.childTaxCredit.refundableLimit}
                  onChange={(e) => handleChildTaxCreditChange('refundableLimit', null, e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div className="flex items-center">
                <label className="w-48 font-medium">Phase-out Rate (per $1,000):</label>
                <input
                  type="number"
                  value={config.childTaxCredit.phaseOutRate}
                  onChange={(e) => handleChildTaxCreditChange('phaseOutRate', null, e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            
            <h4 className="font-medium mb-2 mt-4">Phase-out Thresholds:</h4>
            {filingStatuses.map((status) => (
              <div key={status} className="flex items-center mb-2">
                <label className="w-48 font-medium">{status}:</label>
                <input
                  type="number"
                  value={config.childTaxCredit.phaseOutThreshold[status]}
                  onChange={(e) => handleChildTaxCreditChange('phaseOutThreshold', status, e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            ))}
          </div>
        )}
        
        {/* EITC Limits Tab */}
        {activeTab === 'eitcLimits' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Earned Income Tax Credit Limits (2024)</h3>
            
            {[0, 1, 2, 3].map((childCount) => (
              <div key={childCount} className="mb-6">
                <h4 className="text-md font-semibold mb-2 text-blue-400">
                  {childCount === 0 ? 'No Children' : `${childCount} ${childCount === 1 ? 'Child' : 'Children'}`}
                </h4>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-700 rounded-md">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">Filing Status</th>
                        <th className="px-4 py-2 text-left">Max AGI ($)</th>
                        <th className="px-4 py-2 text-left">Max Credit ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filingStatuses.map((status) => (
                        <tr key={status} className="border-t border-gray-600">
                          <td className="px-4 py-2">{status}</td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={config.eitcLimits[childCount][status].maxAGI}
                              onChange={(e) => handleEITCLimitChange(childCount, status, 'maxAGI', e.target.value)}
                              className="border rounded p-1 w-32 bg-gray-700 border-gray-600 text-white"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={config.eitcLimits[childCount][status].maxCredit}
                              onChange={(e) => handleEITCLimitChange(childCount, status, 'maxCredit', e.target.value)}
                              className="border rounded p-1 w-32 bg-gray-700 border-gray-600 text-white"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Education Credits Tab */}
        {activeTab === 'educationCredits' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Education Credits (2024)</h3>
            
            <div className="mb-6">
              <h4 className="text-md font-semibold mb-2 text-blue-400">American Opportunity Credit</h4>
              
              <div className="flex items-center mb-4">
                <label className="w-48 font-medium">Max Credit:</label>
                <input
                  type="number"
                  value={config.educationCredits.americanOpportunity.maxCredit}
                  onChange={(e) => handleEducationCreditChange('americanOpportunity', 'maxCredit', null, e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <h5 className="font-medium mb-2">Phase-out Start Thresholds:</h5>
              {filingStatuses.map((status) => (
                <div key={`ao-start-${status}`} className="flex items-center mb-2">
                  <label className="w-48 font-medium">{status}:</label>
                  <input
                    type="number"
                    value={config.educationCredits.americanOpportunity.phaseOutStart[status]}
                    onChange={(e) => handleEducationCreditChange('americanOpportunity', 'phaseOutStart', status, e.target.value)}
                    className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              ))}
              
              <h5 className="font-medium mb-2 mt-4">Phase-out End Thresholds:</h5>
              {filingStatuses.map((status) => (
                <div key={`ao-end-${status}`} className="flex items-center mb-2">
                  <label className="w-48 font-medium">{status}:</label>
                  <input
                    type="number"
                    value={config.educationCredits.americanOpportunity.phaseOutEnd[status]}
                    onChange={(e) => handleEducationCreditChange('americanOpportunity', 'phaseOutEnd', status, e.target.value)}
                    className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <h4 className="text-md font-semibold mb-2 text-blue-400">Lifetime Learning Credit</h4>
              
              <div className="flex items-center mb-4">
                <label className="w-48 font-medium">Max Credit:</label>
                <input
                  type="number"
                  value={config.educationCredits.lifetimeLearning.maxCredit}
                  onChange={(e) => handleEducationCreditChange('lifetimeLearning', 'maxCredit', null, e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <h5 className="font-medium mb-2">Phase-out Start Thresholds:</h5>
              {filingStatuses.map((status) => (
                <div key={`ll-start-${status}`} className="flex items-center mb-2">
                  <label className="w-48 font-medium">{status}:</label>
                  <input
                    type="number"
                    value={config.educationCredits.lifetimeLearning.phaseOutStart[status]}
                    onChange={(e) => handleEducationCreditChange('lifetimeLearning', 'phaseOutStart', status, e.target.value)}
                    className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              ))}
              
              <h5 className="font-medium mb-2 mt-4">Phase-out End Thresholds:</h5>
              {filingStatuses.map((status) => (
                <div key={`ll-end-${status}`} className="flex items-center mb-2">
                  <label className="w-48 font-medium">{status}:</label>
                  <input
                    type="number"
                    value={config.educationCredits.lifetimeLearning.phaseOutEnd[status]}
                    onChange={(e) => handleEducationCreditChange('lifetimeLearning', 'phaseOutEnd', status, e.target.value)}
                    className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Retirement Credits Tab */}
        {activeTab === 'retirementCredits' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Retirement Savings Credit (2024)</h3>
            
            <div className="flex items-center mb-4">
              <label className="w-48 font-medium">Max Credit (per person):</label>
              <input
                type="number"
                value={config.retirementSavingsCredit.maxCredit}
                onChange={(e) => handleRetirementCreditChange('maxCredit', null, e.target.value)}
                className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <h4 className="font-medium mb-2">Income Limits:</h4>
            {filingStatuses.map((status) => (
              <div key={status} className="flex items-center mb-2">
                <label className="w-48 font-medium">{status}:</label>
                <input
                  type="number"
                  value={config.retirementSavingsCredit.incomeLimits[status]}
                  onChange={(e) => handleRetirementCreditChange('incomeLimits', status, e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Self Employment Tab */}
        {activeTab === 'selfEmployment' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Self-Employment Tax Configuration (2024)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center mb-2">
                <label className="w-48 font-medium">Medicare Percent:</label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  max="1"
                  value={config.selfEmploymentConfig.medicarePercent}
                  onChange={(e) => handleSelfEmploymentConfigChange('medicarePercent', e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div className="flex items-center mb-2">
                <label className="w-48 font-medium">Self-Employment Limit:</label>
                <input
                  type="number"
                  value={config.selfEmploymentConfig.selfEmploymentLimit}
                  onChange={(e) => handleSelfEmploymentConfigChange('selfEmploymentLimit', e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div className="flex items-center mb-2">
                <label className="w-48 font-medium">Tax Rate:</label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  max="1"
                  value={config.selfEmploymentConfig.selfEmploymentTaxRate}
                  onChange={(e) => handleSelfEmploymentConfigChange('selfEmploymentTaxRate', e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div className="flex items-center mb-2">
                <label className="w-48 font-medium">Exceeding Threshold Rate:</label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  max="1"
                  value={config.selfEmploymentConfig.exceedingThresholdTaxRate}
                  onChange={(e) => handleSelfEmploymentConfigChange('exceedingThresholdTaxRate', e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div className="flex items-center mb-2">
                <label className="w-48 font-medium">Taxable Percentage:</label>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  max="1"
                  value={config.selfEmploymentConfig.taxablePercentage}
                  onChange={(e) => handleSelfEmploymentConfigChange('taxablePercentage', e.target.value)}
                  className="border rounded p-2 w-32 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end mt-4">
        <button
          onClick={resetConfig}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
        >
          Reset to Defaults
        </button>
        <button
          onClick={() => alert('Configuration saved!')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
} 