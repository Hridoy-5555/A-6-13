
import { useState } from "react";
import Navbar from "./Navbar";
import productsData from "./products.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- UI Sections ---

const Banner = () => (
  <div className="hero bg-base-200 py-16 px-4 rounded-3xl my-8 mx-4 max-w-[1400px] lg:mx-auto">
    <div className="hero-content flex-col lg:flex-row-reverse gap-12">
      <img src="https://img.icons8.com/fluency/240/artificial-intelligence.png" className="max-w-xs md:max-w-sm drop-shadow-2xl" alt="AI Marketplace" />
      <div className="text-center lg:text-left">
        <h1 className="text-5xl md:text-6xl font-black leading-tight">Elevate Your Workflow <br/><span className="text-primary">With AI Power</span></h1>
        <p className="py-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
          Access a curated selection of premium digital tools designed for creators and developers. Supercharge your productivity today.
        </p>
        <div className="flex gap-4 justify-center lg:justify-start">
          <button className="btn btn-primary px-8">Explore Now</button>
          <button className="btn btn-outline px-8">Free Trial</button>
        </div>
      </div>
    </div>
  </div>
);

const Stats = () => (
  <div className="stats shadow w-full max-w-4xl mx-auto flex flex-col md:flex-row my-12 bg-white border border-gray-100">
    <div className="stat place-items-center">
      <div className="stat-title text-gray-500 font-medium">Happy Customers</div>
      <div className="stat-value text-primary">25K+</div>
      <div className="stat-desc">Growing daily</div>
    </div>
    <div className="stat place-items-center">
      <div className="stat-title text-gray-500 font-medium">Premium Tools</div>
      <div className="stat-value text-secondary">500+</div>
      <div className="stat-desc">Curated quality</div>
    </div>
    <div className="stat place-items-center">
      <div className="stat-title text-gray-500 font-medium">Global Support</div>
      <div className="stat-value">24/7</div>
      <div className="stat-desc">Instant help</div>
    </div>
  </div>
);

const Steps = () => (
  <div className="py-16 bg-slate-50 rounded-xl mx-4 mb-12 px-4 max-w-[1400px] lg:mx-auto">
    <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center p-6">
        <div className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-2xl text-xl font-bold mb-4 shadow-lg">1</div>
        <h3 className="font-bold text-xl mb-2">Find Your Tool</h3>
        <p className="text-gray-500">Browse our library of high-performance AI and productivity software.</p>
      </div>
      <div className="flex flex-col items-center text-center p-6">
        <div className="w-14 h-14 bg-secondary text-white flex items-center justify-center rounded-2xl text-xl font-bold mb-4 shadow-lg">2</div>
        <h3 className="font-bold text-xl mb-2">Build Your Cart</h3>
        <p className="text-gray-500">Select the licenses that fit your workflow and manage them in one place.</p>
      </div>
      <div className="flex flex-col items-center text-center p-6">
        <div className="w-14 h-14 bg-accent text-white flex items-center justify-center rounded-2xl text-xl font-bold mb-4 shadow-lg">3</div>
        <h3 className="font-bold text-xl mb-2">Get Started</h3>
        <p className="text-gray-500">Checkout securely and get instant access to your digital assets.</p>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="footer p-10 bg-neutral text-neutral-content rounded-t-3xl mt-auto flex flex-col md:flex-row justify-between">
    <aside>
      <h2 className="text-2xl font-bold text-white">DigiTools</h2>
      <p className="max-w-xs opacity-70 mt-2">Providing reliable digital tools since 2024. Empowering creators worldwide.</p>
    </aside> 
    <nav>
      <header className="footer-title">Marketplace</header> 
      <a className="link link-hover">Products</a>
      <a className="link link-hover">Pricing</a>
      <a className="link link-hover">New Arrivals</a>
    </nav> 
    <nav>
      <header className="footer-title">Company</header> 
      <a className="link link-hover">About us</a>
      <a className="link link-hover">Contact</a>
    </nav>
  </footer>
);

// --- Main Components ---

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleAdd = (product) => {
    if (cart.find(item => item.id === product.id)) {
      toast.warning("This item is already in your cart.");
    } else {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.info("Item removed from cart.");
  };

  const checkout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
    } else {
      setCart([]);
      toast.success("Checkout successful! Welcome aboard.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-primary/20">
      <Navbar cart={cart} />
      
      <Banner />
      <Stats />

      <div className="flex justify-center join my-16">
        <button 
          onClick={() => setShowCart(false)} 
          className={`btn join-item w-32 md:w-48 ${!showCart ? 'btn-primary' : 'btn-outline'}`}
        >
          Products
        </button>
        <button 
          onClick={() => setShowCart(true)} 
          className={`btn join-item w-32 md:w-48 ${showCart ? 'btn-primary' : 'btn-outline'}`}
        >
          Cart ({cart.length})
        </button>
      </div>

      <main className="container mx-auto px-4 flex-grow mb-20">
        {showCart ? (
          <Cart cart={cart} removeItem={removeItem} checkout={checkout} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsData.map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                handleAdd={handleAdd} 
                isInCart={cart.some(item => item.id === p.id)} 
              />
            ))}
          </div>
        )}
      </main>

      <Steps />
      <Footer />

      <ToastContainer position="bottom-right" theme="colored" autoClose={2500} />
    </div>
  );
}

function ProductCard({ product, handleAdd, isInCart }) {
  return (
    <div className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <figure className="px-10 pt-10">
        <div className="p-4 bg-gray-50 rounded-2xl">
          <img src={product.icon} alt={product.name} className="w-16 h-16" />
        </div>
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-start mb-2">
          <h2 className="card-title font-bold text-gray-800">{product.name}</h2>
          <span className={`badge badge-sm uppercase font-bold py-3 ${
            product.tagType === 'new' ? 'badge-secondary' : 
            product.tagType === 'best seller' ? 'badge-accent' : 'badge-ghost'
          }`}>
            {product.tag}
          </span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>
        
        <div className="mb-4">
          <p className="text-3xl font-black text-primary">${product.price}</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.period}</p>
        </div>

        <div className="divider my-0"></div>
        
        <ul className="text-sm space-y-2 my-4">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-600">
              <span className="text-success font-bold text-lg">✓</span> {f}
            </li>
          ))}
        </ul>
        
        <div className="card-actions mt-auto">
          <button 
            onClick={() => handleAdd(product)} 
            disabled={isInCart}
            className={`btn btn-block ${isInCart ? 'btn-disabled' : 'btn-primary shadow-lg shadow-primary/20'}`}
          >
            {isInCart ? "Added to Cart" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Cart({ cart, removeItem, checkout }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white shadow-2xl rounded-3xl border border-gray-100">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-black tracking-tight">Your Cart</h2>
        <div className="badge badge-lg badge-primary py-4 px-6 font-bold">{cart.length} Products</div>
      </div>
      
      {cart.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <span className="text-6xl block mb-4 opacity-30">🛒</span>
          <p className="text-gray-400 text-xl font-medium">Your digital cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-2xl hover:bg-gray-50 transition-colors group">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <img src={item.icon} alt={item.name} className="w-12 h-12" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-primary font-bold">${item.price}</p>
                </div>
                <button 
                  onClick={() => removeItem(item.id)} 
                  className="btn btn-circle btn-ghost btn-sm text-error hover:bg-error/10"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-100">
            <div className="flex justify-between items-center text-3xl font-black px-2">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={checkout} 
              className="btn btn-primary btn-block btn-lg mt-10 h-16 text-lg font-bold shadow-xl shadow-primary/30"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
