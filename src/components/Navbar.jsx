import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../contexts/CartContext";
export default function Navbar() {

    const { cart, wishlist } = useContext(CartContext);

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
                
            </ul>
                </div>
            </div>
            </nav>
    </>

    )
}