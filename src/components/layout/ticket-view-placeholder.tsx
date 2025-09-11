import { Inbox } from "lucide-react";

export function TicketViewPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-background/50 text-center">
      <Inbox className="h-16 w-16 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">No ticket selected</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Select a ticket from the list to view its details.
      </p>
    </div>
  );
}
