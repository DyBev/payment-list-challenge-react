import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useSearchValue = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({ 
    queryKey: ['search'],
    queryFn: () => {},
    enabled: false,
    initialData: {
      paymentID: '',
      currency: '',
      page: 1,
    },
    staleTime: Infinity,
  })

  const setSearchValue = (key: string, value: string) => {
    queryClient.setQueryData(['search'], (oldData: Record<string, string>) => ({
      ...oldData,
      [key]: value
    }))
  };

  const clearSearch = () => {
    queryClient.setQueryData(['search'], (oldData: Record<string, string>) => 
      Object.keys(oldData).reduce((acc, key) => ({
        ...acc,
        [key]: '',
      }), {})
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
