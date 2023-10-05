import { Invoice } from "./types";

export const initialInvoice: Invoice = {
  logo: "",
  companyName: "",
  companyAddress: "",
  companyAddress2: "",
  companyCountry: "India",
  clientName: "",
  discount: "",
  invoiceNumber: "INVOICE_0001",
  tax: "",
  clientAddress: "",
  clientCountry: "India",
  paid: false,
  invoiceDate: "",
  productLines: [
    {
      id: "1",
      name: "",
      qty: 1,
      price: 0,
    },
  ],
  term: "Please make the payment by the due date.",
  clientEmail: "",
  createdAt: "",
};
