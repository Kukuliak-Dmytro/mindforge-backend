import React from "react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
    const handleFirst = () => {
        onPageChange(1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handleLast = () => {
        onPageChange(totalPages);
    };

    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;
        const halfVisible = Math.floor(maxVisiblePages / 2);

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= halfVisible + 1) {
                for (let i = 1; i <= maxVisiblePages - 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - halfVisible) {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - halfVisible; i <= currentPage + halfVisible; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            {/* Previous Page */}
            {/* <PrimaryButton
                className="text-rich-black p-2 rounded-md small-shadow hover:bg-primary hover:text-white transition-all"
                onClick={handleFirst}
                disabled={currentPage === 1}
            >
                First
            </PrimaryButton>
            <SecondaryButton
                className="text-rich-black p-2 rounded-md small-shadow hover:bg-primary hover:text-white transition-all"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                Prev
            </SecondaryButton> */}

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                    <PrimaryButton
                        key={index}
                        className={`p-2 rounded-md small-shadow transition-all ${
                            page === currentPage
                                ? "bg-primary text-white"
                                : "bg-transparent text-rich-black hover:bg-primary hover:text-white"
                        }`}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </PrimaryButton>
                ) : (
                    <span key={index} className="p-2 text-rich-black">
                        {page}
                    </span>
                )
            )}
{/* 
            <SecondaryButton
                className="text-rich-black p-2 rounded-md small-shadow hover:bg-primary hover:text-white transition-all"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
            </SecondaryButton>
            <PrimaryButton
                className="text-rich-black p-2 rounded-md small-shadow hover:bg-primary hover:text-white transition-all"
                onClick={handleLast}
                disabled={currentPage === totalPages}
            >
                Last
            </PrimaryButton> */}
        </div>
    );
}