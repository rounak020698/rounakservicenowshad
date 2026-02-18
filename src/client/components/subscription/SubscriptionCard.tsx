import React from "react";

type Props = {
  icon: string;
  label: string;
  value: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function SubscriptionCard({ icon, label, value, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-shadow flex items-center justify-between ${
        selected ? "border-sky-400 shadow-md bg-sky-50" : "border-slate-100 bg-white hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-600">
          {icon === "user" && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 21v-1c0-2.761-4-4-7-4s-7 1.239-7 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {icon === "phone" && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.85 19.85 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.85 19.85 0 0 1 3.08 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.12 1.21.38 2.39.76 3.5a2 2 0 0 1-.45 2.11L9.91 10.09a16 16 0 0 0 6 6l1.76-1.76a2 2 0 0 1 2.11-.45c1.11.38 2.29.64 3.5.76A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {icon === "template" && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M7 7h10M7 12h10M7 17h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {icon === "clock" && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        <div>
          <div className="text-sm text-slate-500">{label}</div>
          <div className="text-sm font-medium text-slate-900">{value}</div>
        </div>
      </div>

      <div className="flex items-center">
        {selected ? (
          <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center">✓</div>
        ) : (
          <div className="w-6 h-6 rounded-full border border-slate-200" />
        )}
      </div>
    </button>
  );
}
