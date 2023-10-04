import React, { FC, useRef, useState } from "react";
import Slider from "rc-slider";
import { Image } from "@react-pdf/renderer";
import useOnClickOutside from "../hooks/useOnClickOutside";
import compose from "../styles/compose";
import "rc-slider/assets/index.css";

interface Props {
  className?: string;
  placeholder?: string;
  value?: string;
  width?: number;
  onChangeImage?: (value: string) => void;
  onChangeWidth?: (value: number) => void;
  pdfMode?: boolean;
}

const EditableFileImage: FC<Props> = ({
  className,
  placeholder,
  value,
  width,
  onChangeImage,
  onChangeWidth,
  pdfMode,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const widthWrapper = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleClickOutside = () => {
    if (isEditing) {
      setIsEditing(false);
    }
  };

  useOnClickOutside(widthWrapper, handleClickOutside);

  const handleUpload = () => {
    fileInput?.current?.click();
  };

  const handleChangeImage = () => {
    if (fileInput?.current?.files) {
      const files = fileInput.current.files;

      if (files.length > 0 && typeof onChangeImage === "function") {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          if (typeof reader.result === "string") {
            onChangeImage(reader.result);
          }
        });

        reader.readAsDataURL(files[0]);
      }
    }
  };

  const clearImage = () => {
    if (typeof onChangeImage === "function") {
      onChangeImage("");
    }
  };

  if (pdfMode) {
    if (value) {
      return (
        <img
          style={{
            maxWidth: 250,
          }}
          src={value}
        />
      );
    } else {
      return <></>;
    }
  }

  return (
    <div
      className={`image flex justify-center items-center flex-col ${
        value ? "mb-2" : ""
      } ${className ? className : ""}`}
    >
      {!value ? (
        <button type="button" className="image__upload" onClick={handleUpload}>
          {placeholder}
        </button>
      ) : (
        <>
          <img
            src={value}
            className="image__img"
            alt={placeholder}
            style={{ maxWidth: width || 200 }}
          />

          <button
            type="button"
            className="text-right text-destructive underline p-2"
            onClick={clearImage}
          >
            Remove
          </button>
        </>
      )}

      <input
        ref={fileInput}
        tabIndex={-1}
        type="file"
        accept="image/*"
        className="image__file"
        onChange={handleChangeImage}
      />
    </div>
  );
};

export default EditableFileImage;
