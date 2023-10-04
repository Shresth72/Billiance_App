import React, { FC, useState } from "react";
import { Text } from "@react-pdf/renderer";
import compose from "../styles/compose";

export interface SelectOption {
  value: string;
  text: string;
}

interface Props {
  className?: string;
  options?: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  pdfMode?: boolean;
}

const EditableSelect: FC<Props> = ({
  className,
  options,
  placeholder,
  value,
  onChange,
  pdfMode,
}) => {
  return (
    <>
      {pdfMode ? (
        <p className="py-1">
          {value}
        </p>
      ) : (
        <>
          <select
            className={"select " + (className ? className : "")}
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            autoFocus={false}
          >
            {options?.map((option) => (
              <option key={option.text} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </>
      )}
    </>
  );
};

export default EditableSelect;
