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
  const cartFooterEl = document.querySelector('.cart-footer');
  const cartTotalEl = document.querySelector('.cart-total');

  if (cartItems.length === 0) {
    emptyMessageEl.style.display = 'block'; 
    productListEl.innerHTML = ''; 
    cartFooterEl.classList.add('hide');
  } else {
    emptyMessageEl.style.display = 'none'; 
    const htmlItems = cartItems.map(item => cartItemTemplate(item));
    productListEl.innerHTML = htmlItems.join('');
    addRemoveItemListeners();
    const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0).toFixed(2);
   
    cartTotalEl.textContent = `Total: $${total}`;
    cartFooterEl.classList.remove('hide');
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

function updateCartCount() {
  const cartItems = getLocalStorage('so-cart');
  const countEl = document.querySelector('.cart-count');
  const count = Array.isArray(cartItems) ? cartItems.length : 0;

  if (count > 0) {
    countEl.textContent = count;
    countEl.classList.remove('hide');
  } else {
    countEl.classList.add('hide');
  }
}

renderCartContents();
updateCartCount();