import { CustomerList } from "@/components/customers/customer-list";
import { customers } from "@/lib/data";

export default function CustomersPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-card">
      <div className="flex flex-1 flex-col">
        <main className="flex flex-1 overflow-hidden">
          <CustomerList customers={customers} />
        </main>
      </div>
    </div>
  );
}
