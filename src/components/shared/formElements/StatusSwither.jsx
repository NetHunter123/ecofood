import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const StatusSwitcher = ({ form, inputName }) => {
  return (
    <FormField
      control={form.control}
      name={inputName}
      render={({ field }) => (
        <FormItem
          className={`flex flex-row items-center justify-between rounded-lg border-2 ${field.value === "PUBLISH" && "border-primary"} gap-2 p-2`}
        >
          <FormControl>
            <Switch
              checked={field.value === "PUBLISH"}
              onCheckedChange={(checked) =>
                field.onChange(checked ? "PUBLISH" : "DRAFT")
              }
            />
          </FormControl>
          <FormLabel className="text-base" style={{ margin: "0px" }}>
            {field.value === "PUBLISH" ? "Опублікувати" : "В чернетку"}
          </FormLabel>
        </FormItem>
      )}
    />
  );
};

export default StatusSwitcher;
