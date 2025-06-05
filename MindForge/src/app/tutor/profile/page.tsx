"use client";

import { useState, useMemo } from "react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { InputText } from "@/components/ui/input-text";
import { Textarea } from "@/components/ui/textarea";
import Avatar from "public/assets/avatars/Avatars";
import { useFormState } from "@/lib/hooks/use-form-state";
import { Separator } from "@/components/ui/separator";
import { useProfile } from "@/hooks/use-profile";
import { useTutorProfile } from "@/hooks/use-tutor-profile";
import { EducationSection } from "./components/education-section";
import { ExperienceSection } from "./components/experience-section";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSubjects, getCategories, type Subject, type Category } from "@/services/subjects";
import React from "react";
import { AvatarPicker } from '@/components/ui/avatar-picker';

export default function TutorProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const { data: profile, isLoading } = useProfile();
    const queryClient = useQueryClient();
    const { updateProfile } = useTutorProfile();
    
    // Fetch available subjects and categories
    const { data: subjectsResponse } = useQuery({
        queryKey: ['subjects'],
        queryFn: getSubjects
    });

    const { data: categoriesResponse } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    });

    const subjects = subjectsResponse?.data || [];
    const categories = categoriesResponse?.data || [];
    
    // Initialize form state with memoized values
    const initialFormState = useMemo(() => ({
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
        email: profile?.email || "",
        bio: profile?.profile?.bio || "",
        phone: profile?.profile?.phone || "",
    }), [profile?.firstName, profile?.lastName, profile?.email, profile?.profile?.bio, profile?.profile?.phone]);

    const { formState, handleChange, resetForm, updateField } = useFormState(initialFormState);

    // Only update form when entering edit mode or when profile first loads
    React.useEffect(() => {
        if (profile && !isEditing) {
            resetForm();
        }
    }, [profile, isEditing, resetForm]);

    const [showAvatarPicker, setShowAvatarPicker] = useState(false);

    // Wrap mutation with onSuccess for immediate UI update
    const handleSave = () => {
        if (!profile) return;
        // Compare formState to profile, skip update if nothing changed
        const hasChanges =
            formState.firstName !== profile.firstName ||
            formState.lastName !== profile.lastName ||
            formState.email !== profile.email ||
            formState.bio !== (profile.profile?.bio || "") ||
            formState.phone !== (profile.profile?.phone || "");

        if (!hasChanges) {
            setIsEditing(false);
            return;
        }

        updateProfile.mutate(
            {
                firstName: formState.firstName,
                lastName: formState.lastName,
                email: formState.email,
                bio: formState.bio,
                phone: formState.phone
            },
            {
                onSuccess: (updatedProfile) => {
                    // Optimistically update the cache for both queries
                    queryClient.setQueryData(['profile', 'detail'], (old: any) => ({
                        ...old,
                        firstName: formState.firstName,
                        lastName: formState.lastName,
                        email: formState.email,
                        profile: {
                            ...old?.profile,
                            bio: formState.bio,
                            phone: formState.phone
                        }
                    }));
                    queryClient.setQueryData(['tutor-profile', 'detail'], (old: any) => ({
                        ...old,
                        firstName: formState.firstName,
                        lastName: formState.lastName,
                        email: formState.email,
                        profile: {
                            ...old?.profile,
                            bio: formState.bio,
                            phone: formState.phone
                        }
                    }));
                    // Invalidate queries to ensure eventual consistency
                    queryClient.invalidateQueries({ queryKey: ['profile'] });
                    queryClient.invalidateQueries({ queryKey: ['tutor-profile'] });
                    setIsEditing(false);
                },
                onError: (error) => {
                    console.error('Error updating profile:', error);
                }
            }
        );
    };

    const handleCancel = () => {
        resetForm();
        setIsEditing(false);
    };

    const handleEdit = () => {
        if (profile) {
            updateField('firstName', profile.firstName);
            updateField('lastName', profile.lastName);
            updateField('email', profile.email);
            updateField('bio', profile.profile?.bio || '');
            updateField('phone', profile.profile?.phone || '');
        }
        setIsEditing(true);
    };

    // Add avatar update logic
    const handleAvatarSave = (avatarUrl: string) => {
        if (!profile) return;
        updateProfile.mutate(
            { avatarUrl } as any,
            {
                onSuccess: () => {
                    queryClient.setQueryData(['profile', 'detail'], (old: any) => ({
                        ...old,
                        avatarUrl,
                        tutorProfile: {
                            ...old?.tutorProfile,
                            user: {
                                ...old?.tutorProfile?.user,
                                avatarUrl,
                            },
                        },
                    }));
                    queryClient.setQueryData(['tutor-profile', 'detail'], (old: any) => ({
                        ...old,
                        user: {
                            ...old?.user,
                            avatarUrl,
                        },
                    }));
                    queryClient.invalidateQueries({ queryKey: ['profile'] });
                    queryClient.invalidateQueries({ queryKey: ['tutor-profile'] });
                    setShowAvatarPicker(false);
                },
                onError: (error) => {
                    console.error('Error updating avatar:', error);
                },
            }
        );
    };

    const sharedFieldStyles = "w-full bg-white-bg shadow-small rounded-medium";

    if (isLoading) {
        return (
            <PageWrapper>
                <Section title="Мій профіль">
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                </Section>
            </PageWrapper>
        );
    }

    if (!profile || !('tutorProfile' in profile)) {
        return (
            <PageWrapper>
                <Section title="Мій профіль">
                    <div className="text-center py-8">
                        <p className="text-red-500">Помилка завантаження профілю</p>
                    </div>
                </Section>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <Section title="Мій профіль">
                <div className="flex gap-[60px]">
                    <div className="flex flex-col items-center w-[200px] gap-4">
                        {showAvatarPicker ? (
                            <AvatarPicker
                                currentAvatarUrl={profile.avatarUrl}
                                onSave={handleAvatarSave}
                                onCancel={() => setShowAvatarPicker(false)}
                            />
                        ) : (
                            <>
                                <Avatar id={(() => {
                                    // Map avatarUrl to id for Avatar component
                                    const url = profile.avatarUrl;
                                    if (!url) return undefined;
                                    const match = url.match(/avatarImg(\d)\.png$/);
                                    const id = match ? Number(match[1]) : undefined;
                                    return id && id >= 1 && id <= 6 ? (id as 1|2|3|4|5|6) : undefined;
                                })()} size={140} />
                                <div className="flex flex-col gap-2">
                                    <PrimaryButton onClick={() => setShowAvatarPicker(true)}>
                                        Змінити
                                    </PrimaryButton>
                                </div>
                            </>
                        )}
                        {updateProfile.isPending && showAvatarPicker && (
                            <div className="text-center text-primary mt-2">Оновлення...</div>
                        )}
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-6">
                                <InputText
                                    value={formState.firstName}
                                    id="firstName"
                                    title="Ім'я"
                                    placeholder="Ваше ім'я"
                                    onChange={handleChange}
                                    className={sharedFieldStyles}
                                    readOnly={!isEditing}
                                />
                                <InputText
                                    value={formState.lastName}
                                    id="lastName"
                                    title="Прізвище"
                                    placeholder="Ваше прізвище"
                                    onChange={handleChange}
                                    className={sharedFieldStyles}
                                    readOnly={!isEditing}
                                />
                                <InputText
                                    value={formState.phone}
                                    id="phone"
                                    title="Телефон"
                                    placeholder="Ваш телефон"
                                    onChange={handleChange}
                                    type="tel"
                                    className={sharedFieldStyles}
                                    readOnly={!isEditing}
                                />
                                <InputText
                                    value={formState.email}
                                    id="email"
                                    title="Email"
                                    placeholder="Ваш Email"
                                    onChange={handleChange}
                                    type="email"
                                    className={sharedFieldStyles}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <Textarea
                                value={formState.bio}
                                id="bio"
                                title="Біографія"
                                placeholder="Розкажіть про себе"
                                onChange={handleChange}
                                className={`min-h-[200px] ${sharedFieldStyles} p-4`}
                                readOnly={!isEditing}
                            />
                            <div className="flex w-full justify-end gap-4">
                                {isEditing ? (
                                    <>
                                        <SecondaryButton onClick={handleCancel}>Скасувати</SecondaryButton>
                                        <PrimaryButton 
                                            onClick={handleSave}
                                            disabled={updateProfile.isPending}
                                        >
                                            {updateProfile.isPending ? 'Збереження...' : 'Зберегти'}
                                        </PrimaryButton>
                                    </>
                                ) : (
                                    <PrimaryButton onClick={handleEdit}>
                                        Редагувати
                                    </PrimaryButton>
                                )}
                            </div>
                        </div>
                        <Separator />
                        
                    </div>
                    
                </div>
                <EducationSection education={profile.tutorProfile.education} />
                <ExperienceSection experiences={profile.tutorProfile.experiences} />
            </Section>
            
        </PageWrapper>
    );
}
