import InvoiceForm from "@/components/InvoiceForm";
import { initialInvoice } from "@/data/initialData";
import { Invoice } from "@/data/types";
import { useState } from "react";

function CreateInvoicePage() {
  const [invoice, setInvoice] = useState<Invoice>({ ...initialInvoice });
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl">
        <InvoiceForm
          pdfMode={false}
          invoice={invoice}
          setInvoice={setInvoice}
        />
      </div>
    </div>
  );
}

export default CreateInvoicePage;
