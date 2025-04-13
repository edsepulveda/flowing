import { cn } from "@/lib/utils";
import {
  cloneElement,
  type JSX,
  type ReactElement,
  type ReactNode,
} from "react";
import { FormLabel } from "./form-label";
import { FormHelperText } from "./form-helper";

export type FormControlProps = {
  id?: string;
  isRequired?: boolean;
  isOptional?: boolean;
  isError?: boolean;
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  children: JSX.Element;
  className?: string;
  icon?: ReactNode;
  tooltipText?: ReactElement | string;
  tooltipClassName?: string;
};

export const FormControl = ({
  children,
  isRequired,
  isOptional,
  label,
  helperText,
  errorText,
  id,
  isError,
  icon,
  className,
  tooltipText,
  tooltipClassName,
}: FormControlProps): JSX.Element => {
  return (
    <div className={cn("mb-4", className)}>
      {typeof label === "string" ? (
        <FormLabel
          label={label}
          isOptional={isOptional}
          isRequired={isRequired}
          id={id}
          icon={icon}
          tooltipText={tooltipText}
          tooltipClassName={tooltipClassName}
        />
      ) : (
        label
      )}
      {cloneElement(children, {
        isRequired,
        "data-required": isRequired,
        isError,
      })}
      {!isError && helperText && (
        <FormHelperText isError={isError} text={helperText} />
      )}
      {isError && errorText && (
        <FormHelperText isError={isError} text={errorText} />
      )}
    </div>
  );
};
