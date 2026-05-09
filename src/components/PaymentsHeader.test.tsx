import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PaymentsHeader } from './PaymentsHeader.tsx';
import { beforeEach, describe, expect, it } from 'vitest';
import { I18N } from '../constants/i18n.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// This is required for tests to pass if ReactQuery is used
// you don't have to use this library in your solution.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // disable retries is required for tests to pass if ReactQuery is used
      retry: false,
    },
  },
});

type SearchCache = {
  paymentID: string,
}

describe('PaymentsHeader', () => {
  beforeEach(() => {
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

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton)

    const cachedData = queryClient.getQueryData(['search'])
    expect((cachedData as SearchCache).paymentID).toEqual('react testing');
  });
})
