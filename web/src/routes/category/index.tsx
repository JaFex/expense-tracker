import { z } from "zod";
import { FlowType } from "@/types/enums";
import { createFileRoute } from "@tanstack/react-router";
import { CategoryCreateModal } from '@/components/app/categories/create-modal';
import { CategoryTable } from '@/components/app/categories/table';

const searchSchema = z.object({
    type: z.nativeEnum(FlowType).optional()
})

export const Route = createFileRoute('/category/')({
    component: Categories,
    validateSearch: searchSchema
})

function Categories() {
    return (

        <div>
            <div>
                <div className="mb-4 border-b pb-2 text-3xl font-semibold flex items-center justify-between">
                    <h2>
                        Category
                    </h2>
                    <CategoryCreateModal />
                </div>
            </div>
            <CategoryTable />
        </div>

    );
}