import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export default CartContext;

export function CartProvider({ children}) {
    const [cart, setCart] = useState([])

const [ wishlist, setWishlist] = useState([])

useEffect(() => {
    const fetchWishlist = async () => {
        try {
            const response = await fetch("https://major-project-one-backend-omega.vercel.app/api/wishlist");

            const result = await response.json();

            if (response.ok) {
                const wishlistBooks = result.data.wishlist.map((item) => ({
                    ...item.bookId,
                    wishlistId: item._id
                }));

                setWishlist(wishlistBooks);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    fetchWishlist();
}, []);

useEffect(() => {
    const fetchCart = async () => {
        try {
            const response = await fetch("https://major-project-one-backend-omega.vercel.app/api/cart");

            const result = await response.json();

            if (response.ok) {
                const cartBooks = result.data.cart.map((item) => ({
                    ...item.bookId,
                    cartId: item._id,
                    quantity: item.quantity
                }));

                setCart(cartBooks);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    fetchCart();
}, []);

 
const addToCart = async (book, quantity = 1) => {
    try {
        const existingBook = cart.find(
            (item) => item._id === book._id
        );

        // If book already exists, update its quantity
        if (existingBook) {
            const newQuantity = (existingBook.quantity || 1) + quantity;

            const response = await fetch(
                `https://major-project-one-backend-omega.vercel.app/api/cart/${existingBook.cartId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        quantity: newQuantity
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update cart.");
            }

            setCart((previousCart) =>
                previousCart.map((item) =>
                    item.cartId === existingBook.cartId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );

            return;
        }

        // If book is new, add it to MongoDB
        const response = await fetch("https://major-project-one-backend-omega.vercel.app/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bookId: book._id,
                quantity: quantity
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to add book to cart.");
        }

        setCart((previousCart) => [
            ...previousCart,
            {
                ...book,
                cartId: result.data.cart._id,
                quantity: result.data.cart.quantity
            }
        ]);

    } catch (error) {
        console.error("Error adding book to cart:", error);
        throw error;
    }
};


    const addToWishlist = async (book) => {
    try {
        const alreadyExists = wishlist.some(
            (item) => item._id === book._id || item.id === book.id
        );

        if (alreadyExists) {
            return;
        }

        const response = await fetch("https://major-project-one-backend-omega.vercel.app/api/wishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bookId: book._id
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to add book to wishlist.");
        }

        setWishlist((previousWishlist) => [
            ...previousWishlist,
            {
                ...book,
                wishlistId: result.data.Wishlist._id
            }
        ]);

    } catch (error) {
        console.error("Error adding to wishlist:", error);
        throw error;
    }
};


const updateQuantity = async (cartId, change) => {
    try {
        const cartItem = cart.find(
            (book) => book.cartId === cartId
        );

        if (!cartItem) return;

        const newQuantity = cartItem.quantity + change;

        if (newQuantity < 1) return;

        const response = await fetch(
            `https://major-project-one-backend-omega.vercel.app/api/cart/${cartId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    quantity: newQuantity
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to update quantity.");
        }

        setCart((previousCart) =>
            previousCart.map((book) =>
                book.cartId === cartId
                    ? { ...book, quantity: newQuantity }
                    : book
            )
        );

    } catch (error) {
        console.error("Error updating cart quantity:", error);
    }
};


    
const removeFromCart = async (cartId) => {
    try {
        const response = await fetch(
            `https://major-project-one-backend-omega.vercel.app/api/cart/${cartId}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to remove cart item.");
        }

        setCart((previousCart) =>
            previousCart.filter((book) => book.cartId !== cartId)
        );

    } catch (error) {
        console.error("Error removing cart item:", error);
        throw error;
    }
};


const removeFromWishlist = async (wishlistId) => {
    try {
        const response = await fetch(
            `https://major-project-one-backend-omega.vercel.app/api/wishlist/${wishlistId}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to remove wishlist item.");
        }

        setWishlist((previousWishlist) =>
            previousWishlist.filter(
                (book) => book.wishlistId !== wishlistId
            )
        );

    } catch (error) {
        console.error("Error removing wishlist item:", error);
        throw error;
    }
};
    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, updateQuantity, removeFromCart, wishlist, setWishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </CartContext.Provider>
    )
}

