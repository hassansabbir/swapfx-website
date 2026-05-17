export type SwapView =
  | "MAIN"
  | "AGREEMENT"
  | "CREATE_SWAP"
  | "SUCCESS"
  | "CONFIRMATION";

export interface Swap {
  id: string;
  name: string;
  swapperName: string;
  rating: string;
  reviews: number;
  offerAmount: string;
  receiveAmount: string;
  amountSent: string;
  amountReceive: string;
  date: string;
  time: string;
  status: string;
  avatarUrl: string;
  note: string;
}

export const MOCK_SWAPS: Swap[] = [
  {
    id: "SWAP-4521",
    name: "Bob Builder",
    swapperName: "Fahim Ahmed",
    rating: "4.7",
    reviews: 56,
    offerAmount: "£200 GBP",
    receiveAmount: "$250 USD",
    amountSent: "USD 200",
    amountReceive: "PKR 15000.00",
    date: "01 Feb 2026",
    time: "10:50 am",
    status: "Incomplete",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    note: "Funds are being transferred according to the agreed swap terms. Bank-to-bank payment only, completed within the active time window.",
  },
  {
    id: "SWAP-4522",
    name: "Bob Builder",
    swapperName: "Fahim Ahmed",
    rating: "4.7",
    reviews: 56,
    offerAmount: "£200 GBP",
    receiveAmount: "$250 USD",
    amountSent: "USD 200",
    amountReceive: "PKR 15000.00",
    date: "01 Feb 2026",
    time: "10:50 am",
    status: "Completed",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    note: "Funds are being transferred according to the agreed swap terms. Bank-to-bank payment only, completed within the active time window.",
  },
  {
    id: "SWAP-4523",
    name: "Bob Builder",
    swapperName: "Fahim Ahmed",
    rating: "4.7",
    reviews: 56,
    offerAmount: "£200 GBP",
    receiveAmount: "$250 USD",
    amountSent: "USD 200",
    amountReceive: "PKR 15000.00",
    date: "01 Feb 2026",
    time: "10:50 am",
    status: "Incomplete",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    note: "Funds are being transferred according to the agreed swap terms. Bank-to-bank payment only, completed within the active time window.",
  },
];
