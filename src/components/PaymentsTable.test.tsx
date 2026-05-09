import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaymentsTable } from './PaymentsTable';
import { afterEach } from 'node:test';
import { server } from '../mocks/node';
import { I18N } from '../constants/i18n';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('PaymentsTable', () => {
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
        <PaymentsTable />
      </QueryClientProvider>
    )
  });

  it('should navigate to the selected page', async () => {
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: "2" })).toBeInTheDocument();
    });

    const pageNumberTwo = screen.getByRole('button', { name: "2" })
    fireEvent.click(pageNumberTwo);
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: "2" })).toBeInTheDocument();
    });

    await waitFor(() => {
      const data = queryClient.getQueryData(['payments', '2']);

      expect(data).toBeDefined();
    });

    const data = queryClient.getQueryData(['payments', ...Object.values({
      paymentID: '',
      currency: '',
      page: '2',
    }).filter((value) => !!value)])

    expect(String(data?.page)).toMatch("2")
  })

  it('should navigate to the previous page', async () => {
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: "9" })).toBeInTheDocument();
    });

    const pageNumberNine = screen.getByRole('button', { name: "9" })
    fireEvent.click(pageNumberNine);
    await waitFor(() => {
      const data = queryClient.getQueryData(['payments', '9']);
      expect(data).toBeDefined();
    });

    const previousPage = screen.getByRole('button', { name: I18N.PREVIOUS_BUTTON })
    fireEvent.click(previousPage);
    await waitFor(() => {
      const data = queryClient.getQueryData(['payments', '8']);
      expect(data).toBeDefined();
    });
  })

  it('should navigate to the next page', async () => {
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: "9" })).toBeInTheDocument();
    });

    const pageNumberNine = screen.getByRole('button', { name: "9" })
    fireEvent.click(pageNumberNine);
    await waitFor(() => {
      const data = queryClient.getQueryData(['payments', '9']);
      expect(data).toBeDefined();
    });

    const nextPage = screen.getByRole('button', { name: I18N.NEXT_BUTTON })
    fireEvent.click(nextPage);
    fireEvent.click(nextPage);
    await waitFor(() => {
      const data = queryClient.getQueryData(['payments', '10']);

      expect(data).toBeDefined();
    });
  })
});
