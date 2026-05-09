import { API_URL } from "../constants";
import { PaymentSearchResponse } from "../types/payment";

interface FetchError {
  status: number;
  message: string;
}

type PaymentDataQueryParams = {
  paymentID?: string,
  currency?: string | '',
  page?: string
  pageSize?: string
}

export const getPaymentData = ({
  paymentID = '',
  currency = '',
  page = '1',
  pageSize = '5',
}: PaymentDataQueryParams = {}) => async (): Promise<PaymentSearchResponse> => {
  const params = new URLSearchParams({
    search: paymentID,
    currency,
    page: String(page),
    pageSize: String(pageSize),
  })

  const response = await fetch(API_URL.concat(`?${params.toString()}`), {
    method: 'GET',
  })

  const data: unknown = await response.json()
  if (response.ok) {
    return data as PaymentSearchResponse;
  } else {
    const error: FetchError = {
      status: response.status,
      message: (data as Record<string, unknown>)?.message as string || 'Unknown error'
    };
    return Promise.reject(error);
  }
};
