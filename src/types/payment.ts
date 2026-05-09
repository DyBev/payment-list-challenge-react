export type Currency = "USD" | "EUR" | "GBP" | "AUD" | "CAD" | "ZAR" | "JPY" | "CZK";
type Status = "completed" | "pending" | "failed" | "refunded";

export interface Payment {
    id: string,
    customerName: string,
    amount: number,
    customerAddress: string,
    currency: Currency,
    status: Status,
    date: string,
    description: string,
}

interface PaymentResponse extends Payment {
  clientId: string,
}

export interface PaymentSearchResponse {
  payments: PaymentResponse[]
  total: number,
  page: number,
  pageSize: number
}
