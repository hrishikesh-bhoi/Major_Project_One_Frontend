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

   const addToCart = (book, quantity = 1) => {
    setCart((previousCart) => {
        const existingBook = previousCart.find(
            (item) => item.id === book.id
        );

        if (existingBook) {
            return previousCart.map((item) =>
                item.title === book.title
                    ? { ...item, quantity: (item.quantity || 1) + quantity }
                    : item
            );
        }

        return [...previousCart, { ...book, quantity}];
    });
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

const updateQuantity = (bookId, change) => {
    setCart((previousCart) => 
    previousCart.map((book) => book.id === bookId ? {
        ...book,
        quantity: Math.max(1, (book.quantity || 1) + change)
    }
: book
)
);
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
        <CartContext.Provider value={{ cart, setCart, addToCart, updateQuantity, removeFromCart, wishlist, setWishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </CartContext.Provider>
    )
}

