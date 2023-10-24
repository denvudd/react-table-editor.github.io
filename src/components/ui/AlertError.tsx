"use client";

import React from "react";

import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./Alert";
import { cn } from "@/lib/utils";

interface ErrorAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export const AlertError: React.FC<ErrorAlertProps> = ({
  description = "Something went wrong... but we are working on it!",
  title = "Woops!",
  className,
  ...props
}) => (
  <Alert variant="destructive" className={cn("my-4", className)} {...props}>
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>
      <span>{description}</span>
      <p className="text-muted"></p>
    </AlertDescription>
  </Alert>
);
