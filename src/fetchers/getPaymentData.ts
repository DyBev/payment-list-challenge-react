import { API_URL } from "../constants";

type PaymentDataQueryParams = {
  paymentID?: string,
  currency?: string | '',
  page?: number
  pageSize?: number
}

export const getPaymentData = ({
  paymentID = '',
  currency = '',
  page = 1,
  pageSize = 5,
}: PaymentDataQueryParams = {}) => async () => {
  const params = new URLSearchParams({
    search: paymentID,
    currency,
    page: String(page),
    pageSize: String(pageSize),
  })

  const response = await fetch(API_URL.concat(`?${params.toString()}`), {
    method: 'GET',
  })

  const data = await response.json()
  if (response.ok) {
    return data;
  } else {
    return Promise.reject({ status: response.status, message: data.message })
  }
};
