import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import CartContext from "../contexts/CartContext";
import { useParams, Link } from "react-router-dom";

export default function BookDetails() {

    const [ message, setMessage] = useState("");

    const { bookId } = useParams();
    const { addToCart } = useContext(CartContext);
    const books = [
  {
    id: "mrutyunjay",
    title: "Mrutyunjay",
    author: "Shivaji Sawant",
    price: 459,
    image: "https://www.majesticreaders.com/thumb/booksimg/450/600/14016/140160_PIC_1614492711.jpg",
    description: "A famous Marathi novel based on the life of Karna."
  },
  {
    id: "yayati",
    title: "Yayati",
    author: "V. S. Khandekar",
    price: 232,
    image: "https://m.media-amazon.com/images/I/41pYblF83EL._AC_UF1000,1000_QL80_.jpg",
    description: "A celebrated Marathi novel inspired by the story of Yayati."
  },
  {
    id: "shriman-yogi",
    title: "Shriman Yogi",
    author: "Ranjit Desai",
    price: 740,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTWR_z24PP0FjlGKdlMRgYtqFxEWiH8fFc3-WnBeuqi1CZK-4V_0hA0nC&s=10",
    description: "A historical novel about the life of Chhatrapati Shivaji Maharaj."
  },
  {
    id: "shyamchi-aai",
    title: "Shyamchi Aai",
    author: "Sane Guruji",
    price: 150,
    image: "https://m.media-amazon.com/images/I/51IPv0Ps+wL._AC_UF1000,1000_QL80_.jpg",
    description: "A touching story about a mother's love and values."
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
                        <button className="btn btn-primary btn-lg px-4" onClick={() => { addToCart(selectedBook); setMessage(`"${selectedBook.title}" has been added to your cart successfully !`); }}>Add to Cart</button>
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