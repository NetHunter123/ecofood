import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const BasicInput = ({
  form,
  label,
  inputName,
  placeholder,
  description,
  value,
  type = "text",
}) => {
  const {
    formState: { errors },
  } = form;

  return (
    <FormField
      control={form.control}
      name={inputName}
      render={({ field }) => (
        <FormItem>
          {!!label && <FormLabel>{label}</FormLabel>}
          <FormControl className={`m-0`}>
            <Input
              className={`m-[0px]`}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors[inputName] ? "true" : undefined}
              {...field}
            />
          </FormControl>
          <FormMessage />
          {!!description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

export default BasicInput;
