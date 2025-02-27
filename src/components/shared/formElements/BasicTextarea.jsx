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
import { Textarea } from "@/components/ui/textarea";

const BasicInput = ({
  form,
  label,
  inputName,
  placeholder,
  description,
  height = 100,
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
          <FormControl>
            <Textarea
              className={`resize-none`}
              style={{ height }}
              placeholder={placeholder}
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
