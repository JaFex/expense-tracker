import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
    component: Index,
});


function Index() {

    // TODO: This page should be improved to display some quick and useful information
    // IDEAS: (evaluate if its possible to have this predefined by month but able to change the timeframe)
    // - monthly transactions by type
    // - balance
    // - total expenses / incomes
    // - expenses/incomes by category (graph) [Or maybe a top by type]
    // - timeframe evolution graph

    const { t } = useTranslation();


    return (
        <div>
            <div className="mb-4 border-b pb-2 text-4xl font-semibold flex items-center justify-between">
                <h2>
                    {t('dashboard')}
                </h2>
            </div>
        </div>
    )
}