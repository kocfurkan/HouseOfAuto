import { Label, TextInput } from "flowbite-react";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps &
  Partial<DatePickerProps>;

export default function DateInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  return (
    <div className="block">
      <DatePicker
        {...props}
        {...field}
        onChangeRaw={(valeu) => field.onChange(valeu)}
        selected={field.value}
        className={`
            rounded-lg w-[100½] flex flex-col
            ${
              fieldState.error
                ? "bg-red-50 border-red-500 text-red-900"
                : !fieldState.invalid && fieldState.isDirty
                ? "bg-green-500 border-green-500 text-green-900"
                : ""
            }
            `}
      />
      {fieldState.error && (
        <div className="text-red-500 text-sm">{fieldState.error.message}</div>
      )}
    </div>
  );
}
