import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";

export default function OrderSuccess() {

    const navigate = useNavigate();

    const location = useLocation();
    
    const { customerInfo, cart, totalPrice } = location.state || { customerInfo: {}, cart: [], totalPrice: 0 };

    const [ orders, setOrders ] = useState(() => {
        const savedOrders = localStorage.getItem("orders");
        return savedOrders ? JSON.parse(savedOrders) : [];
    })

    const orderSaved = useRef(false)

    useEffect(() => {
        if(!location.state || orderSaved.current ) return;

        orderSaved.current = true;

        const newOrder = {
            orderId: Date.now(),
            customerInfo,
            books: cart,
            totalPrice,
            orderDate: new Date().toLocaleDateString(),
            status: "Confirmed"

        };

        const updatedOrders = [ ...orders, newOrder];

        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
    }, []);

   
    if(!location.state) {
        return (
            <>
            <Navbar />
            <div className="container my-4">
                <h2>No order details available.</h2>
                </div>
            </>
        )
    }
    return (
        <>
        <Navbar />
        <div className="container my-4">
            <h2>Order Placed Successfully</h2>
            <p>Thank you <strong>{customerInfo.name}</strong> for your order!</p>
            {
                cart.map((book) => (
                    <div key={book.id}>
                        <h5>{book.title}</h5>
                        <p>Price: ₹{book.price.toFixed(2)}</p>
                    </div>
                ))
            }
            <p>Total Amount: ₹{totalPrice.toFixed(2)}</p>
            <p>Total Books: {cart.length}</p>
            <p>Your order has been placed successfully.</p>
            <button
    className="btn btn-primary mt-3"
    onClick={() => navigate("/books")}
>
    Continue Shopping
</button>
        </div>
        <Footer />
        </>
    )
}