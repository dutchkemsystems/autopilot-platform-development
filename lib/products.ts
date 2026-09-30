export const PRODUCTS = [
  {
    id: 'autopilot-growth',
    name: 'Autopilot Growth',
    description: 'Automated revenue intelligence for growing dealer groups.',
    priceInCents: 4900,
  },
] as const

export type ProductId = (typeof PRODUCTS)[number]['id']
