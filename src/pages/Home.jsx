import { Link } from "react-router-dom";
export default function Home() {
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

        {/* Book categories section */}
        <section className="container my-5">
  <h2 className="text-center mb-4">Book Categories</h2>

  <div className="row g-3">
    <div className="col-md-3">
      <div className="card p-4 text-center">
        <h5>Fiction</h5>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card p-4 text-center">
        <h5>Self-Help</h5>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card p-4 text-center">
        <h5>Business</h5>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card p-4 text-center">
        <h5>Personal Development</h5>
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