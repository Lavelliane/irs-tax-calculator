# IRS Tax Calculator - Form 1040

A modern, responsive web application for calculating federal income taxes based on IRS Form 1040. This calculator helps users estimate their tax liability by filling out a simplified version of the IRS Form 1040.

## Features

- **Modern UI**: Built with Next.js and styled with Tailwind CSS for a clean, responsive interface
- **Interactive Forms**: User-friendly forms for entering tax information
- **State Management**: Uses Zustand for persistent state management
- **Modern Icons**: Uses Lucide React for beautiful SVG icons
- **Real-time Calculations**: Instant tax calculations based on the latest tax brackets and rules
- **Collapsible Sections**: Organized form sections that can be expanded or collapsed
- **Dark Mode Support**: Supports both light and dark themes
- **Data Persistence**: Form data persists through page refreshes using local storage

## Current Components

- **Filing Status & Dependents**: Choose filing status and enter information about dependents
  - Filing status selection (Single, Married filing jointly, etc.)
  - Dependent status
  - Number of dependents qualifying for child tax credit
  - Number of dependents qualifying for other dependent tax credit

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/irs-tax-calculator.git
   cd irs-tax-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx     # Main layout component
│   ├── page.tsx       # Home page (serves as the main tax form)
│   └── globals.css    # Global styles
├── components/
│   └── tax-form/      # Tax form components
│       ├── FilingStatus.tsx      # Filing status and dependents component
│       ├── TaxCalculator.tsx     # Tax calculation and results component
│       └── icons/                # Icon components
│           └── QuestionMarkIcon.tsx  # Help icon component
├── hooks/
│   ├── useTaxForm.ts          # Custom hook wrapping the Zustand store
│   └── useTaxFormStore.ts     # Zustand store for state management
```

## Dependencies

- Next.js
- React
- Tailwind CSS
- Zustand (State management)
- Lucide React (Icons)

## Planned Features

- Income section (wages, interest, dividends, etc.)
- Deductions section (standard deduction or itemized)
- Credits section (child tax credit, education credits, etc.)
- Detailed tax breakdown
- Printable tax summary
- Save/load functionality for tax information

## Disclaimer

This calculator is for informational purposes only and should not be considered tax advice. For accurate tax information, please consult a tax professional or refer to the official IRS documentation.

## License

[MIT](LICENSE)
