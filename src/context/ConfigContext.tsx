'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import * as defaultConfig from '../config/config';

// Define the context type
type ConfigContextType = {
  config: typeof defaultConfig;
  updateConfig: (newConfig: Partial<typeof defaultConfig>) => void;
  resetConfig: () => void;
};

// Create the context with a default value
const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// Provider component
export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<typeof defaultConfig>({ ...defaultConfig });

  const updateConfig = (newConfig: Partial<typeof defaultConfig>) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      ...newConfig,
    }));
  };

  const resetConfig = () => {
    setConfig({ ...defaultConfig });
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

// Custom hook to use the config context
export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
} 