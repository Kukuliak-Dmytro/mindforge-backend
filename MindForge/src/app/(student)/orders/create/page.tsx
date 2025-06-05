'use client'
import { Section } from "@/components/layout/section";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { InputText } from "@/components/ui/input-text";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { createOrder, getCategories, getSubjects } from "@/services/subjects";
import type { Category, Subject } from "@/services/subjects";

export default function CreateOrder() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [sessionsCount, setSessionsCount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingOptions, setLoadingOptions] = useState(true);

    useEffect(() => {
        async function fetchOptions() {
            setLoadingOptions(true);
            try {
                const subjectsRes = await getSubjects();
                setSubjects(subjectsRes.data);
                const categoriesRes = await getCategories();
                setCategories(categoriesRes.data);
            } catch (err) {
                setError("Не вдалося завантажити предмети або категорії.");
            } finally {
                setLoadingOptions(false);
            }
        }
        fetchOptions();
    }, []);

    const selectedCategory = categories.find(c => c.id === categoryId);
    const isRecurring = selectedCategory?.isRecurring;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            const orderPayload: any = {
                title,
                description,
                subjectId,
                categoryId,
                totalPrice: Number(totalPrice),
            };
            if (isRecurring) {
                orderPayload.sessionsCount = Number(sessionsCount);
            }
            await createOrder(orderPayload);
            setSuccess(true);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Сталася помилка при створенні замовлення.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper>
            <Section title="Створити замовлення" className="flex flex-col gap-4">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <InputText
                        title="Назва"
                        placeholder="Допомога з тригонометрією"
                        id="name"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Textarea
                        title="Опис"
                        placeholder="Пояснити всі теми тригонометрії"
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className="flex flex-col">
                        <label htmlFor="subject-select" className="pl-4 pb-1">Предмет</label>
                        <Select value={subjectId} onValueChange={setSubjectId} disabled={loadingOptions}>
                            <SelectTrigger className="w-full h-[50px] rounded-medium px-4 text-base border border-primary-border shadow-small focus:outline-none focus:ring-2 focus:ring-accent" id="subject-select">
                                <SelectValue placeholder={loadingOptions ? "Завантаження..." : "Виберіть предмет"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Предмети</SelectLabel>
                                    {subjects.map(s => (
                                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category-select" className="pl-4 pb-1">Категорія</label>
                        <Select value={categoryId} onValueChange={setCategoryId} disabled={loadingOptions}>
                            <SelectTrigger className="w-full h-[50px] rounded-medium px-4 text-base border border-primary-border shadow-small focus:outline-none focus:ring-2 focus:ring-accent" id="category-select">
                                <SelectValue placeholder={loadingOptions ? "Завантаження..." : "Виберіть категорію"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Категорії</SelectLabel>
                                    {categories.map(c => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <InputText
                        placeholder="Ціна"
                        title="Ціна"
                        id="price"
                        value={totalPrice}
                        onChange={e => setTotalPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                    />
                    {isRecurring && (
                        <InputText
                            placeholder="Кількість занять"
                            title="Кількість занять"
                            id="sessionsCount"
                            value={sessionsCount}
                            onChange={e => setSessionsCount(e.target.value.replace(/[^0-9]/g, ""))}
                        />
                    )}
                    <Button type="submit" disabled={loading || loadingOptions}>{loading ? "Створення..." : "Розмістити замовлення"}</Button>
                    {success && <div className="text-green-600">Замовлення успішно створено!</div>}
                    {error && <div className="text-red-600">{error}</div>}
                </form>
            </Section>
        </PageWrapper>
    );
}