import { UserMatch, Currency, SwapRate } from "@/types";

export const MOCK_MATCHES: UserMatch[] = [
  {
    id: "1",
    name: "Miss. Bob Builder",
    username: "@BobBuilder7890",
    want: "₱28,000",
    offer: "$500",
    type: "perfect",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    country: "🇺🇸",
    isVerified: true,
  },
  {
    id: "2",
    name: "Miss. Bob Builder",
    username: "@BobBuilder7890",
    want: "₱15,000",
    offer: "$270",
    type: "close",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Builder",
    country: "🇺🇸",
    isVerified: true,
  },
  {
    id: "3",
    name: "Miss. Bob Builder",
    username: "@BobBuilder7890",
    want: "₱15,000",
    offer: "$700",
    type: "partial",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fahim",
    country: "🇺🇸",
    isVerified: true,
  },
];

export const CURRENCIES: Currency[] = [
  { code: "USD", name: "United States Dollar", symbol: "$" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
];

export const MOCK_RATE: SwapRate = {
  from: "USD",
  to: "PHP",
  rate: 55.90,
  marketRate: 55.00,
};
