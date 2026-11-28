import { toast } from "react-toastify";
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import CartContext from '../contexts/CartContext';


export default function Cart() {

    const { cart, removeFromCart, updateQuantity, addToWishlist } = useContext(CartContext);

    const totalPrice = cart.reduce((total, book) => total + Number(book.price) * (book.quantity || 1), 0);

    const totalBooks = cart.reduce((total, book) => total + (book.quantity || 1) ,0)

    return ( <>
    
    <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 className='fw-bold'>My Shopping Cart</h2>
            <p className='text-mutedmb-0'>
                Review your selected books before checkout.
            </p>

        </div>
        <span className='badge bg-primary fs-6'>{totalBooks} Items</span>

        </div>
        {
            cart.length === 0 ? (
                <p>Your cart is empty. Start adding some books!</p>
            ):(
                <>
                <div className='row g-4'>
                
                {cart.map((book, index) => (

                <div className='col-12' key={book.cartId}>
                    <div className='card border-0 shadow-sm rounded-4'>
                    <div className='card-body p-4'>
                        <div className='row g-3 align-items-start'>
                            <div className="col-4 col-md-2">
                                <div className="bg-light rounded-3 p-2">
                                <Link to={`/books/${book.slug}`}>
                                  <img
                                src={book.image}
                                alt={book.title}
                                style={{
                                    width: "110px",
                                    height: "140px",
                                    objectFit: "contain"
                                }}
                            />
                            </Link>
                            </div>
                            </div>
                            <div className="col-8 col-md-4">
                        <h5 className='fw-bold'>{book.title}</h5>
                        <p className='text-muted mb-2'>Author: {book.author}</p>
                        <div className='d-flex align-items-center gap-3 my-3'>
                            <span className='fw-bold'>Quantity:</span>
                            <button className='btn btn-outline-secondary btn-sm' onClick={() => {
                                if ((book.quantity || 1) > 1) {
                                    updateQuantity(book.cartId, -1);
                                    toast.info("Book quantity decreased.");
                                    } else {
                                        toast.warning("Minimum quantity is 1.");
                                        }
                                        }}>-</button>
                            <span className='fw-bold'>{book.quantity || 1}</span>
                            <button className='btn btn-outline-secondary btn-sm' onClick={() => {
                                updateQuantity(book.cartId, 1);
                                toast.success("Book quantity increased.");
                                }}>+</button>
                        </div>
                        <h5 className='text-primary fw-bold'>Price: ₹{Number(book.price).toFixed(2)}</h5>
                        <h6 className="fw-bold text-success">Subtotal: ₹{(Number(book.price) * (book.quantity || 1)).toFixed(2)}</h6>
                            </div>
                        <div className="col-12 col-md-3">
                            <div className="d-flex flex-column align-items-start gap-2 mt-3">
                            <button
                            className="btn btn-outline-primary w-100"
                            onClick={async () => {
                                try {
                                    await addToWishlist(book);
                                    await removeFromCart(book.cartId);
                                    toast.success(`${book.title} moved to wishlist.`);
                                    } catch (error) {
                                        toast.error("Failed to add book to wishlist.");
                                        }
                                        }}
                                >
                                    Add to Wishlist
                                    </button>
                                    <button
                                    className="btn btn-danger w-100"
                                    onClick={() => {
                                        removeFromCart(book.cartId);
                                        toast.success(`${book.title} removed from cart.`);
                                        }}
                                        >
                                            Remove
                                            </button>
                                            </div>   
                                            </div>                  
                        </div>
                    </div>
                </div>
                </div>
                ))
                
            }
            </div>
        {/* Add Total amount */}
        <div className="card mt-4">
            <div className="card-body">
            <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
            <h5>Total Books: {totalBooks}</h5>
            <Link to="/checkout" className="btn btn-success mt-3">Proceed to Checkout</Link>
            </div>
        </div>
                </>
            )
        }

    </div>
   
    </>)
}