import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export default CartContext;

export function CartProvider({ children}) {
    const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
});

const [ wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
});

useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);

    const addToCart = (book) => {
        setCart([...cart, book]);
    };

    const addToWishlist = (book) => {
    setWishlist((previousWishlist) => {
        const alreadyExists = previousWishlist.some(
            (item) => item.id === book.id
        );

        if (alreadyExists) {
            return previousWishlist;
        }

        return [...previousWishlist, book];
    });
};

    const removeFromCart = (indexToRemove) => {
    setCart((previousCart) =>
        previousCart.filter((book, index) => index !== indexToRemove)
    );
};

const removeFromWishlist = (indexToRemove) => {
    setWishlist((previousWishlist) =>
        previousWishlist.filter((book, index) => index !== indexToRemove)
    );
}
    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, wishlist, setWishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </CartContext.Provider>
    )
}

