import Avatar from "public/assets/avatars/Avatars"
import { PrimaryButton } from "@/components/ui/button";
interface ChatCardProps {
    name?: string;
    title?: string;
    avartarId?: 1 | 2 | 3 | 4 | 5 | 6;
    customAvatar?: React.ReactNode;
}
export default function ChatCard({...props}: ChatCardProps) {
    return (
        <div className="bg-white-bg p-6 flex gap-4 shadow-double rounded-medium text-left items-center w-full">
            <Avatar id={props.avartarId} size={100}></Avatar>
            <div className="flex flex-col justify-between w-full">
                <h4>Петро Петров</h4>
                <div className="flex justify-between items-center w-full">
                    <h6>Підготовка до ЗНО з математики</h6>
                    <PrimaryButton>Перейти</PrimaryButton>
                </div>
            </div>

        </div>
    )
}