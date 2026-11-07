import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import CartContext from '../contexts/CartContext';


export default function Books() {
    const { addToCart, addToWishlist } = useContext(CartContext);

    const [ searchTerm, setSearchTerm] = useState("");

    const books = [
  {
    id: 1,
    title: "Mrutyunjay",
    author: "Shivaji Sawant",
    image: "https://www.majesticreaders.com/thumb/booksimg/450/600/14016/140160_PIC_1614492711.jpg",
    price: 459,
  },
  {
    id: 2,
    title: "Yayati",
    author: "V. S. Khandekar",
    image: "https://m.media-amazon.com/images/I/41pYblF83EL._AC_UF1000,1000_QL80_.jpg",
    price: 232,
  },
  {
    id: 3,
    title: "Shriman Yogi",
    author: "Ranjit Desai",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTWR_z24PP0FjlGKdlMRgYtqFxEWiH8fFc3-WnBeuqi1CZK-4V_0hA0nC&s=10",
    price: 740,
  },
  {
    id: 4,
    title: "Shyamchi Aai",
    author: "Sane Guruji",
    image: "https://m.media-amazon.com/images/I/51IPv0Ps+wL._AC_UF1000,1000_QL80_.jpg",
    price: 150,
  },
];

const filteredBooks = books.filter((book) =>
  book.title.toLowerCase().includes(searchTerm.toLowerCase())
);

    return ( <>
    <Navbar />
    <div className="container my-4">
        <div className='mb-4'>
            <h2 className='fw-bold'>Explore Our Books</h2>
            <p>Discover your next favourite book from our collection.</p>

        </div>
        <div className="row mb-3">
            <div className='col-md-6'>
            <input
                type="text"
                className="form-control form-control-lg rounded-3"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        </div>
        <div className="row">
            {
                filteredBooks.length === 0 ? (
                  
                        <p className="text-center text-muted">No books found.</p>
                    
                ) :  (filteredBooks.map((book) => (
                    <div className="col-md-3 mb-4" key={book.id}>
                        <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                            <div className='text-center bg-light p-3'>
                                <img src={book.image} alt={book.title} className='img-fluid' style={{height:"220px", width:"100%", objectFit:"contain"}}/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">{book.title}</h5>
                                <p className="text-muted mb-2">By {book.author}</p>
                                <h5 className='text-primary fw-bold mb-3'>₹{book.price}</h5>
                                <div className='d-grid gap-2'>

                                <button className="btn btn-primary" onClick={() => addToCart(book)}>
                                    Add to Cart
                                </button>
                                <button className="btn btn-outline-danger" onClick={() => addToWishlist(book)}>
                                    Add to Wishlist
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )))
            }
        </div>
        
    </div>

    </>)
}