import React from "react";

export default function QuickActionTile({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group bg-card rounded-lg p-4 text-left hover:bg-accent/50 transition-colors border border-border"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
          {icon}
        </div>

        <div className="flex-1">
          <div className="font-medium text-card-foreground">{title}</div>
          <div className="text-sm text-muted-foreground mt-1">{desc}</div>
        </div>
      </div>
    </button>
  );
}
