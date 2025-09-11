import { TicketHeader } from "@/components/ticket/ticket-header";
import { TicketConversation } from "@/components/ticket/ticket-conversation";
import { TicketReply } from "@/components/ticket/ticket-reply";
import type { Ticket, Agent } from "@/lib/types";

interface TicketColumnProps {
  ticket: Ticket;
  agents: Agent[];
}

export function TicketColumn({ ticket, agents }: TicketColumnProps) {
  return (
    <div className="flex h-full flex-col">
      <TicketHeader ticket={ticket} agents={agents} />
      <TicketConversation messages={ticket.messages} />
      <TicketReply />
    </div>
  );
}
