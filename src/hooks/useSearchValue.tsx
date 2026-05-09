import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useSearchValue = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({ 
    queryKey: ['search'],
    queryFn: async () => {
      return {
        paymentID: '',
      };
    }
  })

  const setSearchValue = (key: string, value: string) => {
    queryClient.setQueryData(['search'], (oldData: Record<string, string>) => ({
      ...oldData,
      [key]: value
    }))
  };

  const clearSearch = () => {
    queryClient.setQueryData(['search'], {
      paymentID: '',
    });
  }

  const isClear = Object.values(data || {}).reduce((acc, value) => (acc && value === ''), true)

  return {
    data,
    setSearchValue,
    clearSearch,
    isClear,
  };
}
