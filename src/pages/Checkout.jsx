import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartContext from '../contexts/CartContext';

export default function Checkout() {

    const navigate = useNavigate();

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
    });

    const { cart, setCart } = useContext(CartContext);

    const totalPrice = cart.reduce(
    (total, book) => total + book.price,
    0
);

    const handleChange = (event) => {
    const { name, value } = event.target;

    setCustomerInfo({
        ...customerInfo,
        [name]: value
    });
};

const handlePlaceOrder = () => {
    if(
        !customerInfo.name ||
        !customerInfo.email ||
        !customerInfo.phone ||
        !customerInfo.address ||
        !customerInfo.city ||
        !customerInfo.pincode
    ) {
        alert("Please fill in all the fields.");
        return;
    }
    alert("Order placed successfully!");
    navigate("/order-success", { state: { customerInfo, cart, totalPrice } });
    setCart([]); // Clear the cart after placing the order
    
}

    return (
        <>
        <Navbar />
        <div className="container my-4">
            <h2>Checkout</h2>
            <hr />
            <h4>Order Summary</h4>
            {
                cart.map((book) => (
                    <div key={book.id}>
                        <h5>{book.title}</h5>
                        <p>Price: ₹{book.price.toFixed(2)}</p>
                    </div>
                    
                ))
            }
            <div className="card mt-3 mb-4">
    <div className="card-body">
        <h5>Total Amount: ₹{totalPrice.toFixed(2)}</h5>
        <h5>Total Books: {cart.length}</h5>
    </div>
</div>

<h4>Customer Information</h4>
            {/* Full Name */}
            <div className='mb-3'>
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" value={customerInfo.name} onChange={handleChange} />
            </div>

            {/* Email address */}
            <div className='mb-3'>
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" value={customerInfo.email} onChange={handleChange} />
            </div>

            {/* Phone number */}
            <div className='mb-3'>
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="text" className="form-control" id="phone" name="phone" placeholder="Enter your phone number" value={customerInfo.phone} onChange={handleChange} />
            </div>

            {/* Address */}
            <div className='mb-3'>
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" name="address" placeholder="Enter your address" value={customerInfo.address} onChange={handleChange} />
            </div>

            {/* City */}
            <div className='mb-3'>
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control" id="city" name="city" placeholder="Enter your city" value={customerInfo.city} onChange={handleChange} />
            </div>  

            {/* Pincode */}
            <div className='mb-3'>
                <label htmlFor="pincode" className="form-label">Pincode</label> 
                <input type="text" className="form-control" id="pincode" name="pincode" placeholder="Enter your pincode" value={customerInfo.pincode} onChange={handleChange} />
            </div>
            <button className="btn btn-primary" onClick={handlePlaceOrder}>
                Place Order
            </button>
        </div>
        </>
    )
}