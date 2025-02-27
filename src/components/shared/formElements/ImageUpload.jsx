"use client";
import React, { useRef, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Button from "@/components/shared/buttons/Button";
import { RiDeleteBin5Line } from "react-icons/ri";

const ImageUpload = ({ form, inputName, label, description }) => {
  const fileInputRef = useRef(null); // Додаємо посилання на input
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPreviewImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
      form.setValue(inputName, selectedFile); // Setting the file to be used with form submission
    } else {
      alert("Будь ласка, оберіть файл зображення");
    }
  };

  const handleImageRemove = () => {
    setPreviewImage(null);
    setFile(null);
    form.setValue(inputName, null); // Скидаємо значення в стані форми
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Очищуємо значення input
    }
  };

  const {
    formState: { errors },
  } = form;

  return (
    <FormField
      control={form.control}
      name={inputName}
      render={({ field }) => (
        <FormItem className={"flex flex-col items-center"}>
          {!!label && (
            <FormLabel className={"text-start md:w-full"}>{label}</FormLabel>
          )}
          <FormControl>
            <div
              className="relative flex h-[240px] w-[260px] cursor-pointer items-center justify-center border-2 border-dashed border-primary"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <span className="text-3xl text-gray-400">+</span>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
            </div>
          </FormControl>
          <FormMessage error={errors[inputName]} />
          <FormDescription>
            Допустимі формати тільки JPEG, PNG, JPG, WebP
            <br />
            Вага картинки має бути меншою ніж 5MB
          </FormDescription>
          {/*{!!description && (*/}
          {/*)}*/}
          {previewImage && (
            <div className="mt-2 flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                Змінити зображення
              </Button>
              <Button variant="outlineDanger" onClick={handleImageRemove}>
                <RiDeleteBin5Line />
              </Button>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default ImageUpload;
