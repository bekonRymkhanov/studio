"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";

export function InboxFilters() {
  const [activeFilter, setActiveFilter] = React.useState("all");

  return (
    <div className="flex items-center gap-2 border-b p-2">
      <div className="flex-1">
        <div className="flex space-x-1 rounded-lg bg-muted p-1">
          <Button
            variant={activeFilter === "all" ? "outline" : "ghost"}
            size="sm"
            className={`w-full ${
              activeFilter === "all" ? "bg-card shadow-sm" : ""
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "unread" ? "outline" : "ghost"}
            size="sm"
            className={`w-full ${
              activeFilter === "unread" ? "bg-card shadow-sm" : ""
            }`}
            onClick={() => setActiveFilter("unread")}
          >
            Unread
          </Button>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <ListFilter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>Open</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Resolved</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
