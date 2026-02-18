import React, {useState} from "react";
import CommandBarCard from "../components/subscription/CommandBarCard";
import SubscriptionCard from "../components/subscription/SubscriptionCard";
import QuickActionTile from "../components/subscription/QuickActionTile";
import shadcnLight from "../assets/shadcn-light.png";
import shadcnDark from "../assets/shadcn-dark.png";
import tailwindLight from "../assets/tailwind-light.png";
import tailwindDark from "../assets/tailwind-dark.png";
import { CheckCircle2Icon } from "lucide-react";
import { useTheme } from "../context/theme-context";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function SubscriptionPage() {
  const [selected, setSelected] = useState<string | null>("user");

  function toggle(key: string) {
    setSelected((s) => (s === key ? null : key));
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">What would you like to do?</h1>
          <p className="text-slate-600 mt-1">Select an action below or use the command bar above to get started.</p>
        </header>

        <CommandBarCard message={"Subscribe Marie to receive executive notifications via SMS"} />

        <section className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-slate-900">Create subscription</h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-1 gap-4">
              <SubscriptionCard
                icon="user"
                label="User"
                value="Marie Chen"
                selected={selected === "user"}
                onClick={() => toggle("user")}
              />

              <SubscriptionCard
                icon="phone"
                label="Channel"
                value="SMS"
                selected={selected === "channel"}
                onClick={() => toggle("channel")}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <SubscriptionCard
                icon="template"
                label="Template"
                value="Executive Notifications"
                selected={selected === "template"}
                onClick={() => toggle("template")}
              />

              <SubscriptionCard
                icon="clock"
                label="Frequency"
                value="Immediate"
                selected={selected === "frequency"}
                onClick={() => toggle("frequency")}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button className="text-slate-600">Cancel</button>

            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-md border border-slate-200 text-slate-700">Open & Review</button>
              <button className="px-4 py-2 rounded-md bg-sky-600 text-white shadow">Execute</button>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionTile
              icon="list"
              title="Manage my subscriptions"
              desc="View and edit your active subscriptions"
              onClick={() => console.log("Manage my subscriptions")}
            />
            <QuickActionTile
              icon="people"
              title="Manage for others"
              desc="Create or modify subscriptions for other users"
              onClick={() => console.log("Manage for others")}
            />
            <QuickActionTile
              icon="template"
              title="Templates and setup"
              desc="Manage templates, defaults and channels"
              onClick={() => console.log("Templates and setup")}
            />
            <QuickActionTile
              icon="alert"
              title="Triage issues"
              desc="Review delivery or subscription errors"
              onClick={() => console.log("Triage issues")}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
