import Image from 'next/image';

interface BenefitCardProps {
  title: string;
  imgSrc: string;
  color?: 'primary' | 'secondary' | 'accent' | 'default';
}

export function BenefitCard({ title, imgSrc, color = 'default' }: BenefitCardProps) {
  const colorClasses = {
    primary: 'bg-primary text-rich-black',
    secondary: 'bg-secondary text-rich-black',
    accent: 'bg-accent text-rich-black',
    default: 'bg-white-bg text-rich-black'
  };

  return (
    <div 
      className={`h-[700px] w-[316px] border-t-8 border-dark-gray rounded-b-[316px]
      flex flex-col gap-6 overflow-hidden ${colorClasses[color]}`}
    >
      <h2 className="pt-6 px-4">{title}</h2>
      <div className="w-full h-auto">
        <Image 
          src={imgSrc} 
          alt={title}
          width={316}
          height={316}
          className="w-full h-[316px] object-cover"
        />
      </div>
    </div>
  );
} 