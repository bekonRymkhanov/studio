import { InboxFilters } from "@/components/inbox/inbox-filters";
import { TicketList } from "@/components/inbox/ticket-list";
import type { Ticket } from "@/lib/types";

interface InboxColumnProps {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelectTicket: (ticketId: string) => void;
}

export function InboxColumn({
  tickets,
  selectedTicketId,
  onSelectTicket,
}: InboxColumnProps) {
  return (
    <div className="flex h-full flex-col bg-card">
      <InboxFilters />
      <TicketList
        tickets={tickets}
        selectedTicketId={selectedTicketId}
        onSelectTicket={onSelectTicket}
      />
    </div>
  );
}
