"use client"
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import OrderCard from "@/components/cards/order-card";
import Pagination from "@/components/layout/pagination";
export default function SavedOrders() {
    return (
        <PageWrapper>
            <Section title="Збережені замовлення" >
               <div className="grid grid-cols-2 gap-5">
                   <OrderCard variant="full"></OrderCard>
                   <OrderCard variant="full"></OrderCard>
                   <OrderCard variant="full"></OrderCard>
                   <OrderCard variant="full"></OrderCard>
                   <OrderCard variant="full"></OrderCard>
                   <OrderCard variant="full"></OrderCard>
                   <OrderCard variant="full"></OrderCard>
                   <OrderCard variant="full"></OrderCard>
               </div>
            <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
            </Section>
        </PageWrapper>
    )
}