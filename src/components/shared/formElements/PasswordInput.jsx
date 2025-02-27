import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const PasswordInput = ({
  form,
  label,
  inputName,
  placeholder,
  description,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

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
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                error={errors[inputName] ? "true" : undefined}
                className={cn("pe-10", className)}
                {...field}
              />
              <button
                type={"button"}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide Password" : "Show Password"}
                className={
                  "absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
                }
              >
                {showPassword ? (
                  <IoEyeOffOutline className={"size-5"} />
                ) : (
                  <IoEyeOutline className={"size-5"} />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
          {!!description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
