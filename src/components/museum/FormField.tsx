import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

const FormField = ({ label, id, required, error, children }: FormFieldProps) => (
  <div>
    <Label htmlFor={id}>
      {label}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
    <div className="mt-1">{children}</div>
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);

export default FormField;
