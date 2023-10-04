import { fetchInvoice, fetchInvoices } from "@/firebase/invoice";
import { useQuery } from "@tanstack/react-query";

export function useInvoicesQuery() {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      return await fetchInvoices();
    },
  });
}

export function useInvoiceQuery(invoiceId: string) {
  return useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: async () => {
      return await fetchInvoice(invoiceId);
    },
  });
}
