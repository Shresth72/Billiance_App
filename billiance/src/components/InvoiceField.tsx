import { cn } from "@/lib/utils";
import React from "react";

type CellData = {
  className?: string;
  type?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
  name: string;
  id: string;
  value: any;
};

const InvoiceField = ({
  onEditItem,
  cellData,
}: {
  onEditItem: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cellData: CellData;
}) => {
  return (
    <input
      className={cn(cellData.className, "p-2")}
      type={cellData.type}
      placeholder={cellData.placeholder}
      min={cellData.min}
      max={cellData.max}
      step={cellData.step}
      name={cellData.name}
      id={cellData.id}
      value={cellData.value}
      onChange={onEditItem}
      required
    />
  );
};

export default InvoiceField;
