import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './layout/Header';
import { useAuth } from '../hooks/useAuth';

jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

const renderHeader = () => {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders platform name', () => {
    useAuth.mockReturnValue({
      user: null,
      logout: jest.fn(),
      isAuthenticated: () => false,
    });

    renderHeader();

    expect(screen.getByRole('link', { name: /your platform name/i })).toBeInTheDocument();
  });

  it('shows login/register links when unauthenticated', () => {
    useAuth.mockReturnValue({
      user: null,
      logout: jest.fn(),
      isAuthenticated: () => false,
    });

    renderHeader();

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /dashboard/i })).not.toBeInTheDocument();
  });

  it('shows dashboard and user greeting when authenticated', () => {
    useAuth.mockReturnValue({
      user: { name: 'Alice' },
      logout: jest.fn(),
      isAuthenticated: () => true,
    });

    renderHeader();

    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/hi, alice/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });
});