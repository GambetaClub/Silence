import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const moneyFormatter = Intl.NumberFormat("nl-NL", {
  currency: "EUR",
  currencyDisplay: "symbol",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatPrice = (price: number) => {
  return moneyFormatter.format(price)
}