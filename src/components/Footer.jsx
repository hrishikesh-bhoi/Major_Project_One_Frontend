
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-light pt-5 pb-3 mt-5">
            <div className="container">
                <div className="row">

                    {/* About Bookstore */}
                    <div className="col-md-4 mb-4">
                        <h4 className="fw-bold">BookStore</h4>
                        <p className="text-secondary">
                            Discover your next favourite book.
                            Explore a wide collection of books
                            and enjoy reading!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-secondary text-decoration-none">
                                    Home
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/books" className="text-secondary text-decoration-none">
                                    Books
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/wishlist" className="text-secondary text-decoration-none">
                                    Wishlist
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/cart" className="text-secondary text-decoration-none">
                                    Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">Contact Us</h5>
                        <p className="text-secondary mb-2">
                            Email: support@bookstore.com
                        </p>
                        <p className="text-secondary mb-2">
                            Phone: +91 9876543210
                        </p>
                    </div>

                </div>

                <hr className="border-secondary" />

                <div className="text-center text-secondary">
                    <p className="mb-0">
                        © {new Date().getFullYear()} BookStore.
                        All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
