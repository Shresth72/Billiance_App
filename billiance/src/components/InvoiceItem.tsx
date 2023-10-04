import React from "react";
import InvoiceField from "./InvoiceField";
import { IndianRupee } from "lucide-react";
import { Button } from "./ui/button";

const InvoiceItem = ({
  id,
  name,
  qty,
  price,
  onDeleteItem,
  onEdtiItem,
  pdfMode,
}: {
  id: string;
  name: string;
  qty: number;
  price: number;
  onDeleteItem: (id: string) => void;
  onEdtiItem: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pdfMode?: boolean;
}) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <tr>
      <td className="w-full">
        {pdfMode ? (
          <p>{name}</p>
        ) : (
          <InvoiceField
            onEditItem={(event) => onEdtiItem(event)}
            cellData={{
              placeholder: "Item name",
              type: "text",
              name: "name",
              id: id,
              value: name,
            }}
          />
        )}
      </td>
      <td className="min-w-[65px] md:min-w-[80px]">
        {pdfMode ? (
          <p>{qty}</p>
        ) : (
          <InvoiceField
            onEditItem={(event) => onEdtiItem(event)}
            cellData={{
              type: "number",
              min: "1",
              name: "qty",
              id: id,
              value: qty,
            }}
          />
        )}
      </td>
      <td className="relative min-w-[100px] md:min-w-[150px]">
        {pdfMode ? (
          <p className="text-center">Rs.&nbsp;{price.toFixed(2)}</p>
        ) : (
          <>
            <IndianRupee
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 sm:left-4"
              size={18}
            />
            <InvoiceField
              onEditItem={(event) => onEdtiItem(event)}
              cellData={{
                className: "text-right",
                type: "number",
                min: "0.01",
                step: "0.01",
                name: "price",
                id: id,
                value: price,
              }}
            />
          </>
        )}
      </td>
      {!pdfMode && (
        <td className="flex items-center justify-center">
          <Button
            className="p-2"
            variant="destructive"
            onClick={deleteItemHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </td>
      )}
      {pdfMode && (
        <td className="flex items-center justify-center">
          Rs.&nbsp;{(price * qty).toFixed(2)}
        </td>
      )}
    </tr>
  );
};

export default InvoiceItem;
