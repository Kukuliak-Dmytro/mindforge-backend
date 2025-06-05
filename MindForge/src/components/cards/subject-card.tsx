import { ReactNode } from 'react';
import { SecondaryButton } from '@/components/ui/button';

interface SubjectCardProps {
  title: string;
  link: string;
  children: ReactNode;
  /** Type of subject card - determines the query parameter that will be used */
  type?: 'subject' | 'category';
  /** Code identifier for the subject or category (e.g., "Mat" for Математика) */
  code: string;
}

export function SubjectCard({ title, link, children, type = 'subject', code }: SubjectCardProps) {
  // Add query parameter based on type and code
  const href = link.includes('?') 
    ? `${link}&${type}=${encodeURIComponent(code)}` 
    : `${link}?${type}=${encodeURIComponent(code)}`;
    
  return (
    <div className="flex flex-col items-center p-8 gap-4 bg-white-bg rounded-small shadow-double border-t-[5px] border-accent">
      {children}
      <h4 className="text-[30px]">{title}</h4>
      <SecondaryButton href={href}>Перейти</SecondaryButton>
    </div>
  );
} 