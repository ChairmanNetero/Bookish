import { NavLink } from "react-router-dom";

const navItems = [
    { name: "Home", path: "/" },
    { name: "My Books", path: "/my-books" },
    { name: "Browse", path: "/browse" },
    { name: "Profile", path: "/profile" },
    { name: "About", path: "/about" }
];

const Navbar = () => {
    return (
        <nav className="bg-gray-50 shadow-md px-6 py-3 flex items-center justify-between">
            <div className="text-xl font-bold text-blue-600 flex-shrink-0">📚 Bookish</div>

            <div className="flex-1 flex justify-center items-center gap-10">
                <ul className="flex gap-6">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                                        : "text-gray-700 hover:text-blue-500"
                                }
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Search books..."
                    className="w-full max-w-md px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="ml-6">
                <NavLink
                    to="/Login"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition"
                >
                    Login
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
