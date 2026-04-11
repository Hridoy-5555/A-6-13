// =======================
// 📁 main.jsx
// =======================
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// =======================
// 📁 App.jsx
// =======================
import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import products from "./data/products.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleAdd = (product) => {
    setCart([...cart, product]);
    toast.success("Added to cart");
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.error("Removed from cart");
  };

  const checkout = () => {
    setCart([]);
    toast.info("Checkout complete");
  };

  return (
    <div>
      <Navbar cart={cart} />

      <div className="flex justify-center gap-4 my-4">
        <button onClick={() => setShowCart(false)} className="btn">Products</button>
        <button onClick={() => setShowCart(true)} className="btn">Cart</button>
      </div>

      {showCart ? (
        <Cart cart={cart} removeItem={removeItem} checkout={checkout} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} handleAdd={handleAdd} />
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

// =======================
// 📁 components/Navbar.jsx
// =======================
export default function Navbar({ cart }) {
  return (
    <div className="flex justify-between p-4 bg-black text-white">
      <h1>Digital Tools</h1>
      <p>🛒 {cart.length}</p>
    </div>
  );
}

// =======================
// 📁 components/ProductCard.jsx
// =======================
export default function ProductCard({ product, handleAdd }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price} / {product.period}</p>
      <ul>
        {product.features.map((f, i) => (
          <li key={i}>✔ {f}</li>
        ))}
      </ul>
      <button onClick={() => handleAdd(product)} className="bg-blue-500 text-white px-3 py-1 mt-2">
        Buy Now
      </button>
    </div>
  );
}

// =======================
// 📁 components/Cart.jsx
// =======================
export default function Cart({ cart, removeItem, checkout }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl">Cart</h2>
      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between border-b py-2">
          <span>{item.name}</span>
          <span>${item.price}</span>
          <button onClick={() => removeItem(item.id)}>❌</button>
        </div>
      ))}

      <p className="mt-4">Total: ${total}</p>

      <button onClick={checkout} className="bg-green-500 text-white px-3 py-2 mt-2">
        Checkout
      </button>
    </div>
  );
}

// =======================
// 📁 data/products.json
// =======================
[
  {
    "id": 1,
    "name": "Resume Builder",
    "description": "Create resumes easily",
    "price": 10,
    "period": "monthly",
    "tagType": "Popular",
    "features": ["Templates", "PDF Export"],
    "icon": "📄"
  },
  {
    "id": 2,
    "name": "AI Writer",
    "description": "Write content fast",
    "price": 15,
    "period": "monthly",
    "tagType": "Best",
    "features": ["AI Generate", "SEO Tools"],
    "icon": "✍️"
  },
  {
    "id": 3,
    "name": "Code Helper",
    "description": "Helps coding",
    "price": 20,
    "period": "monthly",
    "tagType": "New",
    "features": ["Auto Code", "Debug"],
    "icon": "💻"
  }
]

// =======================
// 📁 index.css
// =======================
@tailwind base;
@tailwind components;
@tailwind utilities;
