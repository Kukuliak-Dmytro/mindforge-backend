import { ReactNode } from 'react';
import Avatar from '../../../public/assets/avatars/Avatars';

interface ReviewCardProps {
  author: string;
  rating: number;
  date: string;
  content: string;
  avatarId?: 1 | 2 | 3 | 4 | 5 | 6;
  customAvatar?: ReactNode;
}

export function ReviewCard({ 
  author, 
  rating, 
  date, 
  content, 
  avatarId, 
  customAvatar 
}: ReviewCardProps) {
  return (
    <div className="flex items-center gap-6 p-6 bg-white-bg rounded-medium shadow-double">
      {customAvatar || (avatarId && <Avatar id={avatarId} size={80} />)}
      
      <div className="flex flex-col gap-2">
        <span className="flex justify-between items-center">
          <h4>{author}</h4>
          <p className='p2'>{date}</p>
        </span>
        <h5>{rating}/5</h5>
        <p>{content}</p>
      </div>
    </div>
  );
} 