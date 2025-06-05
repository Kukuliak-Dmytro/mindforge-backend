import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import { PrimaryButton, SecondaryButton, DangerButton } from "@/components/ui/button";
import { EmployeeCard } from "@/components/cards/employee-card";
export default function OrderPage() {
    return (
        <PageWrapper>
            <Section title="Моє замовлення">
                <div className="controls flex justify-between items-center w-full border-b-2 border-rich-black pb-8">
                    <SecondaryButton>Назад</SecondaryButton>
                    <div className="flex gap-4">
                        <PrimaryButton>Редагувати</PrimaryButton>
                        <DangerButton>Видалити</DangerButton>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <h1>Підготовка до ЗНО з математики</h1>
                    <h2>400 грн/год</h2>
                    <h5>Математика  - Репетиторство</h5>
                    <p className="p2">28 січня 2025</p>
                    <span>
                        <h5>Ім’я замовника</h5>
                        <p>Потрібен репетитор для підготовки до ЗНО з математики. Основна увага – задачі з параметрами, логарифми та геометрія. Заняття двічі на тиждень по 1,5 години.</p>
                    </span>
                    <h5>1 червня 2025</h5>
                </div>
                <div>
                    <h2>Виконує</h2>
                    <EmployeeCard
                        name="Смирнова Марія"
                        rating='4.9/5'
                        avatarId={1}
                        education="Магістр з інформатики, сертифікат з академічного письма"
                        worksSince="На сайті з 14.01"
                        description="Я професійно допомагаю студентам на всіх етапах написання дипломних робіт: від вибору теми та планування до написання та оформлення роботи відповідно до вимог ВНЗ."
                    />
                </div>
            </Section>
        </PageWrapper>
    )
}