const filterBtns = document.querySelectorAll('.filter-btn');
const categories = document.querySelectorAll('.category');
const cartItems = document.getElementById('cart-items');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
const quantities = document.querySelectorAll('.item-quantity');
let cart = JSON.parse(localStorage.getItem('cart')) || {};

//Event Listeners
filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-category');
    categories.forEach(cat => {
      if (category === 'all') {
        cat.style.display = 'block';
      } else if (cat.classList.contains(category)) {
        cat.style.display = 'block';
      } else {
        cat.style.display = 'none';
      }
    });
  });
});

addToCartButtons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    const menuItem = btn.parentElement;
    const itemName = menuItem.querySelector('h4').innerText;
    const qtyInput = menuItem.querySelector('.item-quantity');
    const qty = parseInt(qtyInput.value);

    if(qty < 1 || isNaN(qty)) {
      alert('Please enter a valid quantity');
      return;
    }
    
    if(cart[itemName]) {
      cart[itemName].quantity += qty;
    } else {
      cart[itemName] = {quantity: qty};
    }
    renderCart();
  });
});

removeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const menuItem = btn.parentElement;
    const itemName = menuItem.querySelector('h4').innerText;

    if (cart[itemName]) {
      delete cart[itemName];
      renderCart();
    }
  });
});

function updateButtonsState() {
  addToCartButtons.forEach(btn => {
    const menuItem = btn.parentElement;
    const itemName = menuItem.querySelector('h4').innerText;
    const removeBtn = menuItem.querySelector('.remove-from-cart-btn');
    if(cart[itemName]) {
      removeBtn.style.display = 'inline-block';
    } else {
      removeBtn.style.display = 'none';
    }
  });
}

function renderCart() {
  cartItems.innerHTML = '';
  if(Object.keys(cart).length === 0){
    cartItems.innerHTML = '<li>No items in cart</li>';
  } else {
    for (let item in cart) {
      const li = document.createElement('li');
      li.textContent = `${item} x ${cart[item].quantity}`;
      cartItems.appendChild(li);
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateButtonsState();
}

renderCart();