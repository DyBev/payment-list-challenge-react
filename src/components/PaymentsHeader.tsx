import React, { useState } from 'react';
import { DefaultButton, FilterRow, SearchButton, SearchInput, Select, Title, FlexColumn } from './components';
import { I18N } from "../constants/i18n";
import { useSearchValue } from '../hooks/useSearchValue';
import { CURRENCIES } from '../constants';

export const PaymentsHeader = () => {
  const {
    data,
    setSearchValue,
    clearSearch,
    isClear,
  } = useSearchValue();
  const [searchValue, setTempValue] = useState(data?.paymentID || '');
  const [currencyValue, setTempCurrency] = useState(data?.currency || '');

  return (
    <>
      <Title>{I18N.PAGE_TITLE}</Title>
      <FilterRow>
        <FlexColumn>
          <label id="search-label" htmlFor='search-input' >{I18N.SEARCH_LABEL}</label>
          <SearchInput 
            style={{
              width: '100%',
            }}
            id="search-input"
            placeholder={I18N.SEARCH_PLACEHOLDER}
            onChange={(e) => {
              setTempValue(e.target.value)
            }}
            value={searchValue}
          />
        </FlexColumn>

        <FlexColumn>
          <label id="select-currency-label" htmlFor='select-currency-input' >{I18N.CURRENCY_FILTER_LABEL}</label>

          <Select
            id="select-currency-input"
            onChange={(e) => {
              setTempCurrency(e.target.value);
            }}
            value={currencyValue}
          >
          <option value="">{I18N.EMPTY_CURRENCY}</option>
          {CURRENCIES.map((currency) => {
            return (
              <option value={currency}>{currency}</option>
            );
          })}
          </Select>

        </FlexColumn>

        <SearchButton
          onClick={() => {
            setSearchValue("paymentID", searchValue)
            setSearchValue("currency", currencyValue)
            setSearchValue("page", "1")
          }}
        >{I18N.SEARCH_BUTTON}</SearchButton>

        {!isClear && (
          <DefaultButton
            onClick={() => {
              clearSearch();
              setTempValue('');
              setTempCurrency('');
            }}
          >{I18N.CLEAR_FILTERS}</DefaultButton>
        )}
      </FilterRow>
    </>
  );
}
