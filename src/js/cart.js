import { getLocalStorage, setLocalStorage } from './utils.mjs';

function removeFromCart(productId) {
  const rawCart = getLocalStorage('so-cart');
  const cartItems = Array.isArray(rawCart) ? rawCart : [];

  const updatedCart = cartItems.filter(item => item.Id !== productId);
  setLocalStorage('so-cart', updatedCart);
  renderCartContents();
}

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
    addRemoveItemListeners();
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
  <span class="remove-item" data-id="${item.Id}">✖</span>
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

function addRemoveItemListeners() {
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const idToRemove = e.target.dataset.id;
      removeFromCart(idToRemove);
    });
  });
}


renderCartContents();