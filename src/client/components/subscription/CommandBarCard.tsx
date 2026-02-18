import React from "react";

export default function CommandBarCard({ message }: { message: string }) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-card-foreground">IOP Command Bar</div>
        <div className="mt-1 text-muted-foreground">{message}</div>
      </div>

      {/* <div className="hidden md:flex items-center gap-3">
        <button className="px-3 py-2 rounded-md border border-input text-foreground">Edit</button>
        <button className="px-3 py-2 rounded-md bg-primary text-primary-foreground">Run</button>
      </div> */}
    </div>
  );
}
