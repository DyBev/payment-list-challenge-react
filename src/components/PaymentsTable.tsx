import Recat from 'react';
import {
  PaginationButton,
  PaginationRow,
  StatusBadge,
  Table,
  TableBodyWrapper,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from './components';
import { I18N } from '../constants/i18n';
import { usePayments } from '../hooks/usePayments';
import { PaymentSearchResponse } from '../types/payment';
import { ErrorHandling } from './ErrorHandling';
import { useSearchValue } from '../hooks/useSearchValue';

export const PaymentsTable = () => {
  const { setSearchValue } = useSearchValue();
  const { data, isLoading, error } = usePayments()

  if (isLoading) {
    return "LOADING ..."
  }

  const {
    payments,
    page,
    pageSize,
    total,
  } = data as PaymentSearchResponse || {} ;

  return (
    <ErrorHandling error={error} >
    {data && (
      <>
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
        {total > pageSize && (
          <PaginationRow>
            <PaginationButton disabled={page === 1} onClick={() => setSearchValue('page', String(page - 1))}>
              {I18N.PREVIOUS_BUTTON}
            </PaginationButton>
            {Array(Math.ceil(total/pageSize)).fill(0).map((_, index) => {
              return <PaginationButton
                style={{...(page === index+1) ? {
                  backgroundColor: '#7f8ca8',
                }: {}}}
                key={index}
                onClick={() => setSearchValue('page', String(index+1))}
              >
                {index+1}
              </PaginationButton>
            })}
            <PaginationButton 
              disabled={page === Math.ceil(total/pageSize)}
              onClick={() => setSearchValue('page', String(page + 1))}
            >
              {I18N.NEXT_BUTTON}
            </PaginationButton>
          </PaginationRow>
        )}
      </>
    )}
    </ErrorHandling>
  );
};
