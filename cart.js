/* ==========================================================================
   CARRITO LATERAL DESLIZANTE (CART DRAWER) — KARITO FEST
   Compartido entre flores.html y ocasiones.html con persistencia en localStorage
   ========================================================================== */
(function () {
  const STORAGE_KEY = 'karitoFestCart';

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
  }

  function injectDrawerMarkup() {
    if (document.getElementById('cartDrawer')) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="cart-backdrop" id="cartBackdrop"></div>
      <aside class="cart-drawer" id="cartDrawer" aria-label="Carrito de compras" aria-hidden="true">
        <div class="cart-drawer-header">
          <div class="cart-drawer-title-wrap">
            <h3>Tu Carrito</h3>
            <span class="cart-drawer-count" id="drawerItemCount">0 productos</span>
          </div>
          <button type="button" class="cart-close-btn" id="cartCloseBtn" aria-label="Cerrar carrito">✕</button>
        </div>

        <div class="cart-drawer-body" id="cartDrawerBody"></div>

        <div class="cart-drawer-footer" id="cartDrawerFooter">
          <div class="cart-subtotal-row">
            <span>Subtotal</span>
            <strong id="cartSubtotalAmount">S/ 0.00</strong>
          </div>
          <p class="cart-shipping-note">Envío gratuito en pedidos desde S/ 180.00</p>
          <button type="button" class="cart-checkout-btn" id="cartCheckoutBtn">Finalizar pedido</button>
          <button type="button" class="cart-continue-btn" id="cartContinueBtn">Seguir comprando</button>
        </div>
      </aside>
    `;
    document.body.appendChild(wrapper);
  }

  function formatMoney(amount) {
    return 'S/ ' + Number(amount).toFixed(2);
  }

  function parsePrice(priceText) {
    const num = parseFloat(String(priceText).replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  }

  function updateBadges(cart) {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-badge').forEach((badge) => {
      badge.textContent = totalQty;
    });
    const drawerCount = document.getElementById('drawerItemCount');
    if (drawerCount) {
      drawerCount.textContent = totalQty === 1 ? '1 producto' : totalQty + ' productos';
    }
  }

  function renderCart() {
    const cart = loadCart();
    updateBadges(cart);

    const body = document.getElementById('cartDrawerBody');
    const footer = document.getElementById('cartDrawerFooter');
    const subtotalEl = document.getElementById('cartSubtotalAmount');
    if (!body || !footer) return;

    if (cart.length === 0) {
      body.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">🌸</div>
          <h4>Tu carrito está vacío</h4>
          <p>Elige un ramo o arreglo floral para sorprender hoy.</p>
          <button type="button" class="btn-pink-primary" onclick="karitoCart.close()">Explorar ramos</button>
        </div>
      `;
      footer.style.display = 'none';
      return;
    }

    footer.style.display = 'block';
    let subtotal = 0;

    body.innerHTML = cart
      .map((item, idx) => {
        subtotal += item.price * item.qty;
        return `
          <div class="cart-item">
            <div class="cart-item-thumb">
              <img src="${item.img}" alt="${item.title}" onerror="this.style.display='none';">
              <span class="cart-thumb-fallback">🌷</span>
            </div>
            <div class="cart-item-info">
              <div class="cart-item-top">
                <h4>${item.title}</h4>
                <button type="button" class="cart-remove-btn" onclick="karitoCart.remove(${idx})" aria-label="Eliminar producto">✕</button>
              </div>
              <div class="cart-item-price">${formatMoney(item.price)}</div>
              <div class="cart-item-controls">
                <div class="occ-qty-row">
                  <button type="button" class="occ-qty-btn" onclick="karitoCart.updateQty(${idx}, -1)" aria-label="Disminuir">−</button>
                  <span class="occ-qty-val">${item.qty}</span>
                  <button type="button" class="occ-qty-btn" onclick="karitoCart.updateQty(${idx}, 1)" aria-label="Aumentar">+</button>
                </div>
                <strong class="cart-item-total">${formatMoney(item.price * item.qty)}</strong>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    subtotalEl.textContent = formatMoney(subtotal);
  }

  function openCart() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    if (!drawer || !backdrop) return;
    renderCart();
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    if (!drawer || !backdrop) return;
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function addItem(newItem) {
    const cart = loadCart();
    const qtyToAdd = newItem.qty || 1;
    const existing = cart.find((i) => i.title === newItem.title);
    if (existing) {
      existing.qty += qtyToAdd;
    } else {
      cart.push({
        title: newItem.title,
        price: Number(newItem.price) || 0,
        img: newItem.img || '',
        qty: qtyToAdd
      });
    }
    saveCart(cart);
    openCart();
  }

  function updateQty(index, delta) {
    const cart = loadCart();
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
    renderCart();
  }

  function removeItem(index) {
    const cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }

  function bindEvents() {
    // Abrir al hacer clic en el botón Carrito del header
    document.querySelectorAll('a[href="#carrito"]').forEach((trigger) => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openCart();
      });
    });

    // Botones de añadir al carrito en flores.html ("Ramos populares")
    document.querySelectorAll('.btn-add-cart').forEach((btn) => {
      btn.addEventListener('click', function () {
        const card = btn.closest('.fl-product-card');
        if (!card) return;
        const title = card.querySelector('.fl-product-title')?.textContent.trim() || 'Ramo';
        const priceText = card.querySelector('.fl-product-price')?.textContent || '0';
        const img = card.querySelector('.slot-img')?.getAttribute('src') || '';
        addItem({
          title: title,
          price: parsePrice(priceText),
          img: img,
          qty: 1
        });
      });
    });

    document.getElementById('cartCloseBtn')?.addEventListener('click', closeCart);
    document.getElementById('cartContinueBtn')?.addEventListener('click', closeCart);
    document.getElementById('cartBackdrop')?.addEventListener('click', closeCart);

    document.getElementById('cartCheckoutBtn')?.addEventListener('click', function () {
      const cart = loadCart();
      if (cart.length === 0) return;
      const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
      alert('¡Gracias por tu pedido en Karito Fest!\nTotal a pagar: ' + formatMoney(total));
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCart();
    });
  }

  window.karitoCart = {
    add: addItem,
    open: openCart,
    close: closeCart,
    updateQty: updateQty,
    remove: removeItem
  };

  document.addEventListener('DOMContentLoaded', function () {
    injectDrawerMarkup();
    renderCart();
    bindEvents();
  });
})();
