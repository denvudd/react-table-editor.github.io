"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.InputHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLInputElement, LabelProps>(
  ({ className, ...props }) => (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
