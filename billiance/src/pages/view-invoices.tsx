import InvoiceForm from "@/components/InvoiceForm";
import InvoiceView from "@/components/InvoiceView";
import { Button } from "@/components/ui/button";
import { initialInvoice } from "@/data/initialData";
import { Invoice } from "@/data/types";
import { useInvoiceQuery } from "@/hooks/queries/useInvoicesQuery";
import { FileText, Link, Mail, Printer, Table } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import SplashScreen from "./splash-screen";

function ViewInvoicePage() {
  const { id } = useParams();
  const { data: invoiceData } = useInvoiceQuery(id!);
  const [invoice, setInvoice] = useState<Invoice>({ ...initialInvoice });

  useEffect(() => {
    if (invoiceData) {
      setInvoice(invoiceData);
    }
  }, [invoiceData]);

  const saveCsv = (invoice: Invoice) => {
    const invoiceDate =
      invoice.invoiceDate !== "" ? new Date(invoice.invoiceDate) : new Date();

    const subtotal = invoice.productLines.reduce((prev, curr) => {
      if (curr.name.trim().length > 0)
        return prev + Number(curr.price * Math.floor(curr.qty));
      else return prev;
    }, 0);
    const taxRate = (parseFloat(invoice.tax || "0") * subtotal) / 100;
    const discountRate = (parseFloat(invoice.discount || "0") * subtotal) / 100;
    const total = subtotal - discountRate + taxRate;

    const csvLines = [
      `Invoice Number,"${invoice.invoiceNumber}"`,
      `Invoice Date,"${invoiceDate}"`,
      ``,
      `Company Name,"${invoice.companyName}"`,
      `Company Address,"${
        invoice.companyAddress +
        ", " +
        invoice.companyAddress2 +
        ", " +
        invoice.companyCountry
      }"`,
      ``,
      `Client Name,"${invoice.clientName}"`,
      `Client Email,"${invoice.clientEmail}"`,
      `Client Address,"${invoice.clientAddress}"`,
      ``,
      `Item ID,Name,Quantity,Price`,
      ...invoice.productLines.map(
        (item) => `"${item.id}","${item.name}","${item.qty}","${item.price}"`
      ),
      ``,
      `Subtotal,,,"${subtotal}"`,
      `Discount,,,"${invoice.discount}"`,
      `Tax,,,"${invoice.tax}"`,
      `Total,,,"${total}"`,
    ];

    window.open("data:text/csv;charset=utf-8," + csvLines.join("\n"));
  };

  if (!invoiceData) return <SplashScreen />;

  return (
    <div className="min-h-screen bg-gray-100">
      <a
        className="flex gap-1 items-center flex-row-reverse w-full justify-center py-6"
        href="/"
      >
        <h1 className="text-2xl font-semibold">Billiance</h1>
        <FileText />
      </a>
      <div className="flex items-center gap-3 justify-center flex-wrap pb-3 px-4">
        <Button
          onClick={() => {
            const doc = new jsPDF({
              compress: true,
            });
            const divToPrint = document.querySelector("#print-this");
            if (!divToPrint) return;
            doc.html(divToPrint as HTMLElement, {
              width: 200,
              windowWidth: 700,
              x: 5,
              callback: function (pdf) {
                pdf.save("invoice.pdf");
              },
            });
          }}
          variant="outline"
          className="flex items-center gap-2"
        >
          <FileText size={18} />
          <span>Download as PDF</span>
        </Button>
        <Button
          onClick={() => {
            try {
              document.execCommand("print", false, null as any);
            } catch {
              window.print();
            }
          }}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Printer size={18} />
          <span>Print</span>
        </Button>
        <Button
          onClick={() => {
            if (window.navigator.clipboard)
              navigator.clipboard.writeText(window.location.href);
          }}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Link size={18} />
          <span>Copy Link</span>
        </Button>
        <Button
          onClick={() => saveCsv(invoice)}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Table size={18} />
          <span>Download as CSV</span>
        </Button>
        <Button
          onClick={() => {
            window.open(
              "mailto:" +
                invoice.clientEmail +
                "?subject=Invoice " +
                invoice.invoiceNumber +
                "&body=" +
                "Hi " +
                invoice.clientName +
                ",\n\nPlease find the invoice attached. You can also view it by clicking on this link below:\n" +
                window.location.href +
                "\n\nRegards,\n" +
                invoice.companyName
            );
          }}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Mail size={18} />
          <span>Send as Email</span>
        </Button>
      </div>
      <div className="mx-auto max-w-5xl mt-3 pb-5 px-3" id="print-this">
        <InvoiceView pdfMode={true} invoice={invoice} setInvoice={setInvoice} />
      </div>
    </div>
  );
}

export default ViewInvoicePage;
