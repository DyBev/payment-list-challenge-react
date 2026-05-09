import { useQuery } from "@tanstack/react-query"
import { getPaymentData } from "../fetchers/getPaymentData"

type UsePaymentsParams = {
  paymentID: string,
}

export const usePayments = ({
  paymentID,
}: UsePaymentsParams) => {
  const { status, fetchStatus, data, error } = useQuery({
    queryKey: ['payments', paymentID],
    queryFn: getPaymentData({ paymentID }),
  })

  if (fetchStatus === 'idle' && status === 'pending') {
    return {
      isLoading: false,
    }
  }

  if (status === 'pending' || fetchStatus === 'fetching') {
    return {
      isLoading: true,
    }
  }

  if (status === 'error') {
    return {
      isLoading: false,
      error: error,
    }
  }

  return {
    isLoading: false,
    data,
  }
}
