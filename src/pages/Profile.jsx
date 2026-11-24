import { toast } from "react-toastify";
import React, { useState} from "react"


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

const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
});

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