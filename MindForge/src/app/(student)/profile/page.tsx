"use client"

import { useState, useMemo } from "react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section } from "@/components/layout/section";
import { PrimaryButton, SecondaryButton, DangerButton } from "@/components/ui/button";
import { InputText } from "@/components/ui/input-text";
import { Textarea } from "@/components/ui/textarea";
import Avatar from "public/assets/avatars/Avatars";
import { useFormState } from "@/lib/hooks/use-form-state";
import { useStudentProfile, useUpdateStudentProfile } from "@/hooks/use-student-profile";
import React from "react";
import { AvatarPicker } from '@/components/ui/avatar-picker';
import { useQueryClient } from '@tanstack/react-query';

export default function StudentProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const { data: profile, isLoading } = useStudentProfile();
    const updateProfile = useUpdateStudentProfile();
    const queryClient = useQueryClient();
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);
    
    // Initialize form state with memoized values, including bio
    const initialFormState = useMemo(() => ({
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
        email: profile?.email || "",
        phone: profile?.profile?.phone || "",
        bio: profile?.profile?.bio || "",
    }), [profile?.firstName, profile?.lastName, profile?.email, profile?.profile?.phone, profile?.profile?.bio]);

    const { formState, handleChange, resetForm, updateField } = useFormState(initialFormState);

    // Only update form when entering edit mode or when profile first loads
    React.useEffect(() => {
        if (profile && !isEditing) {
            resetForm();
        }
    }, [profile, isEditing, resetForm]);

    const handleSave = async () => {
        if (!profile) return;
        // Compare each field to see if it changed
        const changedFields: Record<string, any> = {};
        if (formState.firstName !== profile.firstName) changedFields.firstName = formState.firstName;
        if (formState.lastName !== profile.lastName) changedFields.lastName = formState.lastName;
        if (formState.email !== profile.email) changedFields.email = formState.email;
        if (formState.phone !== (profile.profile?.phone || "")) changedFields.phone = formState.phone;
        if (formState.bio !== (profile.profile?.bio || "")) changedFields.bio = formState.bio;
        // Only include avatarUrl if it was changed (not possible from this form, but for completeness)
        // if (formState.avatarUrl !== profile.avatarUrl) changedFields.avatarUrl = formState.avatarUrl;
        // If nothing changed, exit edit mode and do not send request
        if (Object.keys(changedFields).length === 0) {
            setIsEditing(false);
            return;
        }
        try {
            await updateProfile.mutateAsync(changedFields);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
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
            updateField('phone', profile.profile?.phone || '');
            updateField('bio', profile.profile?.bio || '');
        }
        setIsEditing(true);
    };

    // Avatar update logic (copied from tutor profile)
    const handleAvatarSave = (avatarUrl: string) => {
        if (!profile) return;
        updateProfile.mutate(
            { avatarUrl } as any,
            {
                onSuccess: () => {
                    queryClient.setQueryData(['studentProfile', 'detail'], (old: any) => ({
                        ...old,
                        avatarUrl,
                    }));
                    queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
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

    return (
        <PageWrapper>
            <Section title="Мій профіль">
                <div className="flex gap-[60px]">
                    <div className="flex flex-col items-center w-[200px] gap-4">
                        {showAvatarPicker ? (
                            <AvatarPicker
                                currentAvatarUrl={profile?.avatarUrl}
                                onSave={handleAvatarSave}
                                onCancel={() => setShowAvatarPicker(false)}
                            />
                        ) : (
                            <>
                                <Avatar id={(() => {
                                    // Map avatarUrl to id for Avatar component
                                    const url = profile?.avatarUrl;
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
                    </div>
                </div>
            </Section>
        </PageWrapper>
    );
}