import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/components/Home";
import Menu from "@/components/Menu";

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
        ],
    },
]);

export default router;
