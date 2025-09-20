import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
const NavBar = () => {
  const navLinks = [
    { label: "Home", url: "/" },
    { label: "Stores", url: "/stores" },
    { label: "My store", url: "/mystore" },
    { label: "Products", url: "/products" },
    { label: "My Orders", url: "/myorders" },
  ];

  const { user, logOut } = useUserStore();
  return (
    <header className=" top-0 left-0 right-0 h-15 z-50 backdrop-blur border-b border-gray-300 bg-gray-800 px-4 md:px-8 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <img src="../public/vite.svg" alt="" />
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-4">
            {navLinks.map((el) => (
              <Link
                to={el.url}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition"
              >
                {el.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <button
                onClick={() => {
                  logOut();
                }}
                className="text-sm px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Log out
              </button>
              <img
                width={32}
                className="ml-0"
                src="../public/user.png"
                alt=""
              />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition"
              >
                Log In
              </Link>
              <Link
                to="#"
                className="text-sm px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
