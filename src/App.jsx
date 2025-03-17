import { RouterProvider } from "react-router-dom";
import Router from "./router/app_router.jsx";
import "./App.css";

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
