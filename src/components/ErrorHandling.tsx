import React from 'react';
import { ErrorBox } from './components';
import { I18N } from '../constants/i18n';

type ErrorProps = {
  error?: {
    status: number,
    message: string,
  },
  children: React.ReactNode,
}

export const ErrorHandling = ({
  error,
  children,
}: ErrorProps) => {
  if (error) {
    return <ErrorBox>
      {error.status === 404 && I18N.PAYMENT_NOT_FOUND }
      {error.status === 500 && I18N.INTERNAL_SERVER_ERROR }
    </ErrorBox>
  }

  return children;
}
