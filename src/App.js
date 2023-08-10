import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser, toggleLoading } from "./features/auth/authSlice";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  console.log(user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // dispatch(setUser(user.email));
        dispatch(getUser(user.email));
      } else {
        // console.log("Loading false");
        dispatch(toggleLoading());
      }
    });
  }, []);

  return (
    <>
      <Toaster />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
