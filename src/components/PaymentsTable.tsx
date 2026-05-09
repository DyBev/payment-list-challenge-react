import Recat from 'react';
import {
  FlexRow,
  PaginationButton,
  PaginationRow,
  Spinner,
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
    return (
      <FlexRow>
        <Spinner />
      </FlexRow>
    );
  }

  const {
    payments,
    page,
    pageSize,
    total,
  } = data as PaymentSearchResponse || {} ;

  const totalPages = Math.ceil(total/pageSize)
  let startIndex = Math.max(0, page - 6);
  let endIndex = page + 4;
  if (page - 6 < 0) {
    endIndex += Math.abs(page - 6);
    if (page == 1) {
      endIndex += 1;
    }
  }

  if (page + 4 > totalPages - 1) {
    startIndex -= Math.abs(page + 6 - totalPages);
    if (page == totalPages - 1) {
      startIndex -= 1;
    }
  }

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
            <FlexRow style={{ width: 'fit-content', marginBottom: 0 }}>
              {Array(totalPages).fill(0).map((_, index) => {
                if (
                  index === 0
                  || index === totalPages-1
                  || index > startIndex && index < endIndex
                ) {
                  return <PaginationButton
                    style={{...(page === index+1) ? {
                      backgroundColor: '#7f8ca8',
                    }: {}}}
                    key={index}
                    onClick={() => setSearchValue('page', String(index+1))}
                  >
                    {index+1}
                  </PaginationButton>
                }
                if (
                  index === endIndex
                  || index === startIndex
                ) {
                  return <span style={{ marginLeft: 0 }}>...</span>
                }
              })}
            </FlexRow>
            <PaginationButton 
              disabled={page === totalPages}
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
