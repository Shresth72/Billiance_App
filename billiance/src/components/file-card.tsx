import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { InvoiceServer } from "@/data/types";
import useLongPress from "@/hooks/onLongPress";
import { cn } from "@/lib/utils";
import { useBarStore } from "@/state/bar-state";
import { FileText, MoreVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FileCardProps {
  invoice?: InvoiceServer;
  layout: "grid" | "list";
}

export default function FileCard({ invoice, layout }: FileCardProps) {
  const [selected, setSelected] = useState(false);
  const { addSelected } = useBarStore();
  // const onLongPress = () => {
  //   setSelected(true);
  //   addSelected("");
  // };

  const navigate = useNavigate();

  const onClick = () => {
    // if (selected) {
    //   setSelected(false);
    // }
    navigate(`/invoice/${invoice?.id}`);
  };

  // const longPressEvent = useLongPress({
  //   onLongPress,
  //   onClick,
  // });

  return (
    <Card
      key={invoice?.id}
      onClick={onClick}
      className={cn(
        "cursor-pointer bg-black shadow-sm transition-all ease duration-200 text-white hover:bg-black/90 select-none",
        selected ? "bg-blue-100 bg-opacity-40 hover:bg-blue-100" : "",
        layout === "grid" ? "" : "w-full flex"
      )}
    >
      <CardHeader
        className={`flex items-center justify-center border-b ${
          layout === "grid" ? "" : ""
        }`}
      >
        <img
          alt="logo"
          className={`${layout === "grid" ? "" : "w-20"}`}
          src={invoice?.logo}
        />
      </CardHeader>
      <CardContent
        className={`px-3 pb-2 w-full pr-5 flex justify-between rounded-md rounded-t-none items-center `}
      >
        <div>
          <p className="text-base mt-2 font-semibold drop-shadow-md">
            {invoice?.invoiceNumber || "#123"}
          </p>
          <small className="text-sm text-white/70 drop-shadow-md">
            {getTimeSinceCreated(
              invoice?.createdAt || new Date().toUTCString()
            )}
          </small>
        </div>
        {/* <MoreVertical size={18} className="text-gray-500" /> */}
        <div className="flex justify-center items-center">
          {/* <span className="text-6xl">•</span> */}
          <span className="translate-y-1">
            {invoice?.paid ? "Paid" : "Unpaid"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function EmptyFileCard() {
  return (
    <Card
      className={cn(
        "cursor-pointer shadow-sm transition-all ease duration-200 hover:bg-gray-100 hover:bg-opacity-60 select-none"
      )}
    >
      <CardContent className="px-4 py-5">
        No invoices yet. Click the button below to create one.
      </CardContent>
    </Card>
  );
}
function getTimeSinceCreated(updatedAt: string) {
  const updated = new Date(updatedAt);
  const now = new Date();
  const timeDiff = now.getTime() - updated.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  }
}
