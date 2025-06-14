import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import SignUp from "./components/SignUp";
import CreateProduct from "./pages/CreateProduct";
import ProtectedRoute from "./components/util/ProtectedRoute";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

function App() {
   const {user , isAuthenticated}  = useSelector((state : RootState)=>state.auth)
  return (
    <div>
         <Routes>
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute
            element={<Home />}
            isAuthenticated={isAuthenticated}
            user={user}
          />
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute
            element={<CreateProduct />}
            isAuthenticated={isAuthenticated}
            user={user}
          />
        }
      />

      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <ProtectedRoute
            element={<SignIn />}
            isAuthenticated={isAuthenticated}
            user={user}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute
            element={<SignUp />}
            isAuthenticated={isAuthenticated}
            user={user}
          />
        }
      />
    </Routes>
    </div>
  );
}

export default App;
