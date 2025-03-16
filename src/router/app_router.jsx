import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/homepage/home.jsx";
import Quran from "../pages/quranpage/quran.jsx";

const Router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/quranpage/:nomorSurah",
            element: <Quran />,
        },
    ]
);

export default Router