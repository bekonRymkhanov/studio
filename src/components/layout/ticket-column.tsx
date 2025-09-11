import { TicketHeader } from "@/components/ticket/ticket-header";
import { TicketConversation } from "@/components/ticket/ticket-conversation";
import { TicketReply } from "@/components/ticket/ticket-reply";
import type { Ticket, Agent } from "@/lib/types";

interface TicketColumnProps {
  ticket: Ticket;
  agents: Agent[];
  onAssign: (ticketId: string, agentId: string) => void;
  onResolve: (ticketId: string) => void;
  onArchive: (ticketId: string) => void;
  onSendMessage: (ticketId: string, text: string, isInternal: boolean) => void;
}

export function TicketColumn({ ticket, agents, onAssign, onResolve, onArchive, onSendMessage }: TicketColumnProps) {
  return (
    <div className="flex h-full flex-col">
      <TicketHeader ticket={ticket} agents={agents} onAssign={onAssign} onResolve={onResolve} onArchive={onArchive} />
      <TicketConversation messages={ticket.messages} />
      <TicketReply onSendMessage={(text, isInternal) => onSendMessage(ticket.id, text, isInternal)} />
    </div>
  );
}
