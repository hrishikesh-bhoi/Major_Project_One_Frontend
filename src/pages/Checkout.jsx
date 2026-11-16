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

    const [addresses] = useState(() => {
    const savedAddresses = localStorage.getItem("addresses");

    return savedAddresses ? JSON.parse(savedAddresses) : [];
});

    const { cart, setCart } = useContext(CartContext);

    const totalPrice = cart.reduce(
    (total, book) => total + book.price * (book.quantity || 1),
    0
);

const totalBooks = cart.reduce(
    (total, book) => total + (book.quantity || 1),
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
        <h5>Total Books: {totalBooks}</h5>
    </div>
</div>



<h4>Delivery Address</h4>

{addresses.length === 0 ? (
    <p className="text-muted">
        No saved addresses. Please add an address from your Profile.
    </p>
) : (
    addresses.map((address, index) => (
        <div className="form-check border rounded-3 p-3 mb-2" key={index}>
            
            <input
                className="form-check-input"
                type="radio"
                name="deliveryAddress"
                id={`address-${index}`}
                checked={
                        customerInfo.address === address.fullAddress &&
                            customerInfo.city === address.city &&
                                customerInfo.pincode === address.pinCode
                                }
                                onChange={() => {
                                        setCustomerInfo({
                                                    ...customerInfo,
                                                        address: address.fullAddress,
                                                        city: address.city,
                                                        pincode: address.pinCode
                                                        });
                                                        }}
                                                        />
            <label className="form-check-label" htmlFor={`address-${index}`}>
                <strong>{address.fullAddress}</strong>
                <br />
                {address.city} - {address.pinCode}
            </label>
        </div>
    ))
)}
<h5>Selected Delivery Address</h5>

{customerInfo.address ? (
    <>
        <p>{customerInfo.address}</p>
        <p>{customerInfo.city} - {customerInfo.pincode}</p>
    </>
) : (
    <p className="text-muted">Please select a delivery address.</p>
)}

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

    
            <button className="btn btn-primary" onClick={handlePlaceOrder}>
                Place Order
            </button>
        </div>
        </>
    )
}