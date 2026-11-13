import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import CartContext from '../contexts/CartContext';
import { Link, useSearchParams } from 'react-router-dom';


export default function Books() {
    const { addToCart, addToWishlist } = useContext(CartContext);

    const [ searchTerm, setSearchTerm] = useState("");
    const [ minRating, setMinRating ] = useState("All");
    const [ sortOrder, setSortOrder ] = useState("default");
    
    const [ searchParams ] = useSearchParams();   

    const [ selectedCategory, setSelectedCategory ] = useState(
        searchParams.get("category") || "All"
    );


    const books = [
  {
    id: 1,
    slug: "mrutyunjay",
    title: "Mrutyunjay",
    author: "Shivaji Sawant",
    category: "Mythological Fiction",
    image: "https://www.majesticreaders.com/thumb/booksimg/450/600/14016/140160_PIC_1614492711.jpg",
    price: 459,
    rating: 4.8,
  },
  {
    id: 2,
    slug: "yayati",
    title: "Yayati",
    author: "V. S. Khandekar",
    category: "Mythological Fiction",
    image: "https://m.media-amazon.com/images/I/41pYblF83EL._AC_UF1000,1000_QL80_.jpg",
    price: 232,
    rating: 4.6,
  },
  {
    id: 3,
    slug: "shriman-yogi",
    title: "Shriman Yogi",
    author: "Ranjit Desai",
    category: "Historical Fiction",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTWR_z24PP0FjlGKdlMRgYtqFxEWiH8fFc3-WnBeuqi1CZK-4V_0hA0nC&s=10",
    price: 740,
    rating: 4.9,
  },
  {
    id: 4,
    slug: "shyamchi-aai",
    title: "Shyamchi Aai",
    author: "Sane Guruji",
    category: "Autobiographical Literature",
    image: "https://m.media-amazon.com/images/I/51IPv0Ps+wL._AC_UF1000,1000_QL80_.jpg",
    price: 150,
    rating: 4.7,
  },
  {
    id: 5,
    slug: "yugandhar",
    title: "Yugandhar",
    author: "Shivaji Sawant",
    category: "Mythological Fiction",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVMBlkhEqsIn4I7qPj7VrbNZz6fFth-jCWYcfWareDzQ&s=10",
    price: 550,
    rating: 4.8,
  },
  {
    id: 6,
    slug: "radheya",
    title: "Radheya",
    author: "Ranjit Desai",
    category: "Mythological Fiction",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs3QfB73uQ1UhyooFe_C5YoAICjJqNExhZERwWv2x6lA&s=10",
    price: 350,
    rating: 4.5,
  },
  {
    id: 7,
    slug: "chhava",
    title: "Chhava",
    author: "Shivaji Sawant",
    category: "Historical Fiction",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_a7AyxLbCd2jytZ2F-7yfptZoIvK4aslQsX9KRbmVfCJNZWM3DqssED5R&s=10",
    price: 450,
    rating: 4.7,
  },
  {
    id: 8,
    slug: "panipat",
    title: "Panipat",
    author: "Vishwas Patil",
    category: "Historical Fiction",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMhbDKrac3EBg8pC2od-8ctSPOdJ1kxZuWOpNL8nmHPQHWBBhIBnYEI3Pc&s=10",
    price: 400,
    rating: 4.6,
  }, 
  {
    id: 9,
    slug: "rau",
    title: "Rau",
    author: "N S Inamdar",
    category: "Historical Fiction",
    image: "https://upload.wikimedia.org/wikipedia/en/3/35/Front_cover_-_Rau_%28marathi_novel%29_1972.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    price: 350,
    rating: 4.5,
  },
  {
    id: 10,
    slug: "baluta",
    title: "Baluta",
    author: "Daya Pawar",
    category: "Autobiographical Literature",
    image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1338476136i/14741054.jpg",
    price: "300",
    rating: 4.4,
  },
  {
    id: 11,
    slug: "smritichitre",
    title: "Smritichitre",
    author: "Lakshmibai Tilak",
    category: "Autobiographical Literature",
    image: "https://covers.storytel.com/jpg-640/9789353642389.9cee8c73-bb8e-437d-8660-8b36e54a84c6?optimize=high&quality=70&width=600",
    price: 350,
    rating: 4.6,
  },
  {
    id: 12,
    slug: "pan-lakshyat-kon-gheto",
    title: "Pan Lakshyat Kon Gheto",
    author: "Hari Narayan Apte",
    category: "Autobiographical Literature",
    image: "https://m.media-amazon.com/images/I/615EmFqC+yL._AC_UF1000,1000_QL80_.jpg",
    price: 250,
    rating: 4.3,
  }
];

const filteredBooks = books
  .filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    const matchesRating =
      minRating === "All" || book.rating >= Number(minRating);

    return matchesSearch && matchesCategory && matchesRating;
  })
  .sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return Number(a.price) - Number(b.price);
    }

    if (sortOrder === "highToLow") {
      return Number(b.price) - Number(a.price);
    }

    return 0;
  });

    return ( <>
    <Navbar />
    <div className="container my-4">
        <div className='mb-4'>
            <h2 className='fw-bold'>Explore Our Books</h2>
            <p>Discover your next favourite book from our collection.</p>

        </div>
        <div className="row mb-3">
    <div className="col-md-6">
        <input
            type="text"
            className="form-control form-control-lg rounded-3"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
</div>

        {/* Rating and Price Filters */}
<div className="row mb-4">
  <div className="col-md-3 mb-2">
    <label className="form-label fw-bold">Filter by Rating</label>
    <select
      className="form-select"
      value={minRating}
      onChange={(e) => setMinRating(e.target.value)}
    >
      <option value="All">All Ratings</option>
      <option value="4">4 stars & Above</option>
      <option value="3">3 stars & Above</option>
    </select>
  </div>

  <div className="col-md-3 mb-2">
    <label className="form-label fw-bold">Sort by Price</label>
    <select
      className="form-select"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="default">Default</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
    </select>
  </div>
</div>

{/* Category Filters */}
<div className="d-flex flex-wrap gap-2 mb-4">
  {[
    "All",
    "Mythological Fiction",
    "Historical Fiction",
    "Autobiographical Literature"
  ].map((category) => (
    <button
      key={category}
      className={`btn ${
        selectedCategory === category
          ? "btn-primary"
          : "btn-outline-primary"
      }`}
      onClick={() => setSelectedCategory(category)}
    >
      {category}
    </button>
  ))}
</div>
          
        <div className="row">
            {
                filteredBooks.length === 0 ? (
                  
                        <p className="text-center text-muted">No books found.</p>
                    
                ) :  (filteredBooks.map((book) => (
                    <div className="col-md-3 mb-4" key={book.id}>
                        <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                            <div className='text-center bg-light p-3'>
                                <Link to={`/books/${book.slug}`}>
                                <img src={book.image} alt={book.title} className='img-fluid' style={{height:"220px", width:"100%", objectFit:"contain"}}/>
                                
                                </Link>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">{book.title}</h5>
                                <p className="text-muted mb-2">By {book.author}</p>
                                <div className="mb-2">
                                    <span className="text-warning">
                                            {"★".repeat(Math.round(book.rating))}
                                            </span>
                                            <span className="text-muted">
                                                    {"☆".repeat(5 - Math.round(book.rating))}
                                                    </span>
                                                    <small className="text-muted ms-2">
                                                            {book.rating}/5
                                                            </small>
                                                            </div>
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