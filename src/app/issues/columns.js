"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = [
  {
    accessorKey: "problem_type",
    header: "Problem Type",
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.Status;
      const statusColor =
        status === "in_progress"
          ? "bg-yellow-500"
          : status === "resolved"
          ? "bg-green-500"
          : status === "declined"
          ? "bg-red-500"
          : "bg-gray-500";

      return (
        <span
          className={`px-2 py-1 rounded text-white text-xs font-medium ${statusColor}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "SubmittedAt",
    header: "Submitted Time",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy issue ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View issue details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
