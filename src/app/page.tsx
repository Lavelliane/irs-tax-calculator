import FilingStatus from "@/components/tax-form/FilingStatus";
import Income from "@/components/tax-form/Income";
import OtherIncome from "@/components/tax-form/OtherIncome";
import Adjustments from "@/components/tax-form/Adjustments";
import Deductions from "@/components/tax-form/Deductions";
import TaxBreakdown from "@/components/tax-form/TaxBreakdown";
import TaxCredits from "@/components/tax-form/TaxCredits";
import TaxAfterCredits from "@/components/tax-form/TaxAfterCredits";
import PaymentsAndRefundableCredits from "@/components/tax-form/PaymentsAndRefundableCredits";
import TaxCalculator from "@/components/tax-form/TaxCalculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="w-full bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            IRS Tax Calculator - Form 1040
          </h1>
          <a 
            href="/config" 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Tax Configuration Settings
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <FilingStatus />
            <Income />
            <OtherIncome />
            <Adjustments />
            <Deductions />
            <TaxBreakdown />
            <TaxCredits />
            <TaxAfterCredits />
            <PaymentsAndRefundableCredits />
          </div>
          
          <TaxCalculator />
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 shadow-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            This calculator is for informational purposes only and should not be considered tax advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
