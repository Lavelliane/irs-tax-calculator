// src/config/taxConfig.ts

export type FilingStatus =
    | 'Single'
    | 'MarriedFilingJointly'
    | 'MarriedFilingSeparately'
    | 'HeadOfHousehold'
    | 'QualifyingWidow';

export const filingStatuses: FilingStatus[] = [
    'Single',
    'MarriedFilingJointly',
    'MarriedFilingSeparately',
    'HeadOfHousehold',
    'QualifyingWidow',
];

// Standard Deductions for 2024
export const standardDeductions: Record<FilingStatus, number> = {
    Single: 14600,
    MarriedFilingJointly: 29200,
    MarriedFilingSeparately: 14600,
    HeadOfHousehold: 21900,
    QualifyingWidow: 29200,
};

// Additional Deduction for Age 65+ or Blindness
// For 2024: $1,950 for Single/Head of Household, $1,550 for Married Filing Jointly/Separately or Qualifying Widow(er)
export const additionalDeduction: Record<FilingStatus, number> = {
    Single: 1950,
    MarriedFilingJointly: 1550,
    MarriedFilingSeparately: 1550,
    HeadOfHousehold: 1950,
    QualifyingWidow: 1550,
};

// Tax Brackets for 2024
export interface TaxBracket {
    rate: number;      // e.g., 0.10 for 10%
    threshold: number; // Income threshold for this rate
}

export const taxBrackets: Record<FilingStatus, TaxBracket[]> = {
    Single: [
        { rate: 0.10, threshold: 0 },
        { rate: 0.12, threshold: 11601 },
        { rate: 0.22, threshold: 47151 },
        { rate: 0.24, threshold: 100526 },
        { rate: 0.32, threshold: 191951 },
        { rate: 0.35, threshold: 243726 },
        { rate: 0.37, threshold: 609351 },
    ],
    MarriedFilingJointly: [
        { rate: 0.10, threshold: 0 },
        { rate: 0.12, threshold: 23201 },
        { rate: 0.22, threshold: 94301 },
        { rate: 0.24, threshold: 201051 },
        { rate: 0.32, threshold: 383901 },
        { rate: 0.35, threshold: 487451 },
        { rate: 0.37, threshold: 731201 },
    ],
    MarriedFilingSeparately: [
        { rate: 0.10, threshold: 0 },
        { rate: 0.12, threshold: 11601 },
        { rate: 0.22, threshold: 47151 },
        { rate: 0.24, threshold: 100526 },
        { rate: 0.32, threshold: 191951 },
        { rate: 0.35, threshold: 243726 },
        { rate: 0.37, threshold: 365601 },
    ],
    HeadOfHousehold: [
        { rate: 0.10, threshold: 0 },
        { rate: 0.12, threshold: 17401 },
        { rate: 0.22, threshold: 67501 },
        { rate: 0.24, threshold: 108401 },
        { rate: 0.32, threshold: 189451 },
        { rate: 0.35, threshold: 243701 },
        { rate: 0.37, threshold: 609351 },
    ],
    QualifyingWidow: [
        { rate: 0.10, threshold: 0 },
        { rate: 0.12, threshold: 23201 },
        { rate: 0.22, threshold: 94301 },
        { rate: 0.24, threshold: 201051 },
        { rate: 0.32, threshold: 383901 },
        { rate: 0.35, threshold: 487451 },
        { rate: 0.37, threshold: 731201 },
    ],
};

// Child Tax Credit for 2024
export const childTaxCredit = {
    maxPerChild: 2000,
    refundableLimit: 1700, // Additional Child Tax Credit
    phaseOutThreshold: {
        Single: 200000,
        MarriedFilingJointly: 400000,
        MarriedFilingSeparately: 200000,
        HeadOfHousehold: 200000,
        QualifyingWidow: 400000,
    },
    phaseOutRate: 50, // $50 reduction per $1,000 over the threshold
};

