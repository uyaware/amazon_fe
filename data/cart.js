export const cart = [
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
  },
  {
    productId: "bc2847e9-5323-403f-b7cf-57fde044a1231445",
    quantity: 1,
  }
];

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

export function removeProductFromCart(productId) {
  cart.forEach((item, index) => {
    if (item.productId === productId) {
      cart.splice(index, 1);
    }
  });
}