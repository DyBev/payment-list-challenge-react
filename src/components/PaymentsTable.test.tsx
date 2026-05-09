import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaymentsTable } from './PaymentsTable';
import { afterEach } from 'node:test';
import { server } from '../mocks/node';

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
});
