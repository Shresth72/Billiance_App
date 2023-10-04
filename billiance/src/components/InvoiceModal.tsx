import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { Invoice } from "@/data/types";
import InvoiceView from "./InvoiceView";
import { UploadCloud } from "lucide-react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { uploadInvoice } from "@/firebase/invoice";
import { useNavigate } from "react-router-dom";
export const Icons = {
  spinner: Loader2,
};

const InvoiceModal = ({
  isOpen,
  setIsOpen,
  invoice,
  setInvoice,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
  invoice: Invoice;
  onSubmit?: () => void;
}) => {
  function closeModal() {
    setIsOpen(false);
  }
  const navigate = useNavigate();
  const submitHandler = async () => {
    // setIsOpen(false);
    setLoading(true);
    try {
      await uploadInvoice(invoice);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(
        "Image size is too large, please try again with a smaller image (< 1MB)"
      );
    }
  };

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById("print");
    if (!dom) {
      console.error("oops, something went wrong!");
      return;
    }
    toPng(dom)
      .then((dataUrl: string) => {
        const img = new Image();
        img.crossOrigin = "annoymous";
        img.src = dataUrl;
        img.onload = () => {
          // Initialize the PDF.
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: [5.5, 8.5],
          });

          // Define reused data
          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          // Calculate the number of pages.
          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          // Define pageHeight separately so it can be trimmed on the final page.
          let pageHeight = pdf.internal.pageSize.getHeight();

          // Create a one-page canvas to split up the full image.
          const pageCanvas = document.createElement("canvas");
          const pageCtx = pageCanvas.getContext("2d");
          if (!pageCtx) {
            console.error("oops, something went wrong!");
            return;
          }
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            // Display the page.
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = "white";
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.
            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          // Output / Save
          pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
        };
      })
      .catch((error: any) => {
        console.error("oops, something went wrong!", error);
      });
  };

  const [loading, setLoading] = useState(false);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="h-[calc(100vh-30px)] py-2 inline-block w-full max-w-full sm:max-w-[90%] lg:max-w-[900px] transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div
                id="print"
                className="p-1 overflow-scroll h-[calc(100%-70px)]"
              >
                <InvoiceView
                  pdfMode={true}
                  invoice={invoice}
                  setInvoice={setInvoice}
                  key="view-invoice"
                />
              </div>
              <div className="flex space-x-2 px-4 pb-4 border-t pt-4">
                {/* <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white"
                  onClick={SaveAsPDFHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download</span>
                </button> */}
                <Button
                  onClick={submitHandler}
                  className="w-full flex gap-2 text-sm"
                >
                  {loading ? (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <UploadCloud />
                      <span>Save to cloud</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InvoiceModal;
