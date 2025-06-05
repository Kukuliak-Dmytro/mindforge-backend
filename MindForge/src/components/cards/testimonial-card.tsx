import { ReactNode } from 'react';

interface TestimonialCardProps {
  name: string;
  rating: string;
  subject: string;
  description: string;
  author: string;
  children: ReactNode;
}

export function TestimonialCard({
  name,
  rating,
  subject,
  description,
  author,
  children
}: TestimonialCardProps) {
  return (
    <div className="p-6 bg-white-bg shadow-medium rounded-medium flex flex-col gap-4 relative">
      <div className="flex gap-3">
        <div className="avatar">
          {children}
        </div>
        <div className="flex flex-col gap-2">
          <h5>{name}</h5>
          <p>{rating}</p>
        </div>
      </div>
      
      <div className="subject">
        <h5>{subject}</h5>
      </div>
      
      <div className="min-h-[200px]">
        <p>{description}</p>
      </div>
      
      <div className="absolute right-0 bottom-6 py-0 pl-2 pr-6 bg-accent rounded-l-[6px]">
        <p className="p2">{author}</p>
      </div>
    </div>
  );
} 