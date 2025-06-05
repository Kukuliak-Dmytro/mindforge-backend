import { ReactNode } from 'react';

interface StepCardProps {
  step: number;
  title: string;
  content: string;
  children: ReactNode;
}

export function StepCard({ step, title, content, children }: StepCardProps) {
  return (
    <div className=" p-4 flex gap-4 bg-white-bg rounded-medium shadow-double text-left relative">
      {children}
      <div className="flex flex-col gap-2">
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
      <div className="absolute right-[34px] top-0 h-[52px] w-[34px] pt-[5px] bg-accent flex items-start justify-center rounded-t-md" 
           style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 75%, 0 100%, 0 0)" }}>
        <h4 className="text-rich-black">{step}</h4>
      </div>
    </div>
  );
} 