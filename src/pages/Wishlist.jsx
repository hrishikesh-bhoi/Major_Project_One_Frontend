import Navbar from "../components/Navbar";
import React, { useContext } from "react";
import CartContext from "../contexts/CartContext";

export default function Wishlist() {

    const { wishlist, removeFromWishlist, addToCart } = useContext(CartContext);

    return (
        <>
        <Navbar />
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="fw-bold">My Wishlist</h2>
                    <p className="text-muted mb-0">Your favourite books, all in one place.</p>
                </div>
                <span className="badge bg-danger fs-6">
                    {wishlist.length} Items
                </span>

            </div>
            {
                wishlist.length === 0 ? (
                    <p className="text-center text-muted">Your wishlist is empty.</p>
                ) : (
                    <div className="row">
                        {
                            wishlist.map((book, index) => (
                                <div className="col-md-3 mb-4" key={book.id}>
                                    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                                        <div className="text-center bg-light p-3">
                                            <img src={book.image} alt={book.title} className="img-fluid" style={{height:"220px", width:"100%", objectFit:"contain"}}/>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title fw-bold">{book.title}</h5>
                                            <p className="text-muted mb-2">By {book.author}</p>
                                            <h5 className="text-primary fw-bold mb-3">₹{book.price}</h5>
                                            <div className="d-grid gap-2">
                                            <button className="btn btn-primary mt-2" onClick={() => {addToCart(book); removeFromWishlist(index);}}>Move to Cart</button>
                                                
                                            <button className="btn btn-danger" onClick={() => removeFromWishlist(index)}>
                                                Remove from Wishlist
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            ))
                            
                        }
                        </div>
)}
        </div>
        </>
    )
}