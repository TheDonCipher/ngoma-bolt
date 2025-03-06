/**
 * Safely converts a price value to bigint
 * @param price Price as string, number, or bigint
 * @returns Price as bigint
 */
export function toBigInt(price: string | number | bigint): bigint {
  if (typeof price === 'bigint') return price;
  
  try {
    // Handle string formats like "$50.00", "50", "50.00"
    if (typeof price === 'string') {
      // Remove non-numeric characters except period
      const cleanedPrice = price.replace(/[^0-9.]/g, '');
      // Convert to cents/smallest unit by removing decimal point
      const parts = cleanedPrice.split('.');
      if (parts.length === 1) {
        // No decimal, convert directly
        return BigInt(parts[0] + '00'); // Add 00 for cents
      } else {
        // Has decimal, format correctly
        const whole = parts[0];
        const decimal = parts[1].padEnd(2, '0').substring(0, 2);
        return BigInt(whole + decimal);
      }
    }
    
    // Handle number
    if (typeof price === 'number') {
      // Convert to cents and then to bigint
      return BigInt(Math.round(price * 100));
    }
  } catch (error) {
    console.error("Error converting price to bigint:", error);
    return BigInt(0);
  }
  
  return BigInt(0);
}

/**
 * Formats a bigint price for display
 * @param price Price in smallest unit (e.g., cents)
 * @returns Formatted price string
 */
export function formatPrice(price: bigint | string): string {
  let bigintPrice: bigint;
  
  if (typeof price === 'string') {
    try {
      bigintPrice = BigInt(price.replace(/[^0-9]/g, ''));
    } catch {
      return '$0.00';
    }
  } else {
    bigintPrice = price;
  }
  
  const priceString = bigintPrice.toString();
  const dollars = priceString.slice(0, -2) || '0';
  const cents = priceString.slice(-2).padStart(2, '0');
  
  return `$${dollars}.${cents}`;
}
