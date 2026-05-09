import React, { useState } from 'react';
import { DefaultButton, FilterRow, SearchButton, SearchInput, Title } from './components';
import { I18N } from "../constants/i18n";
import { useSearchValue } from '../hooks/useSearchValue';

export const PaymentsHeader = () => {
  const {
    data,
    setSearchValue,
    clearSearch,
    isClear,
  } = useSearchValue();
  const [searchValue, setTempValue] = useState(data?.paymentID || '');

  return (
    <>
      <Title>{I18N.PAGE_TITLE}</Title>
      <FilterRow>
        <label id="search-label" htmlFor='search-input' >{I18N.SEARCH_LABEL}</label>
        <SearchInput 
          id="search-input"
          placeholder={I18N.SEARCH_PLACEHOLDER}
          onChange={(e) => {
            setTempValue(e.target.value)
          }}
          value={searchValue}
        />
        <SearchButton
          onClick={() => {
            console.log('search', searchValue)
            setSearchValue("paymentID", searchValue)
          }}
        >{I18N.SEARCH_BUTTON}</SearchButton>
        {!isClear && (
          <DefaultButton
            onClick={() => {
              clearSearch();
              setTempValue('');
            }}
          >{I18N.CLEAR_FILTERS}</DefaultButton>
        )}
      </FilterRow>
    </>
  );
}
