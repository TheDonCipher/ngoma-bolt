'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  disabled?: boolean;
  multiple?: boolean;
}

export function ImageUpload({
  value = '',
  onChange,
  disabled,
  multiple = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | string[] | null>(
    value || (multiple ? [] : null)
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (multiple) {
      // Handle multiple images
      const fileArray = Array.from(files);
      const readers = fileArray.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((results) => {
        setPreview(results);
        onChange(results);
      });
    } else {
      // Handle single image
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (index?: number) => {
    if (multiple && Array.isArray(preview) && index !== undefined) {
      const newPreview = [...preview];
      newPreview.splice(index, 1);
      setPreview(newPreview);
      onChange(newPreview);
    } else {
      setPreview(null);
      onChange('');
    }
  };

  return (
    <div className="space-y-2">
      {preview ? (
        multiple && Array.isArray(preview) ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {preview.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-md"
              >
                <img
                  src={img}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemove(index)}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors aspect-square">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple={multiple}
                onChange={handleFileChange}
                disabled={disabled}
              />
            </label>
          </div>
        ) : (
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-md">
            <img
              src={preview as string}
              alt="Preview"
              className="object-cover w-full h-full"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => handleRemove()}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click to upload {multiple ? 'images' : 'image'}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileChange}
            disabled={disabled}
          />
        </label>
      )}
    </div>
  );
}
