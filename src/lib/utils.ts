import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function SeparateAndCapitalize(str: string): string {
  const words = str.match(/[A-Z][a-z]*|[a-z]+/g) || [];
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export async function UploadToCloudinary(file: File): Promise<{
  success: boolean;
  url?: string;
}> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_NAME
    }/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    return {
      success: false,
    };
  }

  const data = await response.json();
  console.log(data)
  return {
    success: true,
    url: data.secure_url,
  };
}
