"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { Ticket, Agent } from "@/lib/types";

interface ReportsDashboardProps {
  tickets: Ticket[];
  agents: Agent[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function ReportsDashboard({ tickets, agents }: ReportsDashboardProps) {
  const ticketsByStatus = tickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {} as Record<Ticket["status"], number>);

  const statusData = Object.entries(ticketsByStatus).map(([name, value]) => ({
    name,
    value,
  }));

  const ticketsByAgent = agents.map((agent) => {
    const agentTickets = tickets.filter((t) => t.agentId === agent.id);
    return {
      name: agent.name,
      open: agentTickets.filter((t) => t.status === "open").length,
      pending: agentTickets.filter((t) => t.status === "pending").length,
      resolved: agentTickets.filter((t) => t.status === "resolved").length,
    };
  });

  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Status</CardTitle>
            <CardDescription>
              Distribution of tickets across different statuses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={(props) =>
                    `${props.name}: ${props.value}`
                  }
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ticket Load by Agent</CardTitle>
            <CardDescription>
              Number of tickets assigned to each agent by status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketsByAgent}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="open" stackId="a" fill="#8884d8" name="Open" />
                <Bar dataKey="pending" stackId="a" fill="#82ca9d" name="Pending" />
                <Bar
                  dataKey="resolved"
                  stackId="a"
                  fill="#ffc658"
                  name="Resolved"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
