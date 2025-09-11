import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Paperclip, CornerDownLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TicketReplyProps {
  onSendMessage: (text: string, isInternal: boolean) => void;
}

export function TicketReply({ onSendMessage }: TicketReplyProps) {
  const [activeTab, setActiveTab] = React.useState('reply');
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, activeTab === 'internal');
      setMessage('');
    }
  };

  return (
    <div className="border-t p-4 bg-card">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reply">Public Reply</TabsTrigger>
          <TabsTrigger value="internal">Internal Note</TabsTrigger>
        </TabsList>
        <div className="mt-4">
        <Textarea
          placeholder={activeTab === 'reply' ? "Type your public reply here..." : "Type your internal note here..."}
          className="min-h-[100px] resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        </div>
      </Tabs>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
        </div>
        <Button onClick={handleSend} disabled={!message.trim()}>
          Send
          <CornerDownLeft className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
