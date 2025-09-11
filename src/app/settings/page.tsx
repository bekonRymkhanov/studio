import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-card">
      <div className="flex flex-1 flex-col">
        <main className="flex flex-1 overflow-hidden p-6">
          <SettingsForm />
        </main>
      </div>
    </div>
  );
}
