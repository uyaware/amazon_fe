export const cart = [];

export function addProductToCart(productId, quantity) {
  let matchingItem;
  for (let item of cart) {
    if (productId === item.productId) {
      matchingItem = item;
      break;
    }
  }

  if (matchingItem) {
    matchingItem.quantity += quantity;
  }
  else {
    cart.push({
      productId,
      quantity
    });
  }
}