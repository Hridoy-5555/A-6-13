import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Reusable Product Card Component
const ProductCard = ({ product, isInCart, onAddToCart }) => (
  <div className="card h-full bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
    <figure className="px-10 pt-10">
      <img src={product.icon} alt={product.name} className="w-16 h-16 object-contain" />
    </figure>
    <div className="card-body flex flex-col h-full">
      <div className="flex justify-between items-start">
        <h2 className="card-title text-xl">{product.name}</h2>
        <div className={`badge ${
          product.tagType === 'new' ? 'badge-secondary' : 
          product.tagType === 'best seller' ? 'badge-accent' : 
          'badge-primary'
        } badge-outline uppercase text-[10px] font-bold`}>
          {product.tag}
        </div>
      </div>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="divider my-1"></div>
      <ul className="text-xs space-y-2 text-gray-600">
        {product.features?.map((f, i) => (
          <li key={i} className="flex items-center gap-2">✅ {f}</li>
        ))}
      </ul>
      <div className="mt-4">
        <span className="text-2xl font-bold">${product.price}</span>
        <span className="text-gray-400 text-sm"> / {product.period}</span>
      </div>
      <div className="card-actions mt-auto pt-4">
        {isInCart ? (
          <button className="btn btn-disabled w-full bg-gray-100 text-gray-400">
            ✓ Added to Cart
          </button>
        ) : (
          <button 
            className="btn btn-primary w-full text-white" 
            onClick={() => onAddToCart(product)}
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  </div>
);

// Sub-component for items within the cart
const CartItem = ({ item, onRemove }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
    <div className="flex items-center gap-4">
      <img src={item.icon} alt="" className="w-10 h-10" />
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">${Number(item.price).toFixed(2)}</p>
      </div>
    </div>
    <div className="tooltip tooltip-left" data-tip="Remove item">
      <button 
        className="btn btn-sm btn-circle btn-outline btn-error" 
        onClick={() => onRemove(item.id)}
      >
        ✕
      </button>
    </div>
  </div>
);

// Section: Stats
const StatsSection = () => (
  <section className="my-12 mx-4 lg:mx-52">
    <div className="stats shadow w-full bg-primary text-primary-content">
      <div className="stat place-items-center">
        <div className="stat-title text-blue-100">Downloads</div>
        <div className="stat-value">31K</div>
        <div className="stat-desc text-blue-100">Jan 1st - Oct 1st</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title text-blue-100">Active Users</div>
        <div className="stat-value text-secondary">4,200</div>
        <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title text-blue-100">New Registers</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc text-blue-100">↘︎ 90 (14%)</div>
      </div>
    </div>
  </section>
);

// Section: How It Works (Steps)
const HowItWorks = () => (
  <section className="bg-white py-20 mx-4 lg:mx-52 rounded-3xl">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-12">How It Works</h2>
      <ul className="steps steps-vertical lg:steps-horizontal w-full">
        <li className="step step-primary font-medium">Browse Tools</li>
        <li className="step step-primary font-medium">Add to Selection</li>
        <li className="step font-medium">Secure Checkout</li>
        <li className="step font-medium">Instant Access</li>
      </ul>
    </div>
  </section>
);

// Section: Pricing
const PriceCard = ({ title, price, features, isPopular }) => (
  <div className={`p-8 border ${isPopular ? 'border-primary border-2 relative' : 'border-gray-200'} rounded-2xl flex flex-col items-center bg-white shadow-sm`}>
    {isPopular && <div className="badge badge-primary absolute -top-3">Most Popular</div>}
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-4xl font-bold my-4">${price}<span className="text-lg font-normal text-gray-400">/mo</span></p>
    <ul className="space-y-3 mb-8 text-gray-600 flex-grow text-center">
      {features.map((f, i) => <li key={i}>{f}</li>)}
    </ul>
    <button className={`btn ${isPopular ? 'btn-primary' : 'btn-outline'} btn-block`}>
      {price === 0 ? 'Get Started' : 'Subscribe Now'}
    </button>
  </div>
);

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('products'); 
  
  useEffect(() => {
    fetch('./products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        toast.error("Failed to load products. Ensure you are using a local server.");
        console.error(err);
      });
  }, []);

  const handleAddToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      toast.warning("Item already in cart!");
    } else {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    toast.info("Item removed from cart.");
  };

  const handleCheckout = () => {
    setCart([]);
    setView('products');
    toast.success("Order placed successfully! Cart cleared.");
  };

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <nav className="navbar bg-base-100 shadow-md sticky top-4 z-50 rounded-xl mx-4 lg:mx-52 w-auto">
        <div className="flex-1">
          <button onClick={() => setView('products')} className="text-2xl font-bold text-primary">DigiTools</button>
        </div>
        <div className="flex-none gap-4">
          <ul className="menu menu-horizontal px-1 hidden lg:flex">
            <li><button onClick={() => setView('products')}>Products</button></li>
            <li><a>Features</a></li>
            <li><a>Pricing</a></li>
          </ul>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={() => setView('cart')}>
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item bg-secondary text-white">{cart.length}</span>
              </div>
            </div>
          </div>
          <button className="btn btn-primary hidden md:flex">Get Started</button>
        </div>
      </nav>

      <header className="hero bg-base-200 py-16 mx-4 lg:mx-52 w-auto rounded-3xl mt-8">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="assets/banner.png" className="max-w-sm rounded-lg shadow-2xl" alt="Banner" />
          <div>
            <span className="badge badge-primary gap-2 p-4">New: AI-Powered Tools Available</span>
            <h1 className="text-5xl font-bold mt-2">Supercharge Your Digital Workflow</h1>
            <p className="py-6 text-gray-600">Access premium AI tools, design assets, and productivity software—all in one place. Start creating faster today.</p>
            <div className="flex gap-4">
              <button className="btn btn-primary" onClick={() => setView('products')}>Explore Products</button>
              <button className="btn btn-ghost border-gray-300">Watch Demo</button>
            </div>
          </div>
        </div>
      </header>

      <StatsSection />

      <main className="py-12 mx-4 lg:mx-52 min-h-[400px]">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Our Digital Toolbox</h2>
          <p className="text-gray-500">Choose the best tools for your next big project.</p>
        </div>
        
        <div className="flex justify-center gap-4 mb-10">
          <button 
            className={`btn btn-wide rounded-full ${view === 'products' ? 'btn-primary' : 'btn-outline'}`} 
            onClick={() => setView('products')}
          >
            Products
          </button>
          <button 
            className={`btn btn-wide rounded-full ${view === 'cart' ? 'btn-primary' : 'btn-outline'}`} 
            onClick={() => setView('cart')}
          >
            Cart ({cart.length})
          </button>
        </div>

        {view === 'products' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                isInCart={cart.some(item => item.id === product.id)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">
            <h2 className="text-3xl font-bold mb-6">Your Selected Products</h2>
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg mb-4">Your cart is empty.</p>
                <button className="btn btn-ghost text-primary" onClick={() => setView('products')}>Go Back to Products</button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    onRemove={handleRemoveFromCart} 
                  />
                ))}
                <div className="divider"></div>
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
                <button className="btn btn-success w-full mt-6 text-white text-lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <HowItWorks />

      <section className="py-20 mx-4 lg:mx-52">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PriceCard 
            title="Starter" price={0} 
            features={["Single User", "Standard Tools", "Community Support"]} 
          />
          <PriceCard 
            title="Professional" price={49} isPopular 
            features={["Up to 5 Users", "Premium AI Tools", "Priority Support"]} 
          />
          <PriceCard 
            title="Enterprise" price={99} 
            features={["Unlimited Users", "Custom Workflows", "Dedicated Manager"]} 
          />
        </div>
      </section>

      <footer className="bg-neutral text-neutral-content mt-20 w-full">
        <div className="mx-4 lg:mx-52">
          <div className="footer py-10 px-0">
            <aside>
              <h2 className="text-2xl font-bold text-primary">DigiTools</h2>
              <p className="max-w-xs opacity-80">
                Premium digital tools for creators, professionals, and businesses. Work smarter with our suite of powerful tools.
              </p>
            </aside> 
            <nav>
              <h6 className="footer-title">Product</h6> 
              <a className="link link-hover">Features</a>
              <a className="link link-hover">Pricing</a>
              <a className="link link-hover">Marketplace</a>
            </nav> 
            <nav>
              <h6 className="footer-title">Company</h6> 
              <a className="link link-hover">About Us</a>
              <a className="link link-hover">Careers</a>
              <a className="link link-hover">Contact</a>
            </nav> 
            <nav>
              <h6 className="footer-title">Resources</h6> 
              <a className="link link-hover">Documentation</a>
              <a className="link link-hover">Help Center</a>
              <a className="link link-hover">Community</a>
            </nav>
          </div>
        </div>
        <div className="footer footer-center py-6 border-t border-gray-700">
          <aside>
            <p>DigiTools © 2026. All rights reserved.</p>
          </aside>
          <nav>
            <div className="grid grid-flow-col gap-4">
              <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current hover:text-primary transition-colors cursor-pointer"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
              <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current hover:text-primary transition-colors cursor-pointer"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
              <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current hover:text-primary transition-colors cursor-pointer"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
            </div>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default App;