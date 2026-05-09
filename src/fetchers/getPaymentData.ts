import { API_URL } from "../constants";
import { Currency } from "../types/payment";

type PaymentDataQueryParams = {
  paymentID?: string,
  currency?: Currency | '',
  page?: number
  pageSize?: number
}

export const getPaymentData = ({
  paymentID = 'pay_205',
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
    return Promise.reject(data.message)
  }
};
