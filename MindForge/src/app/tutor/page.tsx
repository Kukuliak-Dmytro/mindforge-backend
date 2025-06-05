import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import Image from "next/image";
import { SubjectSnippet } from "@/components/cards/subject-snippet";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { StepCard } from "@/components/cards/step-card";
import { BenefitCard } from "@/components/cards/benefit-card";
 export default function Employer() {
    return (
        <PageWrapper>
            <Section className="flex flex-col lg:flex-row gap-8">
                <div className="hidden lg:block lg:mt-[-60px] lg:mb-[-60px]">
                    <Image
                        src="/assets/images/heroImgTutor.png"
                        alt="Employer"
                        width={600}
                        height={500}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-center lg:text-left">Почни заробляти зараз</h1>
                    <div className="flex flex-col gap-2 mb-4">
                        <SubjectSnippet variant="Inverse" title="Репетиторство" icon="TT" />
                        <SubjectSnippet variant="Inverse" title="Домашні роботи" icon="HW" />
                        <SubjectSnippet variant="Inverse" title="Контрольні роботи" icon="KR" />
                        <SubjectSnippet variant="Inverse" title="Комплексні теми" icon="DT" />
                        <SubjectSnippet variant="Inverse" title="Дипломні роботи" icon="DR" />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <PrimaryButton className="!w-full sm:w-auto">Зареєструватися</PrimaryButton>
                        <SecondaryButton className="!w-full sm:w-auto">Каталог замовлень</SecondaryButton>
                    </div>
                </div>
            </Section>
            <Section className="flex flex-col gap-[60px] text-center">
                <h1>Як це працює:</h1>
                <div className="flex flex-col gap-6">
                    <StepCard
                        title="Створюйте акаунт"
                        content="Вкажіть всю релевантну інформацію про себе. Особливо важливо додати освіту та сертифікати"
                        step={1}>
                        <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M77.5 54.25C79.6401 54.25 81.375 55.9849 81.375 58.125V73.625C81.375 75.6804 80.5585 77.6517 79.1051 79.1051C77.6517 80.5585 75.6804 81.375 73.625 81.375H19.375C17.3196 81.375 15.3483 80.5585 13.8949 79.1051C12.4415 77.6517 11.625 75.6804 11.625 73.625V19.375C11.625 17.3196 12.4415 15.3483 13.8949 13.8949C15.3483 12.4415 17.3196 11.625 19.375 11.625H34.875C37.0151 11.625 38.75 13.3599 38.75 15.5C38.75 17.6401 37.0151 19.375 34.875 19.375H25.375C22.0613 19.375 19.375 22.0613 19.375 25.375V67.625C19.375 70.9387 22.0613 73.625 25.375 73.625H67.625C70.9387 73.625 73.625 70.9387 73.625 67.625V58.125C73.625 55.9849 75.3599 54.25 77.5 54.25Z" fill="black" />
                            <path d="M79 29.1014C73.9253 29.1014 70.6197 29.1014 65.25 29.1014C65.25 29.1014 65.25 18.9181 65.25 15.3695C65.25 9.87682 57.5 9.87683 57.5 15.3695C57.5 18.1159 57.5 29.1014 57.5 29.1014C57.5 29.1014 47 29.1014 43 29.1014C38 29.1014 38 37.6152 43 37.6152C50.2637 37.6152 57.5 37.6152 57.5 37.6152C57.5 37.6152 57.5 46.1289 57.5 51.0724C57.5 56.0159 65.25 56.0159 65.25 51.0724C65.25 46.3664 65.25 37.6152 65.25 37.6152C65.25 37.6152 75 37.6152 79 37.6152C84 37.6152 84.0747 29.1014 79 29.1014Z" fill="black" />
                        </svg>
                    </StepCard>
                    <StepCard
                        title="Розміщуйте профіль"
                        content="Дані про вас будуть відображені при пошуку на нашму сайті. Тому важливо, щоб профіль був привабливим для замовника"
                        step={2}>
                        <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.625 45.9188L35.3594 53.1844C34.5844 53.9594 33.6647 54.3314 32.6004 54.3004C31.536 54.2694 30.6151 53.8651 29.8375 53.0875C29.1271 52.3125 28.7551 51.4083 28.7215 50.375C28.6879 49.3417 29.0599 48.4375 29.8375 47.6625L43.7875 33.7125C44.175 33.325 44.5948 33.0512 45.0469 32.891C45.499 32.7308 45.9833 32.6495 46.5 32.6469C47.0167 32.6443 47.501 32.7257 47.9531 32.891C48.4052 33.0563 48.825 33.3302 49.2125 33.7125L63.1625 47.6625C63.9375 48.4375 64.3095 49.3417 64.2785 50.375C64.2475 51.4083 63.8755 52.3125 63.1625 53.0875C62.3875 53.8625 61.4678 54.2668 60.4035 54.3004C59.3392 54.334 58.4182 53.962 57.6406 53.1844L50.375 45.9188V73.625C50.375 74.7229 50.003 75.6439 49.259 76.3879C48.515 77.1319 47.5953 77.5026 46.5 77.5C45.4047 77.4974 44.485 77.1254 43.741 76.384C42.997 75.6426 42.625 74.7229 42.625 73.625V45.9188ZM15.5 31V23.25C15.5 21.1188 16.2595 19.2949 17.7785 17.7785C19.2975 16.2621 21.1213 15.5026 23.25 15.5H69.75C71.8812 15.5 73.7064 16.2595 75.2254 17.7785C76.7444 19.2975 77.5026 21.1213 77.5 23.25V31C77.5 32.0979 77.128 33.0189 76.384 33.7629C75.64 34.5069 74.7203 34.8776 73.625 34.875C72.5297 34.8724 71.61 34.5004 70.866 33.759C70.122 33.0176 69.75 32.0979 69.75 31V23.25H23.25V31C23.25 32.0979 22.878 33.0189 22.134 33.7629C21.39 34.5069 20.4703 34.8776 19.375 34.875C18.2797 34.8724 17.36 34.5004 16.616 33.759C15.872 33.0176 15.5 32.0979 15.5 31Z" fill="black" />
                        </svg>
                    </StepCard>
                    <StepCard
                        title="Пропонуйте свої послуги"
                        content="Шукайте підходяще замовлення в каталозі, і запропонуйте виконання. Якщо клієнт погодиться - ось і ваше замолвення!"
                        step={3}>
                        <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M54.4753 14.0908V41.0138M54.4753 14.0908L46.3983 3.32153M54.4753 14.0908L62.5522 3.32153M3.32141 59.86L16.4814 70.8231C18.4167 72.4344 20.8555 73.3165 23.3737 73.3161H58.0614C60.5383 73.3161 62.5522 71.3077 62.5522 68.8308C62.5522 63.8769 58.5353 59.8546 53.576 59.8546H29.4583M73.3214 14.0908H35.6291V41.0138H73.3214V14.0908Z" stroke="black" strokeWidth="6.64286" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19.4753 54.4755L23.5137 58.5139C24.5848 59.585 26.0375 60.1867 27.5522 60.1867C29.0669 60.1867 30.5196 59.585 31.5906 58.5139C32.6617 57.4429 33.2634 55.9902 33.2634 54.4755C33.2634 52.9607 32.6617 51.5081 31.5906 50.437L25.3229 44.1639C24.3214 43.1635 23.1325 42.3704 21.8242 41.8299C20.5159 41.2894 19.1139 41.0121 17.6983 41.0139H3.32141" stroke="black" strokeWidth="6.64286" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </StepCard>
                </div>
            </Section>
            <Section>
                <div className="flex flex-col gap-12 items-center text-center">
                    <h1>З нашим сервісом знаходити клієнтів</h1>

                    <div className="flex flex-wrap justify-center gap-8">
                        <BenefitCard
                            title="Швидко"
                            imgSrc="/assets/images/benefitsImg1.png"
                            color="primary"
                        />
                        <BenefitCard
                            title="Просто"
                            imgSrc="/assets/images/benefitsImg2.png"
                            color="secondary"
                        />
                        <BenefitCard
                            title="Ефективно"
                            imgSrc="/assets/images/benefitsImg3.png"
                            color="accent"
                        />
                    </div>

                    <PrimaryButton size="large" className="w-full max-w-[500px]">Каталог замовлень</PrimaryButton>
                </div>
            </Section>
            <Section className="grid gap-[60px] text-center">
                <h1>Доєднуйся до команди MindForge</h1>

                {/* Stats grid replacing resizable panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First row */}
                    <div className="flex p-6 bg-white-bg rounded-medium items-center shadow-md mx-auto w-auto">
                        <div className="relative">
                            <h1 className="!text-[72px] text-gray-700">1032</h1>
                            <h1 className="!text-[72px] absolute left-[3px] top-[-3px]">1032</h1>
                        </div>
                        <div className="ml-4">
                            <h4 className="text-right">Активних фахівців на Sapione</h4>
                        </div>
                    </div>

                    <div className="flex p-6 bg-white-bg rounded-medium items-center shadow-md mx-auto w-auto">
                        <div className="relative">
                            <h1 className="!text-[72px] text-gray-700">123</h1>
                            <h1 className="!text-[72px] absolute left-[3px] top-[-3px]">123</h1>
                        </div>
                        <div className="ml-4">
                            <h4 className="text-right">Нових замовлень щоденно</h4>
                        </div>
                    </div>

                    {/* Second row */}
                    <div className="flex p-6 bg-white-bg rounded-medium items-center shadow-md mx-auto w-auto">
                        <div className="relative">
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M64 10H8C5.87827 10 3.84344 10.8429 2.34315 12.3431C0.842855 13.8434 0 15.8783 0 18L0 36H72V18C72 15.8783 71.1571 13.8434 69.6569 12.3431C68.1566 10.8429 66.1217 10 64 10Z" fill="#005BBB" />
                                <path d="M72 54C72 56.1217 71.1571 58.1566 69.6569 59.6569C68.1566 61.1571 66.1217 62 64 62H8C5.87827 62 3.84344 61.1571 2.34315 59.6569C0.842855 58.1566 0 56.1217 0 54V36H72V54Z" fill="#FFD500" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h4 className="text-right">Спеціалісти з усіх областей України</h4>
                        </div>
                    </div>

                    <div className="flex p-6 bg-white-bg rounded-medium items-center shadow-md mx-auto w-auto">
                        <div className="relative">
                            <h1 className="!text-[72px] text-gray-700">13423</h1>
                            <h1 className="!text-[72px] absolute left-[3px] top-[-3px]">13423</h1>
                        </div>
                        <div className="ml-4">
                            <h4 className="text-right">Виконаних замовлень</h4>
                        </div>
                    </div>
                </div>
            </Section>

            <Section>
                <div className="flex items-center justify-between pb-8 border-b-2 border-rich-black">
                    <h2>Допоможи людям кувати знання!</h2>
                    <PrimaryButton size={"large"}> Реєстрація</PrimaryButton>
                </div>
                


            </Section>
        </PageWrapper>
    )
}