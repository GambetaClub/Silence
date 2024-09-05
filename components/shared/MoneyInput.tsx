"use client";
import { useReducer } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { moneyFormatter } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { ArticleFormSchema } from "@/lib/constants"; // Import the schema from your constants

// Define the TextInputProps with a specific type for the form prop
type TextInputProps = {
  form: UseFormReturn<z.infer<typeof ArticleFormSchema>>; // Use the schema to type the form
  name: keyof z.infer<typeof ArticleFormSchema>; // Ensure the name matches the keys of the form schema
  label: string;
  placeholder: string;
};

export default function MoneyInput(props: TextInputProps) {
  const initialValue = props.form.getValues()[props.name]
    ? moneyFormatter.format(Number(props.form.getValues()[props.name]))
    : "";

  const [value, setValue] = useReducer((_: string, next: string) => {
    const digits = next.replace(/\D/g, "");
    return moneyFormatter.format(Number(digits) / 100); // Ensure digits are converted to a number
  }, initialValue);

  function handleChange(realChangeFn: (realValue: number) => void, formattedValue: string) {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100; // Convert to number
    realChangeFn(realValue);
  }

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value;
        const _change = field.onChange;

        return (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type="text"
                className="text-left"
                {...field}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
