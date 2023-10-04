import { Outlet } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import vector from "../assets/vector.png";

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname.split("/auth/")[1]);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/", {
        replace: true,
      });
    }
  });
  return (
    <main className="flex flex-col text-textDark items-start w-full sm:w-[350px] mx-auto justify-end md:justify-center min-h-[100vh] pb-10 px-10 bg-green sm:bg-white">
      <div className="absolute top-0 z-0 sm:hidden">
        <img src={vector} alt="bg-vector" />
      </div>
      <div className="flex gap-2 items-start flex-row-reverse -translate-x-[2px]">
        <h1 className="text-6xl font-semibold">Billiance</h1>
      </div>
      <p className="text-xl">Make Invoices briiliantly!</p>
      <Tabs
        defaultValue={location.pathname.split("/auth/")[1] || "sign-in"}
        className="w-full mt-4 z-10"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="sign-in"
            onClick={() => {
              navigate("/auth/sign-in");
            }}
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            onClick={() => {
              navigate("/auth/sign-up");
            }}
            value="sign-up"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="w-full">
        <Outlet />
      </div>
      <div className="flex w-full justify-center items-center mt-5 opacity-40 font-medium">
        by Backdoor Innovators
      </div>
    </main>
  );
}
