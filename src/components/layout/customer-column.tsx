"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  MessageSquare,
  FileText,
  ShoppingBag,
} from "lucide-react";
import type { Customer, Ticket } from "@/lib/types";
import { formatDistanceToNow, format } from "date-fns";
import { Textarea } from "../ui/textarea";

interface CustomerColumnProps {
  customer: Customer;
  customerTickets: Ticket[];
  onSaveNote: (customerId: string, noteText: string) => void;
}

export function CustomerColumn({
  customer,
  customerTickets,
  onSaveNote,
}: CustomerColumnProps) {
  const [note, setNote] = React.useState("");

  const handleSaveNote = () => {
    if (note.trim()) {
      onSaveNote(customer.id, note);
      setNote("");
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={customer.avatarUrl} alt={customer.name} />
              <AvatarFallback>
                {customer.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <CardTitle>{customer.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Last seen{" "}
                {formatDistanceToNow(new Date(customer.lastInteraction), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${customer.email}`} className="hover:underline">
                {customer.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{customer.phone}</span>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="history">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                {customerTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-start gap-3">
                    <div className="mt-1">
                      {ticket.channel === "email" && <Mail className="h-4 w-4 text-muted-foreground" />}
                      {ticket.channel === "chat" && <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                      {ticket.channel === "phone" && <Phone className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1">{ticket.subject}</p>
                      <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(ticket.createdAt), {addSuffix: true})}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="orders" className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                {customer.orderIds.map((orderId) => (
                  <div key={orderId} className="flex items-center gap-3">
                     <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                     <p className="text-sm font-mono">{orderId}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notes" className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <Textarea
                  placeholder="Add a note for this customer..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <Button size="sm" onClick={handleSaveNote} disabled={!note.trim()}>
                  Save Note
                </Button>
                <Separator />
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Existing Notes</h4>
                  {customer.notes && customer.notes.length > 0 ? (
                    customer.notes.map((note) => (
                      <div key={note.id} className="text-sm border-l-2 pl-3">
                        <p>{note.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(note.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No notes for this customer yet.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
