import React, { useState} from "react"
import Navbar from "../components/Navbar";

export default function Profile() {

    const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("profile");

    return savedProfile
        ? JSON.parse(savedProfile)
        : {
            fullName: "",
            email: "",
            phone: ""
        };
});


const [addresses, setAddresses] = useState(() => {
    const savedAddresses = localStorage.getItem("addresses");
    return savedAddresses ? JSON.parse(savedAddresses) : [];
});

const [newAddress, setNewAddress] = useState({
    fullAddress: "",
    city: "",
    pinCode: ""
});
const [defaultAddress, setDefaultAddress] = useState(() => {
    const savedDefault = localStorage.getItem("defaultAddress");
    return savedDefault ? JSON.parse(savedDefault) : null;
});

const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
});

    return (
        <>
        <Navbar />
        <div className="container my-5">
            <h2 className="fw-bold">My Profile</h2>
           
            <p className="text-muted">Manage your personal information</p>
        
        <div className="card shadow-sm border-0 rounded-4 p-4 mt-4">
            <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={profile.fullName}
                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                 />
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Email address</label>
                <input 
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Phone Number</label>                
                <input 
                type="tel"
                className="form-control"
                placeholder="Enter your phone number"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                 />
            </div>
            <button className="btn btn-primary" onClick={() => {
                localStorage.setItem("profile", JSON.stringify(profile));
                alert("Profile saved successfully.")
            }}>
                Save Profile
            </button>
            </div>
             <div className="card shadow-sm border-0 rounded-4 p-4 mt-4">
                <h4 className="fw-bold mb-3">My Address</h4>
                <div className="mb-3">
                    <label className="form-label">Full Address</label>
                    <textarea 
                    className="form-control"
                    placeholder="Enter your delivery address"
                    rows="3"
                    value={newAddress.fullAddress}
                    onChange={(e) => setNewAddress({...newAddress, fullAddress: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">City</label>
                    <input 
                    type="text"
                    className="form-control"
                    placeholder="Enter city"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">PIN Code</label>
                    <input
                     type="text"
                     className="form-control"
                      placeholder="Enter PIN code"
                      value={newAddress.pinCode}
                      onChange={(e) => setNewAddress({...newAddress, pinCode: e.target.value})}
                       />
                </div>
                <button
                className="btn btn-primary"
                onClick={() => {
                        if (!newAddress.fullAddress.trim() ||
                                !newAddress.city.trim() ||
                                        !newAddress.pinCode.trim()) {
                                                    alert("Please fill in all address fields.");
                                                            return;

        }

        const alreadyExists = addresses.some(
    (address) =>
        address.fullAddress === newAddress.fullAddress &&
        address.city === newAddress.city &&
        address.pinCode === newAddress.pinCode
);

if (alreadyExists) {
    alert("This address is already saved.");
    return;
}

const updatedAddresses = [...addresses, newAddress];

        setAddresses(updatedAddresses);
        localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

        setNewAddress({
            fullAddress: "",
            city: "",
            pinCode: ""
        });

        alert("Address saved successfully!");
    }}
>
    Save Address
</button>

{addresses.map((address, index) => (
    <div className="border rounded-3 p-3 mt-3" key={index}>
        <h6 className="fw-bold">Address {index + 1}</h6>

        <p className="mb-1">{address.fullAddress}</p>
        <p className="mb-2">
            {address.city} - {address.pinCode}
        </p>

        <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => {
                setDefaultAddress(address);
                localStorage.setItem(
                    "defaultAddress",
                    JSON.stringify(address)
                );
            }}
        >
            Set as Default
        </button>

        {defaultAddress &&
            defaultAddress.fullAddress === address.fullAddress &&
            defaultAddress.city === address.city &&
            defaultAddress.pinCode === address.pinCode && (
                <span className="badge bg-success ms-2">
                    Default Address
                </span>
            )}
    </div>
))}
            </div>
            <div className="card shadow-sm border-0 rounded-4 p-4 mt-4">
                <h4 className="fw-bold mb-3">Order History</h4>

                {
                    orders.length === 0 ? (
                        <p className="text-muted">You haven't placed any orders yet.</p>
                    ) : (
                        orders.map((order) => (
                            <div key={order.orderId} className="border rounded-3 p-3 mb-3">
                                <h6>Order ID: {order.orderId}</h6>
                                <p>Order Date: {order.orderDate}</p>
                                <p>Status: {order.status}</p>
                                <p>Total Amount: ₹{order.totalPrice}</p>

                                <h6>Books Purchased: </h6>
                                {
                                    order.books.map((book, index) => (
                                        <p key={index} className="mb-1">{book.title} - ₹{book.price}</p>
                                    ))
                                }
                            </div>
                        ))
                    )
                }
            </div>
        
        </div>
        </>
    );
}