// Earned Income Tax Credit (EITC) Limits for 2024
export interface EITCLimits {
    maxAGI: number;
    maxCredit: number;
}

export const eitcLimits: Record<
    number,
    Record<FilingStatus, EITCLimits>
> = {
    0: {
        Single: { maxAGI: 18591, maxCredit: 632 },
        MarriedFilingJointly: { maxAGI: 25511, maxCredit: 632 },
        MarriedFilingSeparately: { maxAGI: 0, maxCredit: 0 }, // Not eligible
        HeadOfHousehold: { maxAGI: 18591, maxCredit: 632 },
        QualifyingWidow: { maxAGI: 25511, maxCredit: 632 },
    },
    1: {
        Single: { maxAGI: 49084, maxCredit: 4213 },
        MarriedFilingJointly: { maxAGI: 56004, maxCredit: 4213 },
        MarriedFilingSeparately: { maxAGI: 0, maxCredit: 0 },
        HeadOfHousehold: { maxAGI: 49084, maxCredit: 4213 },
        QualifyingWidow: { maxAGI: 56004, maxCredit: 4213 },
    },
    2: {
        Single: { maxAGI: 55768, maxCredit: 6960 },
        MarriedFilingJointly: { maxAGI: 62688, maxCredit: 6960 },
        MarriedFilingSeparately: { maxAGI: 0, maxCredit: 0 },
        HeadOfHousehold: { maxAGI: 55768, maxCredit: 6960 },
        QualifyingWidow: { maxAGI: 62688, maxCredit: 6960 },
    },
    3: {
        Single: { maxAGI: 59478, maxCredit: 7753 },
        MarriedFilingJointly: { maxAGI: 66398, maxCredit: 7753 },
        MarriedFilingSeparately: { maxAGI: 0, maxCredit: 0 },
        HeadOfHousehold: { maxAGI: 59478, maxCredit: 7753 },
        QualifyingWidow: { maxAGI: 66398, maxCredit: 7753 },
    },
}

export const educationCredits = {
    americanOpportunity: {
        maxCredit: 2500,
        phaseOutStart: {
            Single: 80000,
            MarriedFilingJointly: 160000,
            HeadOfHousehold: 80000,
            QualifyingWidow: 160000,
            MarriedFilingSeparately: 0, // Not eligible
        },
        phaseOutEnd: {
            Single: 90000,
            MarriedFilingJointly: 180000,
            HeadOfHousehold: 90000,
            QualifyingWidow: 180000,
            MarriedFilingSeparately: 0,
        },
    },
    lifetimeLearning: {
        maxCredit: 2000,
        phaseOutStart: {
            Single: 80000,
            MarriedFilingJointly: 160000,
            HeadOfHousehold: 80000,
            QualifyingWidow: 160000,
            MarriedFilingSeparately: 0,
        },
        phaseOutEnd: {
            Single: 90000,
            MarriedFilingJointly: 180000,
            HeadOfHousehold: 90000,
            QualifyingWidow: 180000,
            MarriedFilingSeparately: 0,
        },
    },
};

export const retirementSavingsCredit = {
    incomeLimits: {
        Single: 36500,
        MarriedFilingJointly: 73000,
        HeadOfHousehold: 54750,
        MarriedFilingSeparately: 36500,
        QualifyingWidow: 73000,
    },
    maxCredit: 1000, // Per person
};

export const refundableCreditLimits = {
    netPremiumTaxCredit: {
        max: Infinity, // Depends on marketplace and coverage
    },
    otherRefundableCredits: {
        max: Infinity,
    },
};

export const withholdings = {
    maxExcessSocialSecurity: 9870.60, // 2024 wage base of $168,600 x 6.2%
};


export const selfEmploymentConfig = {
  medicarePercent: 0.029,
  selfEmploymentLimit: 168_600,
  selfEmploymentTaxRate: 0.153,
  exceedingThresholdTaxRate: 0.124,
  taxablePercentage: 0.9235,
};
