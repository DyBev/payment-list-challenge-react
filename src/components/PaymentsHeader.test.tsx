import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PaymentsHeader } from './PaymentsHeader.tsx';
import { describe, expect, it } from 'vitest';
import { I18N } from '../constants/i18n.ts';

describe('PaymentsHeader', () => {
  it('should render the payments Header', () => {
    render(<PaymentsHeader />)
    expect(screen.getByText(I18N.PAGE_TITLE)).toBeInTheDocument()
  })
})
