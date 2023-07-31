import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Client from "@/components/Client";
import Home from "@/components/Client/components/Home";
import Menu from "@/components/Client/components/Menu";
import Profile from "@/components/Client/components/Profile";
import Favorite from "@/components/Client/components/Favorite";
import OrderHistory from "@/components/Client/components/OrderHistory";
import Admin from "@/components/Admin";
import Products from "@/components/Admin/components/Products";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Client />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    },
                    {
                        path: "/menu",
                        element: <Menu />,
                    },
                    {
                        path: "/profile",
                        element: <Profile />,
                    },
                    {
                        path: "/favorite",
                        element: <Favorite />,
                    },
                    {
                        path: "/orderHistory",
                        element: <OrderHistory />,
                    },
                ],
            },
            {
                path: "/admin",
                element: <Admin />,
                children: [
                    {
                        path: "/admin/products",
                        element: <Products />,
                    },
                ],
            },
        ],
    },
]);

export default router;
