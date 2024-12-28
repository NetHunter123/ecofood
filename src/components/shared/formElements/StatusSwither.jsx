import React from 'react';
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Switch} from "@/components/ui/switch";

const StatusSwither = ({form}) => {
  return (
    <FormField
      control={form.control}
      name="status"
      render={({field}) => (
        <FormItem
          className={`flex flex-row items-center justify-between rounded-lg border-2 ${field.value === "PUBLISH" && "border-primary"} p-1 gap-2`}>
          <FormControl>
            <Switch
              checked={field.value === "PUBLISH"}
              onCheckedChange={(checked) => field.onChange(checked ? "PUBLISH" : "DRAFT")}
            />
          </FormControl>
          <FormLabel className="text-base">
            {field.value === "PUBLISH" ? "Опублікувати" : "В чернетку"}
          </FormLabel>
        </FormItem>
      )}
    />
  );
};

export default StatusSwither;