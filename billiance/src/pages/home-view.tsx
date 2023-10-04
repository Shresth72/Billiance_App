import { signOut } from "@/firebase/auth";
import { useInvoicesQuery } from "@/hooks/queries/useInvoicesQuery";
import { useUserQuery } from "@/hooks/queries/useUserQuery";
import {
  Download,
  LayoutGrid,
  LayoutList,
  Link,
  LogOut,
  Mail,
  MoreVertical,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import SplashScreen from "./splash-screen";
import FileCard from "@/components/file-card";
import { useBarStore } from "@/state/bar-state";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const { data: invoicesData } = useInvoicesQuery();
  const { data: userData } = useUserQuery();
  const { clearSelected, selected } = useBarStore();
  const navigate = useNavigate();
  if (!userData || !invoicesData) {
    return <SplashScreen />;
  }

  return (
    <main className="relative h-[100vh] flex flex-col px-0 sm:px-8 lg:px-16 bg-bgLight">
      <header className="flex items-center justify-end px-6 pt-5 text-2xl">
        
        <button title="sign-out" onClick={signOut} className="text-lg bg-green px-3 py-1 rounded-md">
          Logout
        </button>
      </header>
      <div className="px-6 mt-4 flex-1 overflow-hidden flex flex-col">
        <div className="text-5xl font-medium w-full border-b pb-2 flex justify-between items-center">
          Invoices
          {layout === "grid" ? (
            <LayoutGrid
              size={22}
              className="opacity-70"
              onClick={() => setLayout("list")}
            />
          ) : (
            <LayoutList
              size={22}
              className="opacity-70"
              onClick={() => setLayout("grid")}
            />
          )}
        </div>
        {selected.length > 0 ? (
          <div className="w-full rounded-full px-4 py-1 flex items-center gap-4 bg-blue-50 mt-2">
            <div className="flex gap-2 items-center">
              <div className="cursor-pointer hover:bg-gray-200 p-1 rounded-full transition-all ease">
                <X size={18} onClick={clearSelected} />
              </div>
              <p className="cursor-default">{selected.length} selected</p>
            </div>
            <div className="flex items-center text-xs gap-1">
              <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-all ease">
                <Download size={18} />
              </div>
              <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-all ease">
                <Trash2 size={18} />
              </div>
              <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-all ease">
                <Mail size={18} />
              </div>
              <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-all ease">
                <Link size={18} />
              </div>
              <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-all ease">
                <MoreVertical size={18} />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <Tabs
          defaultValue="all"
          className="w-full mt-4 z-10 rounded-lg"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="p-1 rounded-md">
              All
            </TabsTrigger>
            <TabsTrigger value="paid" className="p-1 rounded-md">
              Paid
            </TabsTrigger>
            <TabsTrigger value="unpaid" className="p-1 rounded-md">
              Unpaid
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {invoicesData?.length > 0 ? (
          <div
            className={`${
              layout === "grid" ? "grid" : "flex flex-col"
            } grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pt-4 gap-5 overflow-scroll pb-4`}
          >
            {invoicesData
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((invoice) => (
                <FileCard key={invoice.id} invoice={invoice} layout={layout} />
              ))}
          </div>
        ) : (
          <div className="w-full text-center text-gray-800 py-4 font-medium">
            <p>No invoices yet. Click the button below to create one.</p>
          </div>
        )}
        <div
          onClick={() => navigate("/invoice/new")}
          className="absolute bg-textDark bottom-6 text-white right-4 sm:right-8 lg:right-16 text-3xl p-3 rounded-full cursor-pointer hover:rotate-180 transition-all ease duration-300"
        >
          <Plus size={32} />
        </div>
      </div>
    </main>
  );
}
