"use client";
import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Search, Loader2, Ticket, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  intelligentSearch,
  IntelligentSearchOutput,
} from "@/ai/flows/intelligent-search";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type SearchState = {
  results: IntelligentSearchOutput["results"] | null;
  error: string | null;
};

const initialState: SearchState = {
  results: null,
  error: null,
};

function SearchSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      variant="ghost"
      className="absolute right-1 top-1 h-7 w-7"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Search className="h-4 w-4" />
      )}
    </Button>
  );
}

export function IntelligentSearch() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);

  const searchAction = async (
    prevState: SearchState,
    formData: FormData
  ): Promise<SearchState> => {
    const query = formData.get("query") as string;
    if (!query) {
      return { results: null, error: "Search query cannot be empty." };
    }
    try {
      const output = await intelligentSearch({ query });
      if (output.results.length === 0) {
        return { results: [], error: null };
      }
      setIsOpen(true);
      return { results: output.results, error: null };
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Search Failed",
        description: "Could not perform intelligent search.",
      });
      return { results: null, error: e.message || "An unknown error occurred." };
    }
  };

  const [state, formAction] = useFormState(searchAction, initialState);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent side="right">Intelligent Search</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent className="w-96 p-0">
        <form action={formAction}>
          <div className="relative">
            <Input
              type="search"
              name="query"
              placeholder="Search by name, order, keywords..."
              className="pr-10 border-0 focus-visible:ring-0"
            />
            <SearchSubmitButton />
          </div>
        </form>
        {state.results && state.results.length > 0 && (
          <div className="p-4 max-h-96 overflow-y-auto">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Search Results
            </h4>
            <div className="space-y-4">
              {state.results.map((result) => (
                <div key={result.id} className="flex gap-4">
                  <div className="mt-1">
                    {result.type === "ticket" ? (
                      <Ticket className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{result.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {result.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {state.results && state.results.length === 0 && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No results found.
          </div>
        )}
        {state.error && (
            <div className="p-4">
                 <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
