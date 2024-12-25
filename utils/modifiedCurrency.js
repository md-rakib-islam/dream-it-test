import convertCurrency from "./currency";

export function modifiedCurrency(price, currency) {
  if (!price || !currency) {
    console.error("Invalid input to modifiedCurrency:", { price, currency });
    return null; // Return null if price or currency is invalid
  }

  // Directly return the result of convertCurrency
  return convertCurrency(parseInt(price), "EUR", currency);
}
