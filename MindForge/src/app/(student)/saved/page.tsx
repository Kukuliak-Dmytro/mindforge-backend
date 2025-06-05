"use client";
import Pagination from "@/components/layout/pagination";
import { EmployeeCard } from "@/components/cards/employee-card";
import { Section } from "@/components/layout/section";
import { PageWrapper } from "@/components/layout/page-wrapper";

export default function SavedTutorsPage() {
    return (
        <PageWrapper >
            <Section title="Збережені фахівці">
                <div className="flex flex-col gap-4">
                    <EmployeeCard
                        name="ПІБ фахівця"
                        rating="4.5"
                        avatarId={1}
                        education="Вища освіта"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        worksSince="Працює з 2020 року"
                        saved={true}

                    />
                    <EmployeeCard
                        name="ПІБ фахівця"
                        rating="4.5"
                        avatarId={1}
                        education="Вища освіта"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut enim eu nunc efficitur varius. Tempor in ligula. Donec ut nunc id enim efficitur fringilla. Sed nec ligula a enim facilisis tincidunt. Donec ut nunc id enim efficitur fringilla. Sed nec ligula a enim facilisis tincidunt."
                        worksSince="Працює з 2020 року"
                        saved={false}

                    /><EmployeeCard
                        name="ПІБ фахівця"
                        rating="4.5"
                        avatarId={1}
                        education="Вища освіта"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        worksSince="Працює з 2020 року"
                        saved={true}

                    />
                </div>
                <Pagination totalPages={20} currentPage={2} onPageChange={()=>{console.log('Page changed!')}}></Pagination>
            </Section>
        </PageWrapper>
    );
}