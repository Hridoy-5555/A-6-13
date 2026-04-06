let products = [];
let cart = [];


fetch('./products.json')
    .then(res => res.json())
    .then(data => {
        products = data;
        renderProducts();
    });

function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(product => `
        <div class="card h-full bg-base-100 shadow-xl border border-gray-100 hover:scale-105 hover:shadow-[0_0_25px_rgba(126,34,206,0.4)] hover:border-primary transition-all duration-300">
            <figure class="px-10 pt-10">
                <img src="${product.icon}" alt="${product.name}" class="rounded-xl w-16" />
            </figure>
            <div class="card-body flex flex-col h-full">
                <div class="flex justify-between items-start">
                    <h2 class="card-title text-xl">${product.name}</h2>
                    <div class="badge ${
                        product.tagType === 'new' ? 'badge-secondary' : 
                        product.tagType === 'best seller' ? 'badge-accent' : 
                        'badge-primary'
                    } badge-outline uppercase text-[10px] font-bold">${product.tag}</div>
                </div>
                <p class="text-sm text-gray-500">${product.description}</p>
                <div class="divider my-1"></div>
                <ul class="text-xs space-y-2 text-gray-600">
                    ${product.features.map(f => `<li class="flex items-center gap-2">✅ ${f}</li>`).join('')}
                </ul>
                <div class="mt-4">
                    <span class="text-2xl font-bold">$${product.price}</span>
                    <span class="text-gray-400 text-sm"> / ${product.period}</span>
                </div>
                <div class="card-actions mt-auto pt-4">
                    ${cart.some(item => item.id === product.id) 
                        ? `<button class="btn btn-disabled w-full bg-gray-200">Added to Cart</button>` 
                        : `<button id="buy-btn-${product.id}" class="btn btn-primary w-full text-white" onclick="addToCart(${product.id})">
                            Buy Now
                           </button>`
                    }
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (cart.find(item => item.id === id)) {
        showToast("Item already in cart!", "linear-gradient(to right, #4c1d95, #6b21a8)");
        return;
    }
    cart.push(product);
    updateUI();
    showToast(`${product.name} added to cart!`, "linear-gradient(to right, #7e22ce, #c026d3)");
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateUI();
    showToast("Item removed from cart.", "linear-gradient(to right, #a855f7, #d946ef)");
}

function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    renderProducts();
    renderCart();
}

function renderCart() {
    const itemsContainer = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('cart-empty-msg');
    const footer = document.getElementById('cart-footer');
    
    if (cart.length === 0) {
        itemsContainer.innerHTML = '';
        emptyMsg.classList.remove('hidden');
        footer.classList.add('hidden');
    } else {
        emptyMsg.classList.add('hidden');
        footer.classList.remove('hidden');
        itemsContainer.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div class="flex items-center gap-4">
                    <img src="${item.icon}" alt="" class="w-10" />
                    <div>
                        <h3 class="font-semibold">${item.name}</h3>
                        <p class="text-xs text-gray-500">$${item.price}</p>
                    </div>
                </div>
                <button class="btn btn-sm btn-circle btn-outline btn-error" onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        document.getElementById('cart-total').innerText = `$${total}`;
    }
}

function switchView(view) {
    const pCont = document.getElementById('products-container');
    const cCont = document.getElementById('cart-container');
    const pBtn = document.getElementById('btn-view-products');
    const cBtn = document.getElementById('btn-view-cart');

    if (view === 'products') {
        pCont.classList.remove('hidden');
        cCont.classList.add('hidden');
        pBtn.classList.add('btn-primary'); pBtn.classList.remove('btn-outline');
        cBtn.classList.add('btn-outline'); cBtn.classList.remove('btn-primary');
    } else {
        pCont.classList.add('hidden');
        cCont.classList.remove('hidden');
        cBtn.classList.add('btn-primary'); cBtn.classList.remove('btn-outline');
        pBtn.classList.add('btn-outline'); pBtn.classList.remove('btn-primary');
        renderCart();
    }
}

function checkout() {
    cart = [];
    updateUI();
    showToast("Order placed successfully! Cart cleared.", "linear-gradient(to right, #7e22ce, #c026d3)");
    switchView('products');
}

function showToast(text, background) {
    Toastify({ text, duration: 2000, style: { background } }).showToast();
}