import { CategoryCreateModal } from "./components/app/categories/create-modal";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { CategoryTable } from "./components/app/categories/table";

// TODO: Add router support (tanstack router)
// TODO: Do a better division of the pages

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className='px-4 py-2'>
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
    </QueryClientProvider>
  );
}

export default App;