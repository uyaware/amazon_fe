export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: "bc2847e9-5323-403f-b7cf-57fde044a1231445",
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
}

export function cartTotalQuantity() {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });

  return totalQuantity;
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeProductFromCart(productId) {
  cart.forEach((item, index) => {
    if (item.productId === productId) {
      cart.splice(index, 1);
    }
  });

  saveToStorage();
}