import Recat from 'react';
import { StatusBadge, Table, TableBodyWrapper, TableCell, TableHeader, TableRow, TableWrapper } from './components';
import { I18N } from '../constants/i18n';
import { usePayments } from '../hooks/usePayments';
import { PaymentSearchResponse } from '../types/payment';
import { useSearchValue } from '../hooks/useSearchValue';
import { ErrorHandling } from './ErrorHandling';

export const PaymentsTable = () => {
  const { data: searchData } = useSearchValue();
  console.log(searchData);
  const { data, isLoading, error } = usePayments({
    paymentID: searchData?.paymentID || '',
  })

  if (isLoading) {
    return "LOADING ..."
  }

  const {
    payments,
  } = data as PaymentSearchResponse || {} ;

  return (
    <ErrorHandling error={error} >
    {data && (
      <TableWrapper>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>{I18N.TABLE_HEADER_PAYMENT_ID}</TableHeader>
              <TableHeader>{I18N.TABLE_HEADER_DATE}</TableHeader>
              <TableHeader>{I18N.TABLE_HEADER_AMOUNT}</TableHeader>
              <TableHeader>{I18N.TABLE_HEADER_CUSTOMER}</TableHeader>
              <TableHeader>{I18N.TABLE_HEADER_CURRENCY}</TableHeader>
              <TableHeader>{I18N.TABLE_HEADER_STATUS}</TableHeader>
            </TableRow>
          </thead>
          <TableBodyWrapper>
            {payments.map(({
              id,
              customerName,
              amount,
              currency,
              status,
              date,
            }) => {
              return (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{new Date(date).toLocaleString()}</TableCell>
                  <TableCell>{amount}</TableCell>
                  <TableCell>{customerName}</TableCell>
                  <TableCell>{currency}</TableCell>
                  <TableCell><StatusBadge status={status}>{status}</StatusBadge></TableCell>
                </TableRow>
              );
            })}
          </TableBodyWrapper>
        </Table>
      </TableWrapper>
    )}
    </ErrorHandling>
  );
};
