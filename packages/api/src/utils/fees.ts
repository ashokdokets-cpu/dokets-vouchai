// Fee tiers by currency (all amounts in base unit)
const FEE_TIERS: Record<string, { micro: number; small: number; medium: number; large: number }> = {
  INR: { micro: 2000, small: 10000, medium: 50000, large: 100000 },
  USD: { micro: 25, small: 120, medium: 600, large: 1200 },
  EUR: { micro: 23, small: 110, medium: 550, large: 1100 },
  GBP: { micro: 20, small: 95, medium: 475, large: 950 },
  JPY: { micro: 3000, small: 15000, medium: 75000, large: 150000 },
  AUD: { micro: 35, small: 180, medium: 900, large: 1800 },
  CAD: { micro: 30, small: 160, medium: 800, large: 1600 },
  SGD: { micro: 30, small: 160, medium: 800, large: 1600 },
  AED: { micro: 90, small: 450, medium: 2250, large: 4500 },
  SAR: { micro: 90, small: 450, medium: 2250, large: 4500 },
  BRL: { micro: 120, small: 600, medium: 3000, large: 6000 },
  MXN: { micro: 400, small: 2000, medium: 10000, large: 20000 },
  NGN: { micro: 20000, small: 100000, medium: 500000, large: 1000000 },
  KES: { micro: 3000, small: 15000, medium: 75000, large: 150000 },
  ZAR: { micro: 400, small: 2000, medium: 10000, large: 20000 },
  EGP: { micro: 700, small: 3500, medium: 17500, large: 35000 },
  CNY: { micro: 170, small: 850, medium: 4250, large: 8500 },
  KRW: { micro: 30000, small: 150000, medium: 750000, large: 1500000 },
  IDR: { micro: 350000, small: 1750000, medium: 8750000, large: 17500000 },
  PHP: { micro: 1300, small: 6500, medium: 32500, large: 65000 },
  VND: { micro: 550000, small: 2750000, medium: 13750000, large: 27500000 },
  THB: { micro: 800, small: 4000, medium: 20000, large: 40000 },
  NZD: { micro: 35, small: 180, medium: 900, large: 1800 },
  ARS: { micro: 20000, small: 100000, medium: 500000, large: 1000000 },
};

const FLAT_FEES: Record<string, number> = {
  INR: 20, USD: 0.25, EUR: 0.23, GBP: 0.20, JPY: 30,
  AUD: 0.35, CAD: 0.30, SGD: 0.30, AED: 1, SAR: 1,
  BRL: 1.20, MXN: 4, NGN: 200, KES: 30, ZAR: 4,
  EGP: 7, CNY: 1.70, KRW: 300, IDR: 3500, PHP: 13,
  VND: 5500, THB: 8, NZD: 0.35, ARS: 200,
};

export function calculateFee(amount: number, currency: string = 'INR'): { 
  fee: number; 
  percentage: number; 
  tier: string;
  displayFee: string;
} {
  const tiers = FEE_TIERS[currency] || FEE_TIERS['INR'];
  const flatFee = FLAT_FEES[currency] || FLAT_FEES['INR'];
  
  let fee: number, percentage: number, tier: string;
  
  if (amount <= tiers.micro) {
    fee = flatFee;
    percentage = 0;
    tier = 'micro';
  } else if (amount <= tiers.small) {
    fee = Math.round(amount * 0.02);
    percentage = 2;
    tier = 'small';
  } else if (amount <= tiers.medium) {
    fee = Math.round(amount * 0.015);
    percentage = 1.5;
    tier = 'medium';
  } else {
    fee = Math.round(amount * 0.01);
    percentage = 1;
    tier = 'large';
  }
  
  const symbols: Record<string, string> = { INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', SGD: 'S$', AED: 'د.إ', SAR: '﷼', BRL: 'R$', MXN: 'Mex$', NGN: '₦', KES: 'KSh', ZAR: 'R', EGP: 'E£', CNY: '¥', KRW: '₩', IDR: 'Rp', PHP: '₱', VND: '₫', THB: '฿', NZD: 'NZ$', ARS: 'AR$' };
  
  return {
    fee,
    percentage,
    tier,
    displayFee: `${symbols[currency] || currency} ${fee}`
  };
}

// Subscription Plans by currency
export const SUBSCRIPTION_PLANS: Record<string, { free: number; pro: number; business: number }> = {
  INR: { free: 0, pro: 299, business: 999 },
  USD: { free: 0, pro: 5, business: 15 },
  EUR: { free: 0, pro: 4, business: 12 },
  GBP: { free: 0, pro: 4, business: 11 },
  JPY: { free: 0, pro: 500, business: 1500 },
  AUD: { free: 0, pro: 7, business: 20 },
  CAD: { free: 0, pro: 6, business: 18 },
  SGD: { free: 0, pro: 6, business: 18 },
  AED: { free: 0, pro: 15, business: 45 },
  BRL: { free: 0, pro: 25, business: 75 },
};

export function getSubscriptionPrice(currency: string = 'INR') {
  return SUBSCRIPTION_PLANS[currency] || SUBSCRIPTION_PLANS['INR'];
}