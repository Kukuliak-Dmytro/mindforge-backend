"use client"
import { use} from 'react'
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section, SectionInvisible } from "@/components/layout/section";
import { PrimaryButton } from "@/components/ui/button";
import Avatar from "public/assets/avatars/Avatars";
import { SubjectSnippet } from "@/components/cards/subject-snippet";
import Icons from "@/components/ui/icons";
import { PriceCard } from "@/components/cards/price-card";
import { ReviewCard } from "@/components/cards/review-card";



export default function Page({ params }: { params: Promise<{ id: string }> }) {
    // Access the ID safely
    const { id } = use(params);
    // In a real implementation, you would fetch the specialist data based on the ID
    console.log("Specialist ID:", id);

    return (
        <PageWrapper>
            <SectionInvisible>
                <Section title="Профіль фахівця">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Avatar id={1} size={200} />
                        <h3>Смирнова Марія</h3>
                        <h4>5.0/5.0</h4>
                        <p>Відгуків: 23</p>
                        <p className="text-sm">На сайті з 23.01.23</p>
                        <PrimaryButton size="large">Запропонувати замовлення</PrimaryButton>
                    </div>
                </Section>
                
                <Section>
                    <div className="flex justify-between gap-[120px]">
                        <div className="flex flex-col gap-4 w-full">
                            <h3>Предмети</h3>
                            <div className="grid gap-3">
                                <SubjectSnippet title='Математика' icon='Mat'></SubjectSnippet>
                                <SubjectSnippet title='Хімія' icon='Che' ></SubjectSnippet>
                                <SubjectSnippet title='Фізика' icon='Phy' ></SubjectSnippet>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <h3>Категорії</h3>
                            <div className="grid gap-3">
                                <SubjectSnippet title='Репетиторство' icon='TT' ></SubjectSnippet>
                                <SubjectSnippet title='Домашні роботи' icon='HW' ></SubjectSnippet>
                                <SubjectSnippet title='Пояснення складних тем' icon='DT'></SubjectSnippet>
                            </div>
                        </div>
                    </div>
                </Section>
                
                <Section>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="relative w-max h-[30px]">
                                <h4 className="z-10 relative">Освіта:</h4>
                                <span className="absolute z-0 bg-accent w-[calc(100%+72px)] h-[30px] top-0 left-[-60px] rounded-r-md"></span>
                            </div>
                            <div className="flex justify-between">
                                <p>Ступінь бакалавра в галузі Математики</p>
                                <h5>2021-2025</h5>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <div className="relative w-max h-[30px]">
                                <h4 className="z-10 relative">Досвід:</h4>
                                <span className="absolute z-0 bg-accent w-[calc(100%+72px)] h-[30px] top-0 left-[-60px] rounded-r-md"></span>
                            </div>
                            <div className="flex justify-between">
                                <p>Викладання математики онлайн</p>
                                <h5>2024-2025</h5>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <div className="relative w-max h-[30px]">
                                <h4 className="z-10 relative">Робота в MindForge</h4>
                                <span className="absolute z-0 bg-accent w-[calc(100%+72px)] h-[30px] top-0 left-[-60px] rounded-r-md"></span>
                            </div>
                            <div className="flex justify-between">
                                <p>Початок роботи</p>
                                <h5>23.01.2023</h5>
                            </div>
                            <div className="flex justify-between">
                                <p>Кількість виконаних замовлень:</p>
                                <h5>33</h5>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <div className="relative w-max h-[30px]">
                                <h4 className="z-10 relative">Про себе - методика викладання:</h4>
                                <span className="absolute z-0 bg-accent w-[calc(100%+72px)] h-[30px] top-0 left-[-60px] rounded-r-md"></span>
                            </div>
                            <p>Я підходжу до кожного студента з урахуванням його рівня знань та навчальних потреб, створюючи персоналізовані програми, щоб допомогти досягти найкращих результатів.</p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <div className="relative w-max h-[30px]">
                                <h4 className="z-10 relative">Про себе - детально:</h4>
                                <span className="absolute z-0 bg-accent w-[calc(100%+72px)] h-[30px] top-0 left-[-60px] rounded-r-md"></span>
                            </div>
                            <p>Я, Смирнова Марія Олексіївна, маю ступінь бакалавра в галузі математики і вже більше року займаюся викладанням математики онлайн. Моя професія — це не просто робота, а покликання. Я щиро вірю, що математичні знання є фундаментом для розвитку мислення та здатності розв'язувати складні завдання. Викладаючи математику, я завжди намагаюся зробити цей процес максимально зрозумілим і доступним для моїх учнів, застосовуючи індивідуальний підхід до кожного.</p>
                            <p>З 2024 року я почала викладати онлайн, що дозволило мені ще більше розвинути свої педагогічні навички та вміння працювати з різними форматами навчання. В процесі роботи я завжди орієнтуюсь на результат, прагну донести до студентів не лише знання, але й впевненість у своїх силах для подолання складних завдань.</p>
                            <p>Моє хобі — шахи, яке дозволяє тренувати логіку і стратегічне мислення. Я вважаю, що цей вид діяльності дуже добре поєднується з викладанням математики, оскільки допомагає розвивати здатність до планування та аналізу, що є важливими як в шахах, так і в процесі навчання.</p>
                        </div>
                    </div>
                </Section>
                
                <Section>
                    <div className="flex flex-col gap-4">
                        <h3>Вартість послуг</h3>
                        <div className="flex flex-col gap-2">
                            <PriceCard title="Репетиторство з математики (1 год)" price={450} />
                            <PriceCard title="Репетиторство з фізики (1 год)" price={475} />
                            <PriceCard title="Репетиторство з хімії (1 год)" price={500} />
                            <PriceCard title="Пояснення складних тем з математики (1 тема)" price={350} />
                            <PriceCard title="Пояснення складних тем з фізики (1 тема)" price={375} />
                            <PriceCard title="Пояснення складних тем з хімії (1 тема)" price={400} />
                            <PriceCard title="Допомога зі складними завданнями з математики (1 завдання)" price={250} />
                            <PriceCard title="Допомога зі складними завданнями з фізики (1 завдання)" price={275} />
                            <PriceCard title="Допомога зі складними завданнями з хімії (1 завдання)" price={300} />
                        </div>
                    </div>
                </Section>
                
                <Section>
                    <div className="flex flex-col gap-4">
                        <h3>Відгуки</h3>
                        <div className="flex flex-col gap-4">
                            <ReviewCard 
                                author="Олена" 
                                date="21.01.2024" 
                                customAvatar={<Avatar id={2} size={100} />}
                                content="Дуже задоволена заняттями! Репетитор знайшов підхід до моєї дитини, і вже через кілька тижнів ми побачили прогрес у математиці." 
                                rating={4.5}
                            />
                            <ReviewCard 
                                author="Артем" 
                                date="16.06.23" 
                                customAvatar={<Avatar id={3} size={100} />}
                                content="Замовив допомогу з контрольними завданнями з фізики. Все зробили якісно та вчасно, хоча хотілося трохи детальніших пояснень." 
                                rating={5.0}
                            />
                            <ReviewCard 
                                author="Анастасія" 
                                date="28.01.25" 
                                customAvatar={<Avatar id={4} size={100} />}
                                content="Дуже дякую за пояснення складних тем з програмування! Тепер цикли та функції стали для мене зрозумілими. Рекомендую всім!" 
                                rating={4.0}
                            />
                        </div>
                    </div>
                </Section>
            </SectionInvisible>
        </PageWrapper>
    );
} 