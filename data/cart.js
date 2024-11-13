export let cart = JSON.parse(localStorage.getItem('cart'));



if (!cart) {
  cart = [
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
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
};

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem = cart.find(product => product.productId === productId);

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
};

export function loadCart(func) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);

    func();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}