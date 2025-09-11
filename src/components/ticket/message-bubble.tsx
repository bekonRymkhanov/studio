import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/types";
import { format } from "date-fns";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAgent = message.author === "agent";
  const isSystem = message.author === "system";

  if (message.isInternal) {
    return (
      <div className="flex items-start gap-3 justify-center">
        <Card className="max-w-md w-full bg-yellow-100 dark:bg-yellow-900/50 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-3">
            <p className="text-xs text-yellow-800 dark:text-yellow-300">
              <span className="font-semibold">{message.authorName}</span> added an internal note
            </p>
            <p className="text-sm text-yellow-900 dark:text-yellow-200 mt-1">{message.text}</p>
            <p className="text-right text-xs text-yellow-600 dark:text-yellow-400 mt-2">
              {format(new Date(message.timestamp), "MMM d, h:mm a")}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (isSystem) {
     return (
        <div className="text-center text-xs text-muted-foreground my-4">
            <p>{message.text}</p>
            <p>{format(new Date(message.timestamp), "MMM d, h:mm a")}</p>
        </div>
     )
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isAgent ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={message.authorAvatarUrl} alt={message.authorName} />
        <AvatarFallback>
          {message.authorName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-md rounded-lg p-3",
          isAgent
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <p className="text-sm">{message.text}</p>
        <p
          className={cn(
            "text-right text-xs mt-2",
            isAgent ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {format(new Date(message.timestamp), "h:mm a")}
        </p>
      </div>
    </div>
  );
}
