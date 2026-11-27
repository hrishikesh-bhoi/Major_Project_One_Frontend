import { toast } from "react-toastify";
import React, { useState, useEffect } from "react"


export default function Profile() {

   const profile = {
    fullName: "John Doe",
    email: "doe.john@gmail.com",
    phone: "9876543210"
};

const [addresses, setAddresses] = useState(() => {
    const savedAddresses = localStorage.getItem("addresses");
    return savedAddresses ? JSON.parse(savedAddresses) : [];
});

const [newAddress, setNewAddress] = useState({
    fullAddress: "",
    city: "",
    pinCode: ""
});

const [ editingIndex, setEditingIndex ] = useState(null)

const [defaultAddress, setDefaultAddress] = useState(() => {
    const savedDefault = localStorage.getItem("defaultAddress");
    return savedDefault ? JSON.parse(savedDefault) : null;
});

const [orders, setOrders] = useState([]);

useEffect(() => {
    const fetchOrders = async () => {
        try {
            const response = await fetch("https://major-project-one-backend-omega.vercel.app/api/orders");

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to fetch orders.");
            }

            setOrders(result.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to load order history.");
        }
    };

    fetchOrders();
}, []);

const deleteOrder = async (orderId) => {
    try {
        const response = await fetch(
            `https://major-project-one-backend-omega.vercel.app/api/orders/${orderId}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to delete order.");
        }

        setOrders((previousOrders) =>
            previousOrders.filter((order) => order._id !== orderId)
        );

        toast.success("Order deleted successfully!");

    } catch (error) {
        console.error("Error deleting order:", error);
        toast.error("Failed to delete order.");
    }
};

    return (
        <>
       
        <div className="container my-5">
            <h2 className="fw-bold">My Profile</h2>
           
            <p className="text-muted">Manage your personal information</p>
        
        <div className="card shadow-sm border-0 rounded-4 p-4 mt-4">
           <h4 className="fw-bold mb-3">Personal Information</h4>
           <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <p className="text-muted">{profile.fullName}</p>
           </div>
           <div className="mb-3">
            <label className="form-label fw-bold">Email Address</label>
            <p className="text-muted">{profile.email}</p>
           </div>
           <div className="mb-3">
            <label className="form-label fw-bold">Phone Number</label>
            <p className="text-muted">{profile.phone}</p>
           </div>
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
                      placeholder="Enter 6-digit pincode"
                      value={newAddress.pinCode}
                      maxLength={6}
                      inputMode="numeric"
                      onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                                setNewAddress({
                                        ...newAddress,
                                        pinCode: value
                                          });
                                            }}
                       />
                </div>
                <button
                className="btn btn-primary"
                onClick={() => {
                        if (!newAddress.fullAddress.trim() ||
                                !newAddress.city.trim() ||
                                        !newAddress.pinCode.trim()) {
                                                    toast.error("Please fill in all address fields.");
                                                            return;

        }

        if(newAddress.pinCode.length !== 6) {
            toast.error("Pincode must contain exactly 6 digits.");
            return;
        }
        const alreadyExists = addresses.some(
    (address, index) =>
        index !== editingIndex &&
        address.fullAddress === newAddress.fullAddress &&
        address.city === newAddress.city &&
        address.pinCode === newAddress.pinCode
);

if (alreadyExists) {
    toast.warning("This address is already saved.");
    return;
}

let updatedAddresses;

if (editingIndex !== null) {
    const oldAddress = addresses[editingIndex];

    updatedAddresses = addresses.map((address, index) =>
        index === editingIndex ? newAddress : address
    );

    if (
        defaultAddress &&
        defaultAddress.fullAddress === oldAddress.fullAddress &&
        defaultAddress.city === oldAddress.city &&
        defaultAddress.pinCode === oldAddress.pinCode
    ) {
        setDefaultAddress(newAddress);
        localStorage.setItem(
            "defaultAddress",
            JSON.stringify(newAddress)
        );
    }

    toast.success("Address updated successfully!");
} else {
    updatedAddresses = [...addresses, newAddress];

    toast.success("Address saved successfully!");
}

setAddresses(updatedAddresses);
localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

setNewAddress({
    fullAddress: "",
    city: "",
    pinCode: ""
});

setEditingIndex(null);
    }}
>
    { editingIndex !== null ? "Update Address" : "Save Address"}
</button>

{addresses.map((address, index) => (
    <div className="border rounded-3 p-3 mt-3" key={index}>
        <h6 className="fw-bold">Address {index + 1}</h6>

        <p className="mb-1">{address.fullAddress}</p>
        <p className="mb-2">
            {address.city} - {address.pinCode}
        </p>
        <button
    className="btn btn-warning btn-sm me-2"
    onClick={() => {
        setNewAddress({
            fullAddress: address.fullAddress,
            city: address.city,
            pinCode: address.pinCode
        });

        setEditingIndex(index);
    }}
>
    Edit
</button>

        <button
            className="btn btn-outline-primary btn-sm me-2"
            onClick={() => {
                setDefaultAddress(address);
                localStorage.setItem(
                    "defaultAddress",
                    JSON.stringify(address)
                );
                toast.success("Default address updated successfully!");
            }}
        >
            Set as Default
        </button>
        <button
    className="btn btn-outline-danger btn-sm"
    onClick={() => {
        const updatedAddresses = addresses.filter(
            (_, i) => i !== index
        );

        setAddresses(updatedAddresses);
        localStorage.setItem(
            "addresses",
            JSON.stringify(updatedAddresses)
        );

        if (
            defaultAddress &&
            defaultAddress.fullAddress === address.fullAddress &&
            defaultAddress.city === address.city &&
            defaultAddress.pinCode === address.pinCode
        ) {
            setDefaultAddress(null);
            localStorage.removeItem("defaultAddress");
        }

        if (editingIndex === index) {
            setNewAddress({
                fullAddress: "",
                city: "",
                pinCode: ""
            });
            setEditingIndex(null);
        } else if (editingIndex !== null && editingIndex > index) {
            setEditingIndex(editingIndex - 1);
        }

        toast.success("Address deleted successfully!");
    }}
>
    Delete
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
            
<div className="card shadow-sm border-0 rounded-3 p-4 mt-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h4 className="fw-bold mb-1">My Orders</h4>
            <p className="text-muted mb-0">
                Track and manage your purchases.
            </p>
        </div>
        <span className="badge bg-primary rounded-pill px-3 py-2">
            {orders.length} Orders
        </span>
    </div>

    {orders.length === 0 ? (
        <div className="text-center py-5">
            <h5 className="text-muted">No orders yet!</h5>
            <p className="text-muted">
                Your purchased books will appear here.
            </p>
        </div>
    ) : (
        orders.map((order) => (
            <div
                key={order._id}
                className="border rounded-3 p-3 p-md-4 mb-3"
            >
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                    <div>
                        <h6 className="fw-bold mb-2">
                            Order #{order._id.slice(-8)}
                        </h6>
                        <small className="text-muted">
                            Placed on:{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </small>
                    </div>

                    <div>
                        <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                            {order.status}
                        </span>
                    </div>
                </div>

                <hr />

                <h6 className="fw-bold mb-3">Books Purchased</h6>

                {order.books.map((item, index) => (
                    <div
                        key={index}
                        className="d-flex align-items-center gap-3 mb-3"
                    >
                        <img
                            src={item.bookId?.image}
                            alt={item.bookId?.title || "Book"}
                            className="rounded-3"
                            style={{
                                width: "65px",
                                height: "85px",
                                objectFit: "contain",
                                borderRadius: "12px"
                            }}
                        />

                        <div className="flex-grow-1">
                            <h6 className="fw-bold mb-1">
                                {item.bookId?.title || "Book unavailable"}
                            </h6>
                            <small className="text-muted">
                                Quantity: {item.quantity}
                            </small>
                        </div>
                    </div>
                ))}

                <hr />

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                    <div>
                        <small className="text-muted">
                            Total Amount
                        </small>
                        <h5 className="fw-bold text-success mb-0">
                            ₹{order.totalPrice}
                        </h5>
                    </div>

                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                            const confirmDelete = window.confirm(
                                "Are you sure you want to delete this order?"
                            );

                            if (confirmDelete) {
                                deleteOrder(order._id);
                            }
                        }}
                    >
                        Delete Order
                    </button>
                </div>
            </div>
        ))
    )}
</div>

        
        </div>
       
        </>
    );
}