import { IdentifyResult as IdentifyResultType } from "@/types";

interface IdentifyResultProps {
  result: IdentifyResultType;
}

export default function IdentifyResult({ result }: IdentifyResultProps) {
  const { name, confidence, explanation } = result;

  let bgColor: string;
  let textColor: string;
  let heading: string;
  let icon: React.ReactNode;

  if (confidence >= 70 && name) {
    bgColor = "bg-emerald-50 ring-emerald-200 shadow-emerald-900/5";
    textColor = "text-emerald-900";
    heading = `This is ${name}!`;
    icon = (
      <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  } else if (confidence >= 40 && name) {
    bgColor = "bg-amber-50 ring-amber-200 shadow-amber-900/5";
    textColor = "text-amber-900";
    heading = `This might be ${name}`;
    icon = (
      <svg className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  } else {
    bgColor = "bg-slate-50 ring-slate-200 shadow-slate-900/5";
    textColor = "text-slate-800";
    heading = "I'm not sure who this is";
    icon = (
      <svg className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  return (
    <div
      className={`rounded-3xl p-8 shadow-lg ring-1 ${bgColor}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">{icon}</div>
        <h2 className={`text-3xl font-extrabold tracking-tight ${textColor}`}>{heading}</h2>
      </div>
      {confidence > 0 && (
        <div className="mt-6 flex items-center gap-3">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-black/10">
            <div 
              className={`h-full rounded-full ${confidence >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className="text-xl font-bold opacity-80">{confidence}% match</span>
        </div>
      )}
      <p className="mt-6 text-xl leading-relaxed text-slate-700/90">{explanation}</p>
    </div>
  );
}
