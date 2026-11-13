import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import CartContext from "../contexts/CartContext";
import { useParams, Link } from "react-router-dom";

export default function BookDetails() {

    const [ message, setMessage] = useState("");
    const [ quantity, setQuantity ] = useState(1)

    const { bookId } = useParams();
    
    const { addToCart, addToWishlist } = useContext(CartContext);
    const books = [
  {
    id: "mrutyunjay",
    title: "Mrutyunjay",
    author: "Shivaji Sawant",
    price: 459,
    image: "https://www.majesticreaders.com/thumb/booksimg/450/600/14016/140160_PIC_1614492711.jpg",
    description: "A famous Marathi novel based on the life of Karna.",
    rating: 4.8
  },
  {
    id: "yayati",
    title: "Yayati",
    author: "V. S. Khandekar",
    price: 232,
    image: "https://m.media-amazon.com/images/I/41pYblF83EL._AC_UF1000,1000_QL80_.jpg",
    description: "A celebrated Marathi novel inspired by the story of Yayati.",
    rating: 4.6,
  },
  {
    id: "shriman-yogi",
    title: "Shriman Yogi",
    author: "Ranjit Desai",
    price: 740,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTWR_z24PP0FjlGKdlMRgYtqFxEWiH8fFc3-WnBeuqi1CZK-4V_0hA0nC&s=10",
    description: "A historical novel about the life of Chhatrapati Shivaji Maharaj.",
    rating: 4.9,
  },
  {
    id: "shyamchi-aai",
    title: "Shyamchi Aai",
    author: "Sane Guruji",
    price: 150,
    image: "https://m.media-amazon.com/images/I/51IPv0Ps+wL._AC_UF1000,1000_QL80_.jpg",
    description: "A touching story about a mother's love and values.",
    rating: 4.7,
  },
  {
    id: "yugandhar",
    title: "Yugandhar",
    author: "Shivaji Sawant",
    category: "Mythological Fiction",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVMBlkhEqsIn4I7qPj7VrbNZz6fFth-jCWYcfWareDzQ&s=10",
    price: 550,
    rating: 4.8,
  },
  {
    id: "radheya",
    title: "Radheya",
    author: "Ranjit Desai",
    category: "Mythological Fiction",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs3QfB73uQ1UhyooFe_C5YoAICjJqNExhZERwWv2x6lA&s=10",
    price: 350,
    rating: 4.5,
  },
  {
    id: "chhava",
    title: "Chhava",
    author: "Shivaji Sawant",
    category: "Historical Fiction",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_a7AyxLbCd2jytZ2F-7yfptZoIvK4aslQsX9KRbmVfCJNZWM3DqssED5R&s=10",
    price: 450,
    rating: 4.7,
  },
  {
    id: "panipat",
    title: "Panipat",
    author: "Vishwas Patil",
    category: "Historical Fiction",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMhbDKrac3EBg8pC2od-8ctSPOdJ1kxZuWOpNL8nmHPQHWBBhIBnYEI3Pc&s=10",
    price: 400,
    rating: 4.6,
  }, 
  {
    id: "rau",
    title: "Rau",
    author: "N S Inamdar",
    category: "Historical Fiction",
    image: "https://upload.wikimedia.org/wikipedia/en/3/35/Front_cover_-_Rau_%28marathi_novel%29_1972.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    price: 350,
    rating: 4.5,
  },
  {
    id: "baluta",
    title: "Baluta",
    author: "Daya Pawar",
    category: "Autobiographical Literature",
    image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1338476136i/14741054.jpg",
    price: "300",
    rating: 4.4,
  },
  {
    id: "smritichitre",
    title: "Smritichitre",
    author: "Lakshmibai Tilak",
    category: "Autobiographical Literature",
    image: "https://covers.storytel.com/jpg-640/9789353642389.9cee8c73-bb8e-437d-8660-8b36e54a84c6?optimize=high&quality=70&width=600",
    price: 350,
    rating: 4.6,
  },
  {
    id: "pan-lakshyat-kon-gheto",
    title: "Pan Lakshyat Kon Gheto",
    author: "Hari Narayan Apte",
    category: "Autobiographical Literature",
    image: "https://m.media-amazon.com/images/I/615EmFqC+yL._AC_UF1000,1000_QL80_.jpg",
    price: 250,
    rating: 4.3,
  }
];

const selectedBook = books.find((book) => book.id === bookId);

    return (
        <>
        <Navbar />
        <div className="container my-5">
            <div className="card border-0 shadow-lg p-4 rounded-4">
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
                        <button className="btn btn-primary btn-lg px-4" onClick={() => { addToCart(selectedBook, quantity); setMessage(`"${selectedBook.title}" has been added to your cart successfully !`); }}>Add to Cart</button>
                        <button className="btn btn-outline-danger btn-lg px-4 ms-2" 
                        onClick={() => {addToWishlist(selectedBook); setMessage(`"${selectedBook.title}" added to your wishlist!`);}}>Add to Wishlist</button>
                        <Link to="/books" className="btn btn-outline-secondary btn-lg ms-3 px-4">Back to Books</Link>
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