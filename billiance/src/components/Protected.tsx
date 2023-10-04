import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";

export function Protected() {
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/auth/sign-in", {
        replace: true,
      });
    }
  });

  return <Outlet />;
}
