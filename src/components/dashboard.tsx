"use client";

import * as React from "react";
import {
  AppSidebar,
  AppHeader,
  InboxColumn,
  TicketColumn,
  CustomerColumn,
  TicketViewPlaceholder,
} from "@/components/layout";
import type { Ticket, Customer, Agent, Message, Note } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  tickets: Ticket[];
  customers: Customer[];
  agents: Agent[];
}

export function Dashboard({
  tickets: initialTickets,
  customers: initialCustomers,
  agents,
}: DashboardProps) {
  const { toast } = useToast();
  const [tickets, setTickets] = React.useState(initialTickets);
  const [customers, setCustomers] = React.useState(initialCustomers);
  const [selectedTicketId, setSelectedTicketId] = React.useState<
    string | null
  >(initialTickets[0]?.id ?? null);

  const selectedTicket = React.useMemo(
    () => tickets.find((t) => t.id === selectedTicketId),
    [tickets, selectedTicketId]
  );

  const selectedCustomer = React.useMemo(
    () => customers.find((c) => c.id === selectedTicket?.customerId),
    [customers, selectedTicket]
  );

  const handleSelectTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    const ticket = tickets.find((t) => t.id === ticketId);
    if (ticket?.unread) {
      setTickets((prevTickets) =>
        prevTickets.map((t) =>
          t.id === ticketId ? { ...t, unread: false } : t
        )
      );
    }
  };

  const unreadCount = React.useMemo(() => tickets.filter(t => t.unread).length, [tickets]);

  const handleSimulateNewTicket = () => {
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      subject: "Urgent: Website is down!",
      customerId: "cust-2",
      agentId: "agent-1",
      channel: "email",
      status: "open",
      priority: "high",
      unread: true,
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          author: "customer",
          authorName: "Emily Carter",
          authorAvatarUrl: "/avatars/05.png",
          text: "Help! Our company website just went offline. We are losing business every minute. Please investigate immediately.",
          timestamp: new Date().toISOString(),
          isInternal: false,
        },
      ],
    };
    setTickets(prev => [newTicket, ...prev]);
    toast({
      title: "New Ticket Received",
      description: newTicket.subject,
    })
  };

  const handleSendMessage = (ticketId: string, text: string, isInternal: boolean) => {
    const agent = agents.find(a => a.id === 'agent-1'); // Assume current agent is Alex
    if (!agent) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      author: 'agent',
      authorName: agent.name,
      authorAvatarUrl: agent.avatarUrl,
      text,
      timestamp: new Date().toISOString(),
      isInternal,
    };

    setTickets(prev => prev.map(t => 
      t.id === ticketId ? {...t, messages: [...t.messages, newMessage]} : t
    ));
  };
  
  const handleAssignTicket = (ticketId: string, agentId: string) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? {...t, agentId} : t));
    const agent = agents.find(a => a.id === agentId);
    toast({
      title: "Ticket Assigned",
      description: `Ticket #${ticketId.slice(-4)} assigned to ${agent?.name}.`
    });
  };

  const handleResolveTicket = (ticketId: string) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? {...t, status: 'resolved'} : t));
     toast({
      title: "Ticket Resolved",
      description: `Ticket #${ticketId.slice(-4)} has been marked as resolved.`
    });
  };

  const handleArchiveTicket = (ticketId: string) => {
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);
    setTickets(prev => prev.filter(t => t.id !== ticketId));

    if (selectedTicketId === ticketId) {
      if (tickets.length > 1) {
        const nextTicket = tickets[ticketIndex + 1] || tickets[ticketIndex - 1];
        setSelectedTicketId(nextTicket.id);
      } else {
        setSelectedTicketId(null);
      }
    }
     toast({
      variant: 'destructive',
      title: "Ticket Archived",
      description: `Ticket #${ticketId.slice(-4)} has been archived.`
    });
  };

  const handleSaveNote = (customerId: string, noteText: string) => {
    setCustomers(prevCustomers =>
      prevCustomers.map(c => {
        if (c.id === customerId) {
          const newNote: Note = {
            id: `note-${Date.now()}`,
            text: noteText,
            createdAt: new Date().toISOString(),
          };
          return {
            ...c,
            notes: c.notes ? [...c.notes, newNote] : [newNote],
          };
        }
        return c;
      })
    );
    toast({
      title: 'Note Saved',
      description: 'A new note has been added to the customer profile.',
    });
  };


  return (
    <div className="flex h-screen w-full overflow-hidden bg-card">
      <AppSidebar unreadCount={unreadCount} />
      <div className="flex flex-1 flex-col">
        <AppHeader onNewTicket={handleSimulateNewTicket} />
        <main className="flex flex-1 overflow-hidden">
          <div className="grid w-full grid-cols-1 md:grid-cols-[minmax(300px,_1fr)_2fr] lg:grid-cols-[minmax(300px,_350px)_minmax(400px,_2fr)_minmax(300px,_350px)]">
            <InboxColumn
              tickets={tickets}
              selectedTicketId={selectedTicketId}
              onSelectTicket={handleSelectTicket}
            />
            
            <div className="hidden md:flex flex-col border-l">
              {selectedTicket && selectedCustomer ? (
                <>
                  <TicketColumn
                    ticket={selectedTicket}
                    agents={agents}
                    onAssign={handleAssignTicket}
                    onResolve={handleResolveTicket}
                    onArchive={handleArchiveTicket}
                    onSendMessage={handleSendMessage}
                  />
                </>
              ) : (
                <TicketViewPlaceholder />
              )}
            </div>

            <div className="hidden lg:flex flex-col border-l bg-background/50">
               {selectedTicket && selectedCustomer ? (
                <>
                  <CustomerColumn
                    customer={selectedCustomer}
                    customerTickets={tickets.filter(
                      (t) => t.customerId === selectedCustomer.id
                    )}
                    onSaveNote={handleSaveNote}
                  />
                </>
              ) : (
                <TicketViewPlaceholder />
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
