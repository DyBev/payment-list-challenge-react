import { useQuery, useQueryClient } from "@tanstack/react-query"

interface SearchData {
  paymentID: string;
  currency: string;
  page: string;
}

export const useSearchValue = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery<SearchData>({ 
    queryKey: ['search'],
    queryFn: () => ({
      paymentID: '',
      currency: '',
      page: '1',
    }),
    enabled: false,
    initialData: {
      paymentID: '',
      currency: '',
      page: '1',
    },
    staleTime: Infinity,
  })

  const setSearchValue = (key: string, value: string) => {
    queryClient.setQueryData<SearchData>(['search'], (oldData) => ({
      ...oldData || { paymentID: '', currency: '', page: '1' },
      [key]: value
    }))
  };

  const clearSearch = () => {
    queryClient.setQueryData<SearchData>(['search'], (oldData) => 
      Object.keys(oldData || {}).reduce((acc, key) => ({
        ...acc,
        [key]: '',
      }), {}) as SearchData
    );
  }

  const isClear = Object.entries(data || {})
    .filter(([key,]) => key !== 'page')
    .reduce((acc, [,value]) => (acc && value === ''), true)

  return {
    data,
    setSearchValue,
    clearSearch,
    isClear,
  };
}
