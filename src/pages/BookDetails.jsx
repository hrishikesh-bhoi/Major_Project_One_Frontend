import React, { useState, useContext } from "react";

import CartContext from "../contexts/CartContext";
import { useParams, Link, useLocation } from "react-router-dom";
import useFetch from "../useFetch";


export default function BookDetails() {
  const location = useLocation();

    const [ message, setMessage] = useState("");
    const [ quantity, setQuantity ] = useState(1)

    const { bookId } = useParams();

    const { data, loading, error } = useFetch(`https://major-project-one-backend-omega.vercel.app/api/books/slug/${bookId}`);
    
    
    const { addToCart, addToWishlist } = useContext(CartContext);
   
const selectedBook = data?.book;

if (loading) {
  return <p className="text-center mt-5">Loading book details...</p>
}

if (error) {
  return <p className="text-center text-danger mt-5">{error}</p>
}

    return (
        <>
        
        <div className="container my-5">
            <div className="card border-0 shadow-lg p-3 p-md-4 rounded-4">
                {
                    selectedBook ? (
                        <>
                        <div className="row align-items-center g-4">
                        <div className="col-md-4 text-center">
                            <div className="bg-light rounded-4 p-3">
                        <img src={selectedBook.image} alt={selectedBook.title} className="img-fluid rounded" style={{height: "300px", width: "100%", objectFit: "contain", backgroundColor:"#f8f9fa"}}/>
                                

                            </div>
                        </div>
                        <div className="col-md-8">
                        <h2 className="fw-bold mb-3">{selectedBook.title}</h2>
                        <p className="text-muted fs-5">By {selectedBook.author}</p>
                        <h3 className="text-primary fw-bold my-4">₹{selectedBook.price}</h3>
                        <div className="mb-2">
                                    <span className="text-warning">
                                            {"★".repeat(Math.round(selectedBook.rating))}
                                            </span>
                                            <span className="text-muted">
                                                    {"☆".repeat(5 - Math.round(selectedBook.rating))}
                                                    </span>
                                                    <small className="text-muted ms-2">
                                                            {selectedBook.rating}/5
                                                            </small>
                                                            </div>
                        <hr />
                        <h5 className="fw-bold">About this book</h5>
                        <p className="text-secondary lh-lg">{selectedBook.description}</p>
                        {
                            message && (
                                <div className="alert alert-success mt-3" role="alert">
                                    {message}
                                </div>
                            )
                        }
                        <div className="d-flex align-items-center gap-3 my-4">
                          <span className="fw-bold">Quantity: </span>
                          <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                          <span className="fw-bold">{quantity}</span>
                          <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <div className="row g-2 mt-4">
                          <div className="col-md-12 col-sm-4">
                        <button className="btn btn-primary btn-lg w-100" onClick={() => { addToCart(selectedBook, quantity); setMessage(`"${selectedBook.title}" has been added to your cart successfully !`); }}>Add to Cart</button>

                          </div>
                          <div className="col-md-12 col-sm-4">
                            <button className="btn btn-outline-danger btn-lg w-100" 
                        onClick={() => {addToWishlist(selectedBook); setMessage(`"${selectedBook.title}" added to your wishlist!`);}}>Add to Wishlist</button>

                          </div>
                          <div className="col-md-12 col-sm-4">
                        <Link to="/books" state={location.state} className="btn btn-outline-secondary btn-lg w-100">Back to Books</Link>

                          </div>
                        
                        </div>
                        </div>
                        </div>
                        </>
                    ) :(
                        <h3>Book not found</h3>
                    )
                }
            </div>
        </div>
        
        </>
    )
  }
