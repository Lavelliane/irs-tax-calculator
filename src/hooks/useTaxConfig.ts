import { useConfig } from '../context/ConfigContext';

/**
 * Custom hook to access the current tax configuration
 * 
 * This hook provides the current tax configuration which can be
 * modified through the UI. The default values are loaded from
 * the static config file but can be overridden.
 */
export function useTaxConfig() {
  const { config } = useConfig();
  
  return config;
} 