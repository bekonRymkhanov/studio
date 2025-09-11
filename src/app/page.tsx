import { Dashboard } from "@/components/dashboard";
import { tickets, customers, agents } from "@/lib/data";

export default function Home() {
  return <Dashboard tickets={tickets} customers={customers} agents={agents} />;
}
