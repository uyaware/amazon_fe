class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromLocalStorage();
  }
  
  #loadFromLocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
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
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  cartTotalQuantity() {
    let totalQuantity = 0;
    this.cartItems.forEach((item) => {
      totalQuantity += item.quantity;
    });
  
    return totalQuantity;
  }

  addProductToCart(productId, quantity) {
    let matchingItem = this.cartItems.find(item => item.productId === productId);
  
    if (matchingItem) {
      matchingItem.quantity += quantity;
    }
    else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }

  removeProductFromCart(productId) {
    this.cartItems.forEach((item, index) => {
      if (item.productId === productId) {
        this.cartItems.splice(index, 1);
      }
    });
  
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem = this.cartItems.find(product => product.productId === productId);
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }
}

const cart1 = new Cart('cart-oop');

const cart2 = new Cart('cart-business');


cart2.addProductToCart('bc2847e9-5323-403f-b7cf-57fde044a1231231', 1);


console.log(cart1);
console.log(cart2);
