import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { FlowType } from "@/types/enums";
import { Category, CategorySchema } from "@/types/category";

type Props = {
    type?: FlowType
}

export const CategoryCreateModal = ({ type }: Props) => {
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    // TODO: Maybe its a better approach move all the mutation and queries for a centralized hook
    // TODO: Move the calls to a better place too and do abbeter organization
    const { mutate } = useMutation({
        mutationFn: (data: Category) => {
            return axios.post('/api/categories', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        }
    });

    const form = useForm<Category>({
        defaultValues: {
            name: undefined,
            type: type,
            description: undefined
        },
        resolver: zodResolver(CategorySchema),
    });

    function onSubmit(values: Category) {
        mutate(values);
        form.reset();
        setOpen(false);
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant='ghost'>Add new</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="mb-4">Add new category</DialogTitle>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.entries(FlowType).map(([key, value]) => (
                                                    <SelectItem key={value} value={value} className="capitalize">{key}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Short description"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Create</Button>
                    </form>
                </Form>
            </DialogHeader>
        </DialogContent>
    </Dialog>
};