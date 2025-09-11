import {
  Archive,
  ArchiveX,
  ChevronDown,
  Clock,
  MoreVertical,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import type { Ticket, Agent } from "@/lib/types";

interface TicketHeaderProps {
  ticket: Ticket;
  agents: Agent[];
}

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
    open: "secondary",
    pending: "default",
    resolved: "destructive",
}

export function TicketHeader({ ticket, agents }: TicketHeaderProps) {
  return (
    <div className="flex items-center p-3 border-b">
      <div className="flex items-center gap-2 flex-1">
        <h2 className="font-semibold text-lg truncate">{ticket.subject}</h2>
        <Badge variant={statusVariant[ticket.status]} className="capitalize">{ticket.status}</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Star className="mr-2 h-4 w-4" />
          Bookmark
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <span>Assign</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Assign to</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {agents.map((agent) => (
              <DropdownMenuItem key={agent.id}>{agent.name}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="default" size="sm">
          <Archive className="mr-2 h-4 w-4" />
          Resolve
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <ArchiveX className="mr-2 h-4 w-4" />
              Mark as spam
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Clock className="mr-2 h-4 w-4" />
                Set due date
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                 <DropdownMenuItem>Tomorrow</DropdownMenuItem>
                 <DropdownMenuItem>In 3 days</DropdownMenuItem>
                 <DropdownMenuItem>In 1 week</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
