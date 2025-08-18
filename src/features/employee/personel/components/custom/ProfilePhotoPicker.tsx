import Image from "next/image";
import { useEffect, useState } from "react";

export interface ProfilePhotoProps {
  defaultPhotoUrl?: string; // URL olarak gelir
  onChange: (file: File) => void;
}

export default function ProfilePhotoPicker({ defaultPhotoUrl, onChange }: ProfilePhotoProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultPhotoUrl ?? null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // defaultPhotoUrl değişirse (örneğin form resetlenirse), bunu da yansıt
    if (!selectedFile) {
      setPreviewUrl(defaultPhotoUrl ?? null);
    }
  }, [defaultPhotoUrl]);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string); // base64 URL
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    onChange?.(file!);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Profil Fotoğrafı (opsiyonel)
        </label>

        <div className="mt-2">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Profil Önizleme"
              className="h-48 w-48 rounded-full border object-cover shadow-md"
              width={192}
              height={192}
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border bg-gray-100 text-gray-400">
              Önizleme
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-center file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
    </>
  );
}
