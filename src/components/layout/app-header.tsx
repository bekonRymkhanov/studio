import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AppHeaderProps {
    onNewTicket: () => void;
}

export function AppHeader({ onNewTicket }: AppHeaderProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Inbox</h1>
      </div>
      <Button variant="outline" size="sm" onClick={onNewTicket}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Simulate New Ticket
      </Button>
    </header>
  );
}
