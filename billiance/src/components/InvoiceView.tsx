import EditableCalendarInput from "./EditableCalendarInput";
import format from "date-fns/format";
import InvoiceItem from "./InvoiceItem";
import EditableFileImage from "./EditableFileImage";
import EditableInput from "./EditableInput";
import countryList from "@/data/countryList";
import EditableSelect from "./EditableSelect";
import EditableTextarea from "./EditableTextarea";
import { cn } from "@/lib/utils";
import { Invoice, ProductLine } from "@/data/types";
import { uid } from "uid";
import { Button } from "./ui/button";
const dateFormat = "MMM dd, yyyy";

export default function InvoiceView({
  invoice,
  setInvoice,
  pdfMode,
}: {
  invoice: Invoice;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
  pdfMode?: boolean;
}) {
  const addItemHandler = () => {
    const id = uid(6);
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      productLines: [
        ...prevInvoice.productLines,
        { id, name: "", qty: 1, price: 0 },
      ],
    }));
  };

  const deleteItemHandler = (id: string) => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      productLines: prevInvoice.productLines.filter((item) => item.id !== id),
    }));
  };

  const edtiItemHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value as any,
    };

    if (editedItem.name === "qty" || editedItem.name === "price") {
      editedItem.value = Number(editedItem.value);
    }

    const newItems = invoice.productLines.map((item) => {
      if (item.id === editedItem.id) {
        return {
          ...item,
          [editedItem.name]: editedItem.value,
        };
      }
      return item;
    });

    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      productLines: newItems,
    }));
  };

  const invoiceDate =
    invoice.invoiceDate !== "" ? new Date(invoice.invoiceDate) : new Date();

  const subtotal = invoice.productLines.reduce(
    (prev: number, curr: ProductLine) => {
      if (curr.name.trim().length > 0)
        return prev + Number(curr.price * Math.floor(curr.qty));
      else return prev;
    },
    0
  );
  const taxRate = (parseFloat(invoice.tax || "0") * subtotal) / 100;
  const discountRate = (parseFloat(invoice.discount || "0") * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  return (
    <div className="space-y-2 w-full bg-white sm:space-y-4 p-3 md:p-5 rounded-md relative">
      <div className="flex flex-col justify-between space-y-2 gap-x-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
        <div className="flex gap-3 flex-wrap">
          <div className="flex space-x-2 items-center">
            <span className="font-bold whitespace-nowrap">Invoice Date:</span>
            <EditableCalendarInput
              value={format(invoiceDate, dateFormat)}
              selected={invoiceDate}
              className="p-2"
              onChange={(date) => {
                if (date && !Array.isArray(date))
                  setInvoice((prevInvoice) => ({
                    ...prevInvoice,
                    invoiceDate: date
                      ? format(date, dateFormat)
                      : prevInvoice.invoiceDate,
                  }));
              }}
              pdfMode={pdfMode}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label
            className="font-bold whitespace-nowrap"
            htmlFor="invoiceNumber"
          >
            Invoice Number:
          </label>
          <EditableInput
            placeholder="INV-123"
            className="p-2 px-3 max-w-[180px]"
            value={invoice.invoiceNumber}
            onChange={(value) => {
              setInvoice((prevInvoice) => ({
                ...prevInvoice,
                invoiceNumber: value,
              }));
            }}
            pdfMode={pdfMode}
          />
        </div>

        <div
          className={`border-2 px-3 py-1 rounded-lg w-min flex justify-center items-center ${
            invoice.paid
              ? " border-emerald-500 text-emerald-500"
              : "border-red-500 text-red-500"
          }`}
        >
          {invoice.paid ? "Paid" : "Unpaid"}
        </div>
      </div>
      <h1 className="text-center text-lg font-bold">INVOICE</h1>
      <div className="flex justify-between flex-wrap gap-y-4">
        <div className={cn("flex flex-col gap-1", pdfMode ? "gap-0" : "")}>
          <EditableInput
            placeholder="Your Name"
            className="bg-gray-50 p-2 px-3"
            value={invoice.companyName}
            onChange={(value) => {
              setInvoice((prevInvoice) => ({
                ...prevInvoice,
                companyName: value,
              }));
            }}
            pdfMode={pdfMode}
          />
          <EditableInput
            placeholder="Your Address"
            className="bg-gray-50 p-2 px-3"
            value={invoice.companyAddress}
            onChange={(value) => {
              setInvoice((prevInvoice) => ({
                ...prevInvoice,
                companyAddress: value,
              }));
            }}
            pdfMode={pdfMode}
          />
          <EditableInput
            placeholder="City, State & Zip"
            className="bg-gray-50 p-2 px-3"
            value={invoice.companyAddress2}
            onChange={(value) => {
              setInvoice((prevInvoice) => ({
                ...prevInvoice,
                companyAddress2: value,
              }));
            }}
            pdfMode={pdfMode}
          />
          <EditableSelect
            options={countryList}
            className="bg-gray-50 p-2 px-3 w-full"
            value={invoice.companyCountry}
            onChange={(value) => {
              setInvoice((prevInvoice) => ({
                ...prevInvoice,
                companyCountry: value,
              }));
            }}
            pdfMode={pdfMode}
          />
        </div>
        <EditableFileImage
          className="logo"
          placeholder="Company Logo"
          value={invoice.logo}
          pdfMode={pdfMode}
          onChangeImage={(value) => {
            setInvoice((prevInvoice) => ({
              ...prevInvoice,
              logo: value,
            }));
          }}
        />
      </div>

      <div className="pt-5 pb-4">
        <p className="text-sm font-bold md:text-base w-full border-b pb-2">
          Customer:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 pt-2">
          <EditableInput
            placeholder="Customer Name"
            className="flex-1 p-2"
            value={invoice.clientName}
            onChange={(value) => {
              setInvoice((prevInvoice) => ({
                ...prevInvoice,
                clientName: value,
              }));
            }}
            pdfMode={pdfMode}
          />
          <EditableInput
            placeholder="Customer Email"
            className="flex-1 p-2"
            value={invoice.clientEmail}
            onChange={(value) => {
              setInvoice((prevInvoice) => ({
                ...prevInvoice,
                clientEmail: value,
              }));
            }}
            pdfMode={pdfMode}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 sm:pt-2">
          <EditableInput
            placeholder="Customer Address"
            className="flex-1 p-2"
            value={invoice.clientAddress}
            onChange={(value) => {
              setInvoice((prevInvoice) => ({
                ...prevInvoice,
                clientAddress: value,
              }));
            }}
            pdfMode={pdfMode}
          />
          <EditableSelect
            options={countryList}
            className="p-2 px-3 w-full"
            value={invoice.clientCountry}
            onChange={(country) => {
              setInvoice((prevInvoice) => ({
                ...prevInvoice,
                clientCountry: country,
              }));
            }}
            pdfMode={pdfMode}
          />
        </div>
      </div>
      <table className="w-full p-4 text-left">
        <thead>
          <tr className="border-b border-gray-900/10 text-sm md:text-base">
            <th>Item</th>
            <th>Qty</th>
            <th className="text-center">Price</th>
            {!pdfMode && <th className="text-center">Action</th>}
            {pdfMode && <th className="text-center">Amount</th>}
          </tr>
        </thead>
        <tbody>
          {invoice.productLines.map((item) => (
            <InvoiceItem
              key={item.id}
              id={item.id}
              name={item.name}
              qty={item.qty}
              price={item.price}
              onDeleteItem={deleteItemHandler}
              onEdtiItem={edtiItemHandler}
              pdfMode={pdfMode}
            />
          ))}
        </tbody>
      </table>
      {!pdfMode && (
        <Button type="button" onClick={addItemHandler}>
          Add Item
        </Button>
      )}
      <div className="flex flex-col items-end space-y-2 pt-6">
        <div className="flex w-full justify-between md:w-1/2">
          <span className="font-bold">Subtotal:</span>
          <span>Rs.&nbsp;{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex w-full justify-between md:w-1/2">
          <span className="font-bold">Discount:</span>
          <span>
            ({invoice.discount || "0"}&nbsp;%)&nbsp;Rs.&nbsp;
            {discountRate.toFixed(2)}
          </span>
        </div>
        <div className="flex w-full justify-between md:w-1/2">
          <span className="font-bold">Tax:</span>
          <span>
            ({invoice.tax || "0"}&nbsp;%)&nbsp;Rs.&nbsp;
            {taxRate.toFixed(2)}
          </span>
        </div>
        <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
          <span className="font-bold">Total:</span>
          <span className="font-bold">
            Rs.&nbsp;{total % 1 === 0 ? total : total.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="pt-2">
        <p className="text-sm font-bold md:text-base">Terms and Conditions:</p>
        <div className={cn(pdfMode ? "mt-1" : "")}>
          <EditableTextarea
            className="p-2 mt-2 w-full"
            rows={2}
            value={invoice.term}
            onChange={(value) => {
              setInvoice((prevInvoice) => ({
                ...prevInvoice,
                term: value,
              }));
            }}
            pdfMode={pdfMode}
          />
        </div>
      </div>
    </div>
  );
}
