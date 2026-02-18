import  { useEffect, useRef, useState } from "react";
import CommandBarCard from "../components/subscription/CommandBarCard";
import QuickActionTile from "../components/subscription/QuickActionTile";
import { useQuery } from "@tanstack/react-query";
import { getTableRows } from "sn-shadcn-kit/table";
import { getAxiosInstance } from "sn-shadcn-kit";
import { useTheme } from "../context/theme-context";
import shadcnLight from "../assets/shadcn-light.png";
import shadcnDark from "../assets/shadcn-dark.png";

/* -------------------- API -------------------- */

const fetchUsers = async () => {
  const controller = new AbortController();
  return (
    await getTableRows(
      "sys_user",
      "ORDERBYname",
      "sys_id,name",
      0,
      100,
      controller.signal
    )
  ).data.result;
};

const fetchTemplates = async () => {
  const controller = new AbortController();
  return (
    await getTableRows(
      "sys_template",
      "ORDERBYname",
      "sys_id,name",
      0,
      100,
      controller.signal
    )
  ).data.result;
};

/* -------------------- Helpers -------------------- */

const filterByName = (items: any[] | undefined, search: string) =>
  items?.filter((i) =>
    i.name.display_value.toLowerCase().includes(search.toLowerCase())
  ) || [];

/* -------------------- Component -------------------- */


export default function SubscriptionPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const [userSearch, setUserSearch] = useState("");
  const [templateSearch, setTemplateSearch] = useState("");

  const [openDropdown, setOpenDropdown] = useState<"user" | "template" | null>(
    null
  );

  const userRef = useRef<HTMLDivElement | null>(null);
  const templateRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (openDropdown === "user") {
        if (userRef.current && !userRef.current.contains(target)) {
          setOpenDropdown(null);
        }
      } else if (openDropdown === "template") {
        if (templateRef.current && !templateRef.current.contains(target)) {
          setOpenDropdown(null);
        }
      }
    }

    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, [openDropdown]);

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  /* -------- React Query -------- */

  const { data: users } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
  const { data: templates } = useQuery({
    queryKey: ["templates"],
    queryFn: fetchTemplates,
  });

  const filteredUsers = filterByName(users, userSearch);
  const filteredTemplates = filterByName(templates, templateSearch);

  /* -------- Execute -------- */

  const handleExecute = async () => {
    if (!selectedUser || !selectedTemplate) {
      setMessage({ type: "error", text: "Please select both user and template" });
      return;
    }

    try {
      const axiosInstance = getAxiosInstance();
      await axiosInstance.post("/api/now/table/sys_notif_subscription", {
        user: selectedUser,
        u_descroption: selectedTemplate,
      });

      setMessage({ type: "success", text: "Subscription created successfully" });

      setSelectedUser(null);
      setSelectedTemplate(null);
      setUserSearch("");
      setTemplateSearch("");
    } catch {
      setMessage({ type: "error", text: "Error creating subscription" });
    }
  };

  /* -------- Dropdown renderer -------- */

  const renderDropdown = (
    items: any[],
    onSelect: (id: string, label: string) => void
  ) => (
    <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {items?.length ? (
        items.map((item) => (
          <div
            key={item.sys_id.value}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelect(item.sys_id.value, item.name.display_value)}
            className="p-3 hover:bg-accent cursor-pointer text-sm border-b border-border last:border-b-0"
          >
            {item.name.display_value}
          </div>
        ))
      ) : (
        <div className="p-3 text-sm text-muted-foreground">No results found</div>
      )}
    </div>
  );

  /* -------------------- UI -------------------- */

  return (
    
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
            What would you like to do?
          </h1>
          <p className="text-muted-foreground mt-1">
            Select an action below or use the command bar above to get started.
          </p>
        </header>

        {/* Command bar */}
        <CommandBarCard message="Subscribe receive notifications" />

        {/* Message */}
        {message && (
          <div className={`mt-6 p-4 rounded-lg border ${
            message.type === "success" 
              ? "bg-green-50 border-green-200 text-green-800" 
              : "bg-red-50 border-red-200 text-red-800"
          }`}>
            <div className="flex items-center justify-between">
              <span>{message.text}</span>
              <button onClick={() => setMessage(null)} className="text-sm underline">Dismiss</button>
            </div>
          </div>
        )}

        {/* Form */}
        <section className="mt-6 bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-medium text-card-foreground">
            Create subscription
          </h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LEFT */}
            <div className="grid gap-4">
              {/* User */}
              <div className="relative" ref={userRef}>
                <label className="text-sm text-muted-foreground mb-1 block">User</label>
                <input
                  type="text"
                  placeholder="Search and select user..."
                  value={userSearch}
                  onChange={(e) => {
                    setUserSearch(e.target.value);
                    setOpenDropdown("user");
                  }}
                  onFocus={() => setOpenDropdown("user")}
                  className="w-full p-3 border border-input bg-background rounded-lg text-sm"
                />
                {openDropdown === "user" &&
                  renderDropdown(filteredUsers, (id, label) => {
                    setSelectedUser(id);
                    setUserSearch(label);
                    setOpenDropdown(null);
                  })}
              </div>

              {/* Channel */}
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Channel
                </label>
                <div className="w-full p-3 border border-input rounded-lg text-sm bg-muted">
                  SMS
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="grid gap-4">
              {/* Template */}
              <div className="relative" ref={templateRef}>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Template
                </label>
                <input
                  type="text"
                  placeholder="Search and select template..."
                  value={templateSearch}
                  onChange={(e) => {
                    setTemplateSearch(e.target.value);
                    setOpenDropdown("template");
                  }}
                  onFocus={() => setOpenDropdown("template")}
                  className="w-full p-3 border border-input bg-background rounded-lg text-sm"
                />
                {openDropdown === "template" &&
                  renderDropdown(filteredTemplates, (id, label) => {
                    setSelectedTemplate(id);
                    setTemplateSearch(label);
                    setOpenDropdown(null);
                  })}
              </div>

              {/* Frequency */}
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Frequency
                </label>
                <div className="w-full p-3 border border-input rounded-lg text-sm bg-muted">
                  Immediate
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <button className="text-muted-foreground">Cancel</button>

            <div className="flex gap-3">
              {/* <button className="px-4 py-2 rounded-md border border-input text-foreground">
                Open & Review
              </button> */}
              <button
                onClick={handleExecute}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground shadow"
              >
                Execute
              </button>
            </div>
          </div>
        </section>

        {/* Quick actions */}
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

