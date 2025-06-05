"use client";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import OrderCard from "@/components/cards/order-card";
import { SecondaryButton } from "@/components/ui/button";
import { PrimaryButton } from "@/components/ui/button";
import Pagination from "@/components/layout/pagination";

export default function Orders() {
    return (
        <PageWrapper>
          
            <Section title="Мої замовлення" className="flex flex-col gap-8">
                <div className="flex  gap-4">
                    <PrimaryButton >В процесі</PrimaryButton>
                    <SecondaryButton>Виконані</SecondaryButton>
                </div>
                <div className="flex flex-col gap-6 mt-4">
                    <OrderCard></OrderCard>
                    <OrderCard></OrderCard>
                    <OrderCard></OrderCard>
                </div>
                <Pagination totalPages={5} currentPage={2} onPageChange={()=>{}}></Pagination>
            </Section>
            
            
        </PageWrapper>
    )
}
