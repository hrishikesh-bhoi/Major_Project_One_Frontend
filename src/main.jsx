import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from './pages/Home';
import Books from './pages/Books';
import Cart from './pages/Cart';
import { CartProvider } from './contexts/CartContext.jsx';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import BookDetails from './pages/BookDetails';
import Wishlist from './pages/Wishlist';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <App />,
  }, 
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/order-success",
    element: <OrderSuccess />,
  }, 
  {
    path: "/books/:bookId",
    element: <BookDetails />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
