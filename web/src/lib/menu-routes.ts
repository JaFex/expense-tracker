import { FlowType } from "@/types/enums";



export const MenuItems = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/',
            items: []
        },
        {
            title: "Transaction",
            url: "/transaction",
            search: undefined,
            items: [
                {
                    title: 'Income',
                    url: '/transaction',
                    search: {
                        type: FlowType.INCOME
                    }
                },
                {
                    title: 'Expense',
                    url: '/transaction',
                    search: {
                        type: FlowType.EXPENSE
                    }
                },
            ],
        },
        {
            title: 'Category',
            url: '/category',
            search: undefined,
            items: [
                {
                    title: 'Income',
                    url: '/category',
                    search: {
                        type: FlowType.INCOME
                    },
                },
                {
                    title: 'Expense',
                    url: '/category',
                    search: {
                        type: FlowType.EXPENSE
                    },
                },
            ]
        },
        {
            title: "Settings",
            url: "/settings",
            items: [],
            search: undefined,
        },
    ],
}