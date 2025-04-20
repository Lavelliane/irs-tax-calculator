import { TaxConfigEditor } from "../../components/TaxConfigEditor";

export default function ConfigPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="w-full bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-white">
            Tax Configuration Settings
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="mb-6 text-gray-400">
          Modify the tax settings used for calculations. Changes will apply to all tax calculations until reset.
        </p>
        
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <TaxConfigEditor />
          </div>
        </div>
        
        <div className="mt-8">
          <a 
            href="/" 
            className="text-blue-400 hover:text-blue-300 hover:underline"
          >
            ← Return to Calculator
          </a>
        </div>
      </main>
      
      <footer className="bg-gray-800 shadow-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-400">
            This configuration tool allows you to adjust tax parameters for simulation purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
} 