import { ReactNode } from "react";

interface BestEmployeeCardProps {
  children: ReactNode;
  name: string;
  workingSince: string;
  rating: string;
  description: string;
}

export function BestEmployeeCard({
  children,
  name,
  workingSince,
  rating,
  description
}: BestEmployeeCardProps) {
  return (
    <div className="bg-white-bg p-6 flex flex-col items-center gap-4 text-center shadow-medium rounded-small">
      {children}
      <div className="flex flex-col items-center gap-2">
        <h5>{name}</h5>
        <p className="p2">На сайті з {workingSince}</p>
        <h6>{rating}</h6>
      </div>
      <div><p>{description}</p></div>
    </div>
  );
} 