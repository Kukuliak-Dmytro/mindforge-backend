import { ReactNode } from 'react';
import Icons  from '@/components/ui/icons';

interface SubjectSnippetProps {
  title: string;
  icon: "DT" | "DR" | "HW" | "KR" | "TT" | "Ukr" | "Mat" | "Eng" | "Bio" | "Geo" | "His" | "Phy" | "Che" | "Inf";
  size?: number;
  variant?: 'Default' | 'Inverse';
}

export function SubjectSnippet({ 
  icon, 
  size = 35,
  title, 
  variant = 'Default' 
}: SubjectSnippetProps) {
  return (
    <div 
      className={`h-[35px] w-auto px-[10px] rounded-small shadow-small bg-white-bg 
        flex justify-between items-center ${variant === 'Inverse' ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div>
        <Icons icon={icon} size={size} />
      </div>
      <div className="py-[10px]">
        <p>{title}</p>
      </div>
    </div>
  );
}