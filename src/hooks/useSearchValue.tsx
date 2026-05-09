import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useSearchValue = () => {
  const queryCilent = useQueryClient();
  const { data } = useQuery({ 
    queryKey: ['search'],
    queryFn: async () => {
      return {
        paymentID: '',
      };
    }
  })

  const setSearchValue = (key: string, value: string) => {
    queryCilent.setQueryData(['search'], (oldData: Record<string, string>) => ({
      ...oldData,
      [key]: value
    }))
  };

  return {
    data,
    setSearchValue,
  };
}
