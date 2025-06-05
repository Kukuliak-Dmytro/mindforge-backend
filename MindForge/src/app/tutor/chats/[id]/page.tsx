import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import MessageCard from "@/components/cards/message-card";
import Avatar from "public/assets/avatars/Avatars";
import { Textarea } from "@/components/ui/textarea";
import { PrimaryButton } from "@/components/ui/button";
export default function Chat() {
    return (
        <PageWrapper>
            <Section className="flex flex-col gap-8 relative">
                <div className="chat-banner flex gap-4 justify-between items-center w-full bg-white-bg p-6 shadow-double rounded-medium absolute left-0 top-0 mb-[200px]" >
                    <div className="flex gap-4 items-center">
                        <Avatar size={64} id={1}></Avatar>
                        <h4>Смирнова Марія</h4>
                    </div>
                    <p>Підготовка до ЗНО з математики</p>
                </div>
                <div className="my-[100px] flex flex-col gap-6">
                    <MessageCard sender={true}></MessageCard>
                    <MessageCard></MessageCard>
                    <MessageCard sender></MessageCard>
                    <MessageCard></MessageCard>
                    <MessageCard sender></MessageCard>
                </div>
                <div className="flex items-center w-full bg-white-bg p-6 shadow-double rounded-medium absolute left-0 bottom-0">
                    <div className="flex-grow mr-4">
                        <Textarea placeholder="Ваше повідомлення" id="message" className="w-full" />
                    </div>
                    <PrimaryButton size={"icon"} width={50} height={50}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.4 18.9315C6.06667 19.0648 5.75 19.0355 5.45 18.8435C5.15 18.6515 5 18.3725 5 18.0065V13.5065L13 11.5065L5 9.50648V5.00648C5 4.63982 5.15 4.36082 5.45 4.16948C5.75 3.97815 6.06667 3.94882 6.4 4.08148L21.8 10.5815C22.2167 10.7648 22.425 11.0732 22.425 11.5065C22.425 11.9398 22.2167 12.2482 21.8 12.4315L6.4 18.9315Z" fill="#0B0702" />
                        </svg>
                    </PrimaryButton>
                </div>
            </Section>
        </PageWrapper>
    )
}