import { CSSProperties } from "react";

export interface ProductLine {
  name: string;
  qty: number;
  price: number;
  id: string;
}

export interface Invoice {
  invoiceNumber: string;

  logo: string;
  companyName: string;
  companyAddress: string;
  companyAddress2: string;
  companyCountry: string;

  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientCountry: string;

  invoiceDate: string;

  productLines: ProductLine[];
  tax: string;
  discount: string;
  paid: boolean;
  term: string;

  createdAt: string;
}

export type InvoiceServer = Invoice & {
  id: string;
};

export interface CSSClasses {
  [key: string]: CSSProperties;
}
