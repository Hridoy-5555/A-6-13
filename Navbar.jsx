export default function Navbar({ cart }) {
  return (
    <div className="navbar bg-base-100 shadow-lg px-4 md:px-8 sticky top-0 z-50">
      <div className="flex-1">
        <a className="text-2xl font-extrabold text-primary tracking-tight">DigiTools</a>
      </div>
      <div className="flex-none">
        <div className="flex items-center gap-2 font-medium bg-primary/10 px-4 py-2 rounded-full text-primary">
          <span className="text-xl">🛒</span>
          <span className="font-bold">{cart.length}</span>
        </div>
      </div>
    </div>
  );
}