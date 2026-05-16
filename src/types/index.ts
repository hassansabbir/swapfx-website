export interface UserMatch {
  id: string;
  name: string;
  username: string;
  want: string;
  offer: string;
  type: "perfect" | "close" | "partial";
  avatar: string;
  country: string;
  isVerified: boolean;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface SwapRate {
  from: string;
  to: string;
  rate: number;
  marketRate: number;
}
