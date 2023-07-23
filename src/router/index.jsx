import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/components/Home";
import Menu from "@/components/Menu";
import Profile from "@/components/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
        ],
    },
]);

export default router;
