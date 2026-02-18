import React from "react";

export default function CommandBarCard({ message }: { message: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-slate-700">IOP Command Bar</div>
        <div className="mt-1 text-slate-600">{message}</div>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <button className="px-3 py-2 rounded-md border border-slate-200 text-slate-700">Edit</button>
        <button className="px-3 py-2 rounded-md bg-sky-600 text-white">Run</button>
      </div>
    </div>
  );
}
