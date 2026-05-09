import { API_URL } from "../constants";
import { Currency } from "../types/payment";

type PaymentDataQueryParams = {
  paymentID?: string,
  currency?: Currency | '',
  page?: number
  pageSize?: number
}

export const getPaymentData = ({
  paymentID = '',
  currency = '',
  page = 1,
  pageSize = 5,
}: PaymentDataQueryParams = {}) => async () => {
  console.log('paymentID', paymentID)
  const params = new URLSearchParams({
    search: paymentID,
    currency,
    page: String(page),
    pageSize: String(pageSize),
  })

  console.log(API_URL.concat(`?${params.toString()}`))
  const response = await fetch(API_URL.concat(`?${params.toString()}`), {
    method: 'GET',
  })

  const data = await response.json()
  console.log(response.ok);
  if (response.ok) {
    return data;
  } else {
    console.log(response.status, data.message);
    return Promise.reject({ status: response.status, message: data.message })
  }
};
