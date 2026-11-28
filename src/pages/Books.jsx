import { toast } from "react-toastify";
import React, { useState, useContext } from 'react';
import CartContext from '../contexts/CartContext';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import useFetch from "../useFetch";



export default function Books() {

  const location = useLocation();
  const navigate = useNavigate();

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setMinRating("All");
    setSortOrder("default");
    navigate("/books", { replace: true });
};
    const { addToCart, addToWishlist } = useContext(CartContext);

   const { data, loading, error } = useFetch(
    "https://major-project-one-backend-omega.vercel.app/api/books"
);

    const [ searchParams ] = useSearchParams();   
    const searchTerm = location.state?.searchTerm || searchParams.get("search") || "";
    const [ minRating, setMinRating ] = useState(location.state?.minRating || "All" );
    const [ sortOrder, setSortOrder ] = useState(location.state?.sortOrder || "default");
    

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (category) => {
    setSelectedCategories((previous) =>
        previous.includes(category)
            ? previous.filter((item) => item !== category)
            : [...previous, category]
    );
};


 const books = data?.books || [];

const filteredBooks = books
  .filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(book.category);

    const matchesRating =
      minRating === "All" || (minRating === "4" && book.rating >= 4) || (minRating === "3below" && book.rating < 4);

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

  if (loading) {
    return <p className="text-center mt-5">Loading books...</p>;
}

if (error) {
    return <p className="text-center text-danger mt-5">{error}</p>;
}

    return ( <>
    <div className="container my-4">
        <div className='mb-4'>
            <h2 className='fw-bold'>Explore Our Books</h2>
            <p>Discover your next favourite book from our collection.</p>

        </div>
        <div className="row mb-3">
</div>

        {/* Rating and Price Filters */}
<div className="row g-4">
    <div className="col-lg-3">
        <div className="card border-0 shadow-sm rounded-4 p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Filters</h5>
                <button
                    className="btn btn-outline-secondary mb-4"
                    onClick={handleClearFilters}
                >
                    Clear
                </button>
            </div>
  <div className="mb-3">
    <label className="form-label fw-bold">Filter by Rating</label>
    <select
      className="form-select"
      value={minRating}
      onChange={(e) => setMinRating(e.target.value)}
    >
      <option value="All">All Ratings</option>
      <option value="4">4 stars & Above</option>
      <option value="3below">Below 4 stars</option>
    </select>
  </div>

  <div className="mb-3">
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
  {/* Category Filter */}
{/* Category Filter */}
<div className="mt-4">
    <h6 className="fw-bold mb-3">Category</h6>

    {[
        "All",
        "Mythological Fiction",
        "Historical Fiction",
        "Autobiographical Literature"
    ].map((category) => (
        <div className="form-check mb-2" key={category}>
            <input
                className="form-check-input"
                type="checkbox"
                id={category}
                checked={
                    category === "All"
                        ? selectedCategories.length === 0
                        : selectedCategories.includes(category)
                }
                onChange={() => {
                    if (category === "All") {
                        setSelectedCategories([]);
                    } else {
                        handleCategoryChange(category);
                    }
                }}
            />

            <label className="form-check-label" htmlFor={category}>
                {category}
            </label>
        </div>
    ))}
</div>
</div>

        </div>
        {/* Books Section */}
    <div className="col-lg-9">          
        <div className="row">
            {
                filteredBooks.length === 0 ? (
                  
                        <p className="text-center text-muted">No books found.</p>
                    
                ) :  (filteredBooks.map((book) => (
                    <div className="col-md-4 mb-4" key={book.id}>
                        <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                            <div className='text-center bg-light p-3'>
                                <Link to={`/books/${book.slug}`} state={{selectedCategories, minRating, sortOrder, searchTerm}}>
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

                                <button className="btn btn-primary" onClick={() => {addToCart(book); toast.success(`${book.title} added to cart!`);}}>
                                    Add to Cart
                                </button>
                                <button className="btn btn-outline-danger" onClick={() => {addToWishlist(book); toast.success(`${book.title} added to wishist!`);}}>
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
    </div>
    </div>
   

    </>)
}