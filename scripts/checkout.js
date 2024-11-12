import { cart, removeProductFromCart, cartTotalQuantity, addProductToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummary = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;

  for (let product of products) {
    if (productId === product.id) {
      matchingProduct = product;
      break;
    }
  }

  cartSummary += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input invisible js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link invisible link-primary js-save-quantity-link-${matchingProduct.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link js-delete-quantity-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});


document.querySelector('.js-cart-total-quantity').innerHTML = `${cartTotalQuantity()} items`;

document.querySelector('.js-order-summary').innerHTML = cartSummary;

document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
  link.addEventListener('click', ()=> {
    const productId = link.dataset.productId;

    removeProductFromCart(productId);

    document.querySelector(`.js-cart-item-container-${productId}`).remove();

    document.querySelector('.js-cart-total-quantity').innerHTML = `${cartTotalQuantity()} items`;
  });
});



document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
  link.addEventListener('click', ()=> {
    const productId = link.dataset.productId;

    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    const updateButton = document.querySelector(`.js-update-quantity-link-${productId}`);
    const deleteButton = document.querySelector(`.js-delete-quantity-link-${productId}`);
    const saveButton = document.querySelector(`.js-save-quantity-link-${productId}`);
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

    quantityLabel.classList.toggle('invisible');
    updateButton.classList.toggle('invisible');
    deleteButton.classList.toggle('invisible');
    saveButton.classList.toggle('invisible');
    quantityInput.classList.toggle('invisible');

    saveButton.addEventListener('click', () => {
      let quantity = Number(quantityInput.value);
      console.log(quantity);
      if (isNaN(quantity)) {
        alert('Please enter a number');
      }
      else {
        let addQuantity = quantity - Number(quantityLabel.innerHTML);
        addProductToCart(productId, addQuantity);
        document.querySelector('.js-cart-total-quantity').innerHTML = `${cartTotalQuantity()} items`;
        quantityLabel.innerHTML = quantity;
      }

      quantityLabel.classList.toggle('invisible');
      updateButton.classList.toggle('invisible');
      deleteButton.classList.toggle('invisible');
      saveButton.classList.toggle('invisible');
      quantityInput.classList.toggle('invisible');
    });

    quantityInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        let quantity = Number(quantityInput.value);
      console.log(quantity);
      if (isNaN(quantity)) {
        alert('Please enter a number');
      }
      else {
        let addQuantity = quantity - Number(quantityLabel.innerHTML);
        addProductToCart(productId, addQuantity);
        document.querySelector('.js-cart-total-quantity').innerHTML = `${cartTotalQuantity()} items`;
        quantityLabel.innerHTML = quantity;
      }

      quantityLabel.classList.toggle('invisible');
      updateButton.classList.toggle('invisible');
      deleteButton.classList.toggle('invisible');
      saveButton.classList.toggle('invisible');
      quantityInput.classList.toggle('invisible');
      }
    });
  });
});