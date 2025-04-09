import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Layout from "./pages/Layout";
import SearchJobs from "./pages/SearchJob";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Favorites from "./pages/Favorites";
import FavoritesProvider from "./context/FavoritesProvider";

function App() {
  const token = localStorage.getItem("userToken");
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<SearchJobs />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route
              path="/favourites"
              element={token ? <Favorites /> : <Home />}
            />
          </Route>
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
