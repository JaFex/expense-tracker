import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Category } from '@/types/category';
import { api } from '@/lib/api';

export const useQueryCategories = () => {
    const queryClient = useQueryClient();

    const list = useQuery({
        queryKey: ['categories'],
        queryFn: async (): Promise<Category[]> => {
            const { data } = await api.get<Category[]>('/categories');
            return data;
        },
    });

    const create = useMutation({
        mutationFn: async (newCategory: Omit<Category, 'id'>): Promise<Category> => {
            const { data } = await api.post('/categories', newCategory);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });

    return { list, create };
};
