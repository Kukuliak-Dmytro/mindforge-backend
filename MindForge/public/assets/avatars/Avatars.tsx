interface avatarProps {
    id?: 1 | 2 | 3 | 4 | 5 | 6;
    size?: number;
}
import Image from 'next/image';
import avatarImg0 from './avatarImg0.png';
import avatarImg1 from './avatarImg1.png';
import avatarImg2 from './avatarImg2.png';
import avatarImg3 from './avatarImg3.png';
import avatarImg4 from './avatarImg4.png';
import avatarImg5 from './avatarImg5.png';
import avatarImg6 from './avatarImg6.png';

export default function Avatar({ id, size }: avatarProps) {
    switch (id) {
        case 1:
            return <Image src={avatarImg1} alt="" width={size || 40} height={size || 40} />
        case 2:
            return <Image src={avatarImg2} alt="" width={size || 40} height={size || 40} />
        case 3:
            return <Image src={avatarImg3} alt="" width={size || 40} height={size || 40} />
        case 4:
            return <Image src={avatarImg4} alt="" width={size || 40} height={size || 40} />
        case 5:
            return <Image src={avatarImg5} alt="" width={size || 40} height={size || 40} />
        case 6:
            return <Image src={avatarImg6} alt="" width={size || 40} height={size || 40} />
        default:
            return <Image src={avatarImg0} alt="" width={size || 40} height={size || 40} />
    }
}