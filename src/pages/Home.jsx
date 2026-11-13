import { Link, useNavigate } from "react-router-dom";
import { useSearchParams  } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();
  
    return (<> 
    {/* hero section */}
    <section className="bg-light py-5">
        <div className="container text-center py-5">
            <h1 className="display-3 fw-bold">Find Your Next Favourite Book.</h1>
            <p className="lead text-muted mt-3"> Explore inspiring stories, timeless classics, and amazing collections.</p>
            <Link to="/books" className="btn btn-primary btn-lg mt-4 px-5">
                Explore Books
            </Link>
        </div>
        </section>

        {/* Book Categories Section */}
<section className="container my-5">
    <h2 className="text-center fw-bold mb-4">Book Categories</h2>

    <div className="row g-4">
        <div className="col-md-3">
            <div
                className="card h-100 shadow-sm border-0"
                role="button"
                onClick={() => navigate("/books?category=All")}
            >
              <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              className="card-img-top"
              alt="All Books"
              style={{height:"180px", objectFit:"cover" }}
               />
              <div className="card-body text-center">
                <h5 className="fw-bold">All Books</h5>
              </div>
            </div>
        </div>

        <div className="col-md-3">
            <div
                className="card h-100 shadow-sm border-0"
                role="button"
                onClick={() => navigate("/books?category=Mythological%20Fiction")}
            >
              <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f"
              className="card-img-top"
              alt="Mythological Fiction"
              style={{height:"180px", objectFit:"cover"}}
               />
              <div className="card-body text-center">

                <h5 className="fw-bold">Mythological Fiction</h5>
              </div>
            </div>
        </div>

        <div className="col-md-3">
            <div
                className="card h-100 shadow-sm border-0"
                role="button"
                onClick={() => navigate("/books?category=Historical%20Fiction")}
            >
              <img
              src="https://images.unsplash.com/photo-1461360370896-922624d12aa1"
              className="card-img-top"
              alt="Historical Fiction"
              style={{height:"180px", objectFit:"cover"}}
              />
              <div className="card-body text-center">
                <h5>Historical Fiction</h5>
              </div>
            </div>
        </div>

        <div className="col-md-3">
            <div
                className="card h-100 shadow-sm border-0"
                role="button"
                onClick={() => navigate("/books?category=Autobiographical%20Literature")}
            >
              <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
              className="card-img-top"
              alt="Autobiographical Literature"
              style={{height:"180px", objectFit:"cover"}}
              />
              <div className="card-body text-center">
                <h5>Autobiographical Literature</h5>

              </div>
            </div>
        </div>
    </div>
</section>

{/* Featured Books Section */}
<section className="container my-5">
  <h2 className="text-center mb-4">Featured Books</h2>
  <div className="row g-4">
    {/* Book 1 */}
    <div className="col-md-3">
      <div className="card h-100">
        <img
  src="https://www.majesticreaders.com/thumb/booksimg/450/600/14016/140160_PIC_1614492711.jpg"
  alt="Mrutyunjay book cover"
  className="card-img-top"
  style={{ height: "220px", width: "100%", objectFit: "contain", backgroundColor: "#f8f9fa", }}
/>
        <div className="card-body text-center">
          <h5 className="card-title">Mrutyunjay</h5>
          <p className="card-text">Price: ₹459.00</p>
          <Link to="/books/mrutyunjay" className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
    {/* Book 2 */}
    <div className="col-md-3">
      <div className="card h-100">
         <img
  src="https://m.media-amazon.com/images/I/41pYblF83EL._AC_UF1000,1000_QL80_.jpg"
  alt="Yayati book cover"
  className="card-img-top"
  style={{ height: "220px", width: "100%", objectFit: "contain", backgroundColor: "#f8f9fa", }}
/>
        
        <div className="card-body text-center">
          <h5 className="card-title">Yayati</h5>
          <p className="card-text">Price: ₹232.00</p>
          <Link to="/books/yayati" className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
    {/* Book 3 */}
    <div className="col-md-3">
      <div className="card h-100">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTWR_z24PP0FjlGKdlMRgYtqFxEWiH8fFc3-WnBeuqi1CZK-4V_0hA0nC&s=10" alt="Shriman Yogi book cover" className="card-img-top" style={{ height: "220px", width: "100%", objectFit: "contain", backgroundColor: "#f8f9fa", }} />
        <div className="card-body text-center">
          <h5 className="card-title">Shriman Yogi</h5>
          <p className="card-text">Price: ₹740.00</p>
          <Link to="/books/shriman-yogi" className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
    {/* Book 4 */}
    <div className="col-md-3">
      <div className="card h-100">
         <img src="https://m.media-amazon.com/images/I/51IPv0Ps+wL._AC_UF1000,1000_QL80_.jpg" alt="Shyamchi Aai book cover" className="card-img-top" style={{ height: "220px", width: "100%", objectFit: "contain", backgroundColor: "#f8f9fa", }} />
        <div className="card-body text-center">
          <h5 className="card-title">Shyamchi Aai</h5>
          <p className="card-text">Price: ₹150.00</p>
          <Link to="/books/shyamchi-aai" className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  </div>

</section>

        </>
    );

}