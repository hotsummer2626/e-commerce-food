import Banners from "./components/Banners";
import Category from "./components/Category";
import Popular from "./components/Popular";
import Recommended from "./components/Recommended";

const Home = () => {
    return (
        <>
            <Banners />
            <Category />
            <Popular />
            <Recommended />
        </>
    );
};

export default Home;
