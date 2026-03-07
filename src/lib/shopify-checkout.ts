/**
 * Shopify Checkout Helper
 * Genereert een checkout URL met cart items en redirect
 */

export interface CheckoutLineItem {
  variantId: string;
  quantity: number;
}

/**
 * Maak een Shopify checkout URL met gegeven items
 */
export function createCheckoutUrl(lineItems: CheckoutLineItem[]): string {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  
  if (!storeDomain) {
    throw new Error('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN niet ingesteld');
  }

  // Bouw de checkout URL met line items
  // Format: https://domain/cart/c:variant:quantity,c:variant:quantity
  const itemsString = lineItems
    .map((item) => `${item.variantId}:${item.quantity}`)
    .join(',');

  return `https://${storeDomain}/cart/${itemsString}`;
}

/**
 * Redirect naar Shopify checkout
 */
export function redirectToCheckout(lineItems: CheckoutLineItem[]): void {
  const checkoutUrl = createCheckoutUrl(lineItems);
  window.location.href = checkoutUrl;
}
