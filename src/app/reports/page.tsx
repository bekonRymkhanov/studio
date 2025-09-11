import { ReportsDashboard } from "@/components/reports/reports-dashboard";
import { tickets, agents } from "@/lib/data";

export default function ReportsPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-card">
      <div className="flex flex-1 flex-col">
        <main className="flex flex-1 overflow-hidden p-6">
          <ReportsDashboard tickets={tickets} agents={agents} />
        </main>
      </div>
    </div>
  );
}
