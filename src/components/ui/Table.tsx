import React from "react";
import { cn } from "@/lib/utils";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
}

export default function Table({
  className,
  containerClassName,
  children,
  ...props
}: TableProps) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800", containerClassName)}>
      <table
        className={cn("w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-400", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider", className)}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("divide-y divide-slate-100 dark:divide-slate-850 bg-white dark:bg-slate-950", className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/30", className)}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableCell({
  className,
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("p-4 align-middle font-medium", className)} {...props}>
      {children}
    </td>
  );
}

export function TableHead({
  className,
  children,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn("p-4 align-middle font-bold text-slate-500 dark:text-slate-400", className)} {...props}>
      {children}
    </th>
  );
}
