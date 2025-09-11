import { ScrollArea } from "@/components/ui/scroll-area";
import { TicketListItem } from "@/components/inbox/ticket-list-item";
import type { Ticket } from "@/lib/types";

interface TicketListProps {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelectTicket: (ticketId: string) => void;
}

export function TicketList({
  tickets,
  selectedTicketId,
  onSelectTicket,
}: TicketListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-0">
        {tickets.map((ticket) => (
          <TicketListItem
            key={ticket.id}
            ticket={ticket}
            isSelected={selectedTicketId === ticket.id}
            onSelect={() => onSelectTicket(ticket.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
