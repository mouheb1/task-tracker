// -- ./src/template/ui/file-uploader-single.tsx

import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Icon } from '@iconify/react';
import { Button } from "./button";

interface FileUploaderSingleProps {
  onFileSelect: (file: File | null) => void;
  existingFileUrl?: string;
  disabled?: boolean;
  className?: string; // Allow passing custom levels
}

const FileUploaderSingle: React.FC<FileUploaderSingleProps> = ({
  onFileSelect,
  existingFileUrl,
  disabled = false,
  className = "", // Default to empty string
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFiles([file]);
        onFileSelect(file);
      }
    },
    disabled,
  });

  useEffect(() => {
    // Cleanup the object URL to avoid memory leaks
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.name));
    };
  }, [files]);

  const handleRemove = () => {
    setFiles([]);
    onFileSelect(null);
  };

  const img = files.map((file) => (
    <img
      key={file.name}
      alt={file.name}
      className="w-full h-full object-cover rounded-md"
      src={URL.createObjectURL(file)}
    />
  ));

  return (
    <div className={className}>
      {files.length || existingFileUrl ? (
        <div className="w-full h-full relative">
          <Button
            type="button"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-default-900 hover:bg-background hover:text-default-900 z-20"
            onClick={handleRemove}
            disabled={disabled}
          >
            <span className="text-xl"><Icon icon="fa6-solid:xmark" /></span>
          </Button>
          {files.length ? img : (
            <img
              alt="Avatar"
              className="w-full h-full object-cover rounded-md"
              src={existingFileUrl}
            />
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone h-full" })}>
          <input {...getInputProps()} />

          <div className="w-full h-full text-center border-dashed border rounded-md py-4 flex items-center flex-col justify-center">
            <div className="h-12 w-12 inline-flex rounded-md bg-muted items-center justify-center mb-3">
              <Upload className="text-default-500" />
            </div>
            <h4 className="text-base font-medium mb-1 text-card-foreground/80">
              Drop files here or click to upload.
            </h4>
            <div className="text-xs text-muted-foreground">
              (Select an image file to upload your avatar.)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploaderSingle;
