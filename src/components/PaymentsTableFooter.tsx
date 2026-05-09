import React from 'react';
import {
  FlexRow,
  PaginationButton,
  PaginationRow,
} from './components';
import { I18N } from '../constants/i18n';
import { usePayments } from '../hooks/usePayments';
import { PaymentSearchResponse } from '../types/payment';
import { useSearchValue } from '../hooks/useSearchValue';

export const PaymentsTableFooter = () => {
  const { setSearchValue } = useSearchValue();
  const { data } = usePayments()

  const {
    page,
    pageSize,
    total,
  } = data as PaymentSearchResponse || {} ;

  const deviceWidth = window.innerWidth;
  const totalPages = Math.ceil(total/pageSize)

  const startAdjustment = 6
  const endAdjustment = 4
  let startIndex = Math.max(0, page - startAdjustment);
  let endIndex = page + endAdjustment;
  if (page - startAdjustment < 0) {
    endIndex += Math.abs(page - startAdjustment);
    if (page == 1) {
      endIndex += 1;
    }
  }

  if (page + endAdjustment > totalPages - 1) {
    startIndex -= Math.abs(page + endAdjustment - totalPages);
    if (page == totalPages - 1) {
      startIndex -= 1;
    }
  }

  return total > pageSize && (
    <PaginationRow>
      <PaginationButton disabled={page === 1} onClick={() => setSearchValue('page', String(page - 1))}>
        {I18N.PREVIOUS_BUTTON}
      </PaginationButton>
      {deviceWidth <= 768 && (
        <PaginationButton
          style={{
            backgroundColor: '#7f8ca8',
          }}
        >
          {page}
        </PaginationButton>
      )}
      {deviceWidth > 768 && (
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
              return <span key={index} style={{ marginLeft: 0 }}>...</span>
            }
          })}
        </FlexRow>
      )}
      <PaginationButton 
        disabled={page === totalPages}
        onClick={() => setSearchValue('page', String(page + 1))}
      >
        {I18N.NEXT_BUTTON}
      </PaginationButton>
    </PaginationRow>
  );
}

