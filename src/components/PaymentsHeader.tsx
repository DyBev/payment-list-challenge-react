import React, { useState } from 'react';
import { FilterRow, SearchButton, SearchInput, Title } from './components';
import { I18N } from "../constants/i18n";
import { useSearchValue } from '../hooks/useSearchValue';

export const PaymentsHeader = () => {
  const {
    setSearchValue,
  } = useSearchValue();
  const [searchValue, setTempValue] = useState('');

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
        />
        <SearchButton
          onClick={() => {
            setSearchValue("paymentID", searchValue)
          }}
        >{I18N.SEARCH_BUTTON}</SearchButton>
      </FilterRow>
    </>
  );
}
