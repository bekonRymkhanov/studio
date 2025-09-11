import { Button } from "@/components/ui/button";
import { Paperclip, CornerDownLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TicketReply() {
  return (
    <div className="border-t p-4 bg-card">
      <Tabs defaultValue="reply">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reply">Public Reply</TabsTrigger>
          <TabsTrigger value="internal">Internal Note</TabsTrigger>
        </TabsList>
        <div className="mt-4">
        <Textarea
          placeholder="Type your message here..."
          className="min-h-[100px] resize-none"
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
        <Button>
          Send
          <CornerDownLeft className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
