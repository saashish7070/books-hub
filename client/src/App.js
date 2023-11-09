import './App.css';
import React from 'react'
import AdminPage from './Components/admin/AdminPage'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import "./index.css";
import Header from './Components/header/Header';
import Footer from './Components/footer/Footer';
import Homepage from './Components/homepage/Homepage';
import { AuthContextProvider } from './firebase/auth';
import Profile from './Components/profile/Profile'
import SellMyItem from './Components/sellItem/SellMyItem';
import ItemList from './Components/wishlist/ItemList';
// import BookStore from './Components/store/BookStore';
// import AddStore from './Components/store/AddStore';
// import BookStoreManager from './Components/store/BookStoreManager';
// import ListOfStore from './Components/store/ListOfStore';
import ItemStatus from './Components/profile/ItemStatus';
import Billing from './Components/wishlist/Billing';
import Wishlist from './Components/wishlist/Wishlist';
import { ComingSoon } from './Components/store/ComingSoon';

const Layout = () =>{
  return(
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
const homeRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children : [
    {
      path: "/",
      element: <Homepage />,
    },{
      path: '/admin-aashish',
      element: <AdminPage />
    },{
      path: '/wishlist',
      element: <Wishlist />
    },
    {
      path: '/profile',
      element: <Profile />
    },{
      path: '/sellItem',
      element: <SellMyItem />
    },{
      path: '/itemList',
      element: <ItemList />
    },{
      path: '/itemStatus',
      element: <ItemStatus />
    },{
      path: '/billing',
      element: <Billing />
    },{
      path: '/coming-soon',
      element: <ComingSoon />
    }
    // {
    //   path: '/shop',
    //   element: <BookStore />
    // },{
    //   path: '/shop/addStore',
    //   element: <AddStore />
    // },{
    //   path: '/shop/manage/:id',
    //   element: <BookStoreManager />
    // },{
    //   path: '/shop/manageStore',
    //   element: <ListOfStore />
    // }
  ]}
]);


function App() {
  return (
    <div className="App">
      <>
          <AuthContextProvider>
            <RouterProvider router={homeRouter} />
          </AuthContextProvider>
      </>
    </div>
  );
}

export default App;

