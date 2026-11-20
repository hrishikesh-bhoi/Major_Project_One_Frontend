import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import CartContext from "../contexts/CartContext";
export default function Navbar() {

    const { cart, wishlist } = useContext(CartContext);
    const [searchTerm, setSearchTerm] = useState(() => {
    return new URLSearchParams(window.location.search).get("search") || "";
});
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if(!searchTerm.trim()) {
            toast.warning("Please enter a book name to search.");
            return
        }

        navigate(`/books?search=${encodeURIComponent(searchTerm)}`);
    };

    return ( <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <Link className="navbar-brand" to="/">
                Bookstore
            </Link>
            <button
  className="navbar-toggler"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarMenu"
  aria-controls="navbarMenu"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span className="navbar-toggler-icon"></span>
</button>
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <form className="d-flex mx-lg-4 my-2 my-lg-0" onSubmit={handleSearch}>
                        <input type="text"
                        className="form-control"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                        <button type="submit" className="btn btn-primary ms-2">Search</button>
                    </form>
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                </li>
               
                <li className="nav-item">
                    <Link className="nav-link" to="/books">
                        Books
                    </Link>
                </li>
                 <li className="nav-item">
                    <Link className="nav-link" to="/wishlist">
                        Wishlist {wishlist.length > 0 && (
                            <span className="badge bg-success">{wishlist.length}</span>
                        )}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                        Cart {cart.length > 0 && (
                            <span className="badge bg-primary">{cart.length}</span>
                        )}
                    </Link>
                </li>
                <li className="nav-item">
    <Link className="nav-link" to="/profile">
        Profile
    </Link>
</li>
                
            </ul>
                </div>
            </div>
            </nav>
    </>

    )
}