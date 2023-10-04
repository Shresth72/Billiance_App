import React, { FC } from "react";
import { Text } from "@react-pdf/renderer";
import compose from "../styles/compose";

interface Props {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  pdfMode?: boolean;
}

const EditableInput: FC<Props> = ({
  className,
  placeholder,
  value,
  onChange,
  pdfMode,
}) => {
  return (
    <>
      {pdfMode ? (
        value ? (
          <p className="py-1 break-all">{value}</p>
        ) : (
          <></>
        )
      ) : (
        <input
          required
          type="text"
          className={"input " + (className ? className : "")}
          placeholder={placeholder || ""}
          value={value || ""}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      )}
    </>
  );
};

export default EditableInput;
