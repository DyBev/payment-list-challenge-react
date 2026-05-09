import React from 'react';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PaymentsHeader } from './PaymentsHeader.tsx';
import { beforeEach, describe, expect, it } from 'vitest';
import { I18N } from '../constants/i18n.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// This is required for tests to pass if ReactQuery is used
// you don't have to use this library in your solution.
type SearchCache = {
  paymentID: string,
}

describe('PaymentsHeader', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // disable retries is required for tests to pass if ReactQuery is used
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <PaymentsHeader />
      </QueryClientProvider>
    )
  });

  it('should render the payments Header', () => {
    expect(screen.getByText(I18N.PAGE_TITLE)).toBeInTheDocument()
  })

  it('should update the cached search value when search is pressed', () => {
    const searchInput = screen.getByLabelText(/search payments/i);
    fireEvent.input(searchInput, {
      target: {
        value: 'react testing',
      },
    });

    const searchButton = screen.getByRole("button", { name: I18N.SEARCH_BUTTON });
    fireEvent.click(searchButton)

    const cachedData = queryClient.getQueryData(['search'])
    expect((cachedData as SearchCache).paymentID).toEqual('react testing');
  });

  it('should only render the clear-filters button when there is an active search', async () => {
    let clearFiltersButton = screen.queryByRole('button', { name: /clear filters/i });
    expect(clearFiltersButton).not.toBeInTheDocument();

    const searchInput = screen.getByLabelText(/search payments/i);
    fireEvent.input(searchInput, {
      target: {
        value: 'react testing',
      },
    });

    const searchButton = screen.getByRole("button", { name: I18N.SEARCH_BUTTON });
    fireEvent.click(searchButton)

    let cachedData = queryClient.getQueryData(['search'])
    expect((cachedData as SearchCache).paymentID).toEqual('react testing');

    await waitFor(() => {
      clearFiltersButton = screen.queryByRole('button', { name: /clear filters/i });
      expect(clearFiltersButton).toBeInTheDocument();
    });

    clearFiltersButton = screen.getByRole('button', { name: /clear filters/i });
    fireEvent.click(clearFiltersButton)
    expect(searchInput).toHaveValue('');

    cachedData = queryClient.getQueryData(['search'])
    expect((cachedData as SearchCache).paymentID).toEqual('');
  });
})
