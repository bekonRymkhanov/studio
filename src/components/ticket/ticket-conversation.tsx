import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/components/ticket/message-bubble";
import type { Message } from "@/lib/types";

interface TicketConversationProps {
  messages: Message[];
}

export function TicketConversation({ messages }: TicketConversationProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}
