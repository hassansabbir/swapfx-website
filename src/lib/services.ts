import { MOCK_MATCHES, MOCK_RATE, CURRENCIES } from "@/constants/mockData";
import { UserMatch, SwapRate, Currency } from "@/types";

// Simulating network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const swapService = {
  getMatches: async (): Promise<UserMatch[]> => {
    await delay(500); // Simulate API call
    return MOCK_MATCHES;
  },

  getRate: async (from: string, to: string): Promise<SwapRate> => {
    await delay(300);
    return MOCK_RATE;
  },

  getCurrencies: async (): Promise<Currency[]> => {
    return CURRENCIES;
  },
};
