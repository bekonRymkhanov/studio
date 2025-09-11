import Link from "next/link";
import {
  Bell,
  Inbox,
  Settings,
  Users,
  BarChart2,
  LifeBuoy,
  LogOut,
  Triangle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IntelligentSearch } from "@/components/search/intelligent-search";

interface AppSidebarProps {
  unreadCount: number;
}

export function AppSidebar({ unreadCount }: AppSidebarProps) {
  return (
    <aside className="hidden md:flex w-16 flex-col items-center border-r bg-card text-card-foreground py-4 space-y-4">
      <Link href="/" className="flex items-center gap-2 font-bold text-primary">
        <Triangle className="h-8 w-8" />
        <span className="sr-only">UnifiedAssist</span>
      </Link>
      <TooltipProvider>
        <nav className="flex flex-1 flex-col items-center gap-4 px-2">
          <IntelligentSearch />
          <NavItem href="/" icon={Inbox} label="Inbox" badgeCount={unreadCount} isActive />
          <NavItem href="/customers" icon={Users} label="Customers" />
          <NavItem href="/reports" icon={BarChart2} label="Reports" />
          <NavItem href="/settings" icon={Settings} label="Settings" />
        </nav>
        <div className="flex flex-col items-center gap-4 px-2">
          <NavItem href="#" icon={LifeBuoy} label="Help" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="#">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://picsum.photos/seed/1/100/100"
                    alt="User Avatar"
                    data-ai-hint="person face"
                  />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <span className="sr-only">Profile</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Profile</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </aside>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  badgeCount?: number;
  isActive?: boolean;
}

function NavItem({
  href,
  icon: Icon,
  label,
  badgeCount,
  isActive,
}: NavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={`relative flex items-center justify-center rounded-lg p-2 transition-colors ${
            isActive
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Icon className="h-5 w-5" />
          {badgeCount && badgeCount > 0 ? (
            <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-primary-foreground">
              {badgeCount}
            </Badge>
          ) : null}
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
