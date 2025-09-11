import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Ticket } from "@/lib/types";
import { customers } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { Mail, MessageSquare, Phone, Star } from "lucide-react";

interface TicketListItemProps {
  ticket: Ticket;
  isSelected: boolean;
  onSelect: () => void;
}

const channelIcons = {
  email: Mail,
  chat: MessageSquare,
  phone: Phone,
};

export function TicketListItem({
  ticket,
  isSelected,
  onSelect,
}: TicketListItemProps) {
  const customer = customers.find((c) => c.id === ticket.customerId);
  const ChannelIcon = channelIcons[ticket.channel];

  return (
    <Button
      variant="ghost"
      onClick={onSelect}
      className={cn(
        "flex h-auto flex-col items-start gap-2 rounded-none border-b p-4 text-left transition-colors",
        isSelected
          ? "bg-accent"
          : "hover:bg-muted"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          {ticket.unread && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
          )}
          <p className="font-semibold truncate max-w-[150px]">{customer?.name}</p>
        </div>
        <div className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
        </div>
      </div>
      <div className="line-clamp-1 text-sm">{ticket.subject}</div>
      <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <ChannelIcon className="h-3 w-3" />
          <span>{ticket.channel}</span>
        </div>
        {ticket.priority === "high" && (
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-3 w-3 fill-current" />
            <span>High Priority</span>
          </div>
        )}
      </div>
    </Button>
  );
}
