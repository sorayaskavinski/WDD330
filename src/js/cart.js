import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const rawCart = getLocalStorage('so-cart');
  const cartItems = Array.isArray(rawCart) ? rawCart : [];

  const emptyMessageEl = document.querySelector('.empty-cart-message');
  const productListEl = document.querySelector('.product-list');

  if (cartItems.length === 0) {
    emptyMessageEl.style.display = 'block'; 
    productListEl.innerHTML = ''; 
  } else {
    emptyMessageEl.style.display = 'none'; 
    const htmlItems = cartItems.map(item => cartItemTemplate(item));
    productListEl.innerHTML = htmlItems.join('');
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();