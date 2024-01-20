import React from "react";
import { cn } from "../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="flex flex-col mt-4 lg:mt-[30px]">
        <label htmlFor={label}>{label}</label>
        <input
          autoComplete="new-password"
          className={cn(
            "border-[1px] border-gray-200 placeholder:text-gray-200 px-[8px] py-[18px] md:px-[16px] md:py-[18px] mt-[10px] w-[100%] focus:outline-none",
            className
          )}
          type={type}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
