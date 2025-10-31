import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '@/components/Hero';

describe('Hero', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders hero section with main heading', () => {
    renderWithRouter(<Hero />);

    expect(screen.getByText(/Sealed Bid Auctions/i)).toBeInTheDocument();
  });

  it('displays the description text', () => {
    renderWithRouter(<Hero />);

    const description = screen.getByText(/Fully Homomorphic Encryption/i);
    expect(description).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    renderWithRouter(<Hero />);

    expect(screen.getByText(/Explore Auctions/i)).toBeInTheDocument();
    expect(screen.getByText(/How It Works/i)).toBeInTheDocument();
  });

  it('displays key features', () => {
    renderWithRouter(<Hero />);

    expect(screen.getByText(/Fully Private Bidding/i)).toBeInTheDocument();
    expect(screen.getByText(/No Front-Running/i)).toBeInTheDocument();
    expect(screen.getByText(/Fair Winner Selection/i)).toBeInTheDocument();
  });
});
