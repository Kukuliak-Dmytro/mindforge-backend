import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import ChatCard from "@/components/cards/chat-card";
export default function ChatsPage() {
  
    return (
        <PageWrapper>
            <Section title="Мої чати" className="flex flex-col gap-8">
                <div className="flex flex-col gap-6 mt-4">
                    <ChatCard avartarId={2}></ChatCard>
                    <ChatCard avartarId={1}></ChatCard>
                    <ChatCard avartarId={3}></ChatCard>
                </div>
            </Section>
        </PageWrapper>
    )
}