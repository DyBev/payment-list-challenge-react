import { useQuery } from "@tanstack/react-query"
import { getPaymentData } from "../fetchers/getPaymentData"
import { useSearchValue } from "./useSearchValue";

export const usePayments = () => {
  const { data: searchData } = useSearchValue();
  const { status, fetchStatus, data, error } = useQuery({
    queryKey: ['payments', ...Object.values(searchData || {}).filter((value) => !!value)],
    queryFn: getPaymentData({
      paymentID: searchData?.paymentID || '',
      currency: searchData?.currency || '',
      page: searchData?.page || '1',
    }),
    staleTime: 1000 * 60 * 5
  })

  if (status === 'pending' || fetchStatus === 'fetching') {
    return {
      isLoading: true,
    }
  }

  if (status === 'error') {
    return {
      isLoading: false,
      error: (error as unknown as { status: number, message: string }),

    }
  }

  return {
    isLoading: false,
    data,
  }
}
