export type Agent = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Note = {
  id: string;
  text: string;
  createdAt: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  orderIds: string[];
  lastInteraction: string;
  notes?: Note[];
};

export type Message = {
  id: string;
  author: "customer" | "agent" | "system";
  authorName: string;
  authorAvatarUrl: string;
  text: string;
  timestamp: string;
  isInternal: boolean;
  attachments?: { name: string; url: string }[];
};

export type Ticket = {
  id: string;
  subject: string;
  customerId: string;
  agentId: string;
  channel: "email" | "chat" | "phone";
  status: "open" | "resolved" | "pending";
  priority: "high" | "medium" | "low";
  unread: boolean;
  createdAt: string;
  dueDate?: string;
  messages: Message[];
};
