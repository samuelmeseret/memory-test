import { IdentifyResult as IdentifyResultType } from "@/types";

interface IdentifyResultProps {
  result: IdentifyResultType;
}

export default function IdentifyResult({ result }: IdentifyResultProps) {
  const { name, confidence, explanation } = result;

  let bgColor: string;
  let textColor: string;
  let heading: string;

  if (confidence >= 70 && name) {
    bgColor = "bg-green-50 ring-green-200";
    textColor = "text-green-800";
    heading = `This is ${name}!`;
  } else if (confidence >= 40 && name) {
    bgColor = "bg-yellow-50 ring-yellow-200";
    textColor = "text-yellow-800";
    heading = `This might be ${name}`;
  } else {
    bgColor = "bg-gray-50 ring-gray-200";
    textColor = "text-gray-700";
    heading = "I'm not sure who this is";
  }

  return (
    <div
      className={`rounded-2xl p-6 ring-1 ${bgColor}`}
      role="status"
      aria-live="polite"
    >
      <h2 className={`text-2xl font-bold ${textColor}`}>{heading}</h2>
      {confidence > 0 && (
        <p className="mt-2 text-lg text-gray-600">
          Confidence: {confidence}%
        </p>
      )}
      <p className="mt-3 text-xl text-gray-700">{explanation}</p>
    </div>
  );
}
