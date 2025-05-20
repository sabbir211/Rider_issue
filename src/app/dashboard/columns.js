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
    accessorKey: "RiderId",
    header: "Rider ID",
  },
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
        status === "Pending"
          ? "bg-yellow-500"
          : status === "Resolved"
          ? "bg-green-500"
          : status === "Declined"
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
  
];
