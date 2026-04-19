import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900",
        className
      )}
      {...props}
    />
  );
}
