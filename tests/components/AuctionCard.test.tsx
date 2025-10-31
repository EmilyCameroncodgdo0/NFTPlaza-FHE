import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuctionCard from '@/components/AuctionCard';

describe('AuctionCard', () => {
  const mockProps = {
    id: 1,
    title: 'Test NFT Auction',
    image: '/test-image.jpg',
    endTime: '2h 30m',
    bidCount: 5,
    minBid: '0.1',
    onBidClick: vi.fn(),
  };

  it('renders auction card with correct information', () => {
    render(<AuctionCard {...mockProps} />);

    expect(screen.getByText('Test NFT Auction')).toBeInTheDocument();
    expect(screen.getByText('2h 30m')).toBeInTheDocument();
    expect(screen.getByText('5 encrypted')).toBeInTheDocument();
    expect(screen.getByText('0.1 ETH')).toBeInTheDocument();
  });

  it('displays the correct image', () => {
    render(<AuctionCard {...mockProps} />);

    const image = screen.getByAltText('Test NFT Auction');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('calls onBidClick when Place Sealed Bid button is clicked', async () => {
    const user = userEvent.setup();
    render(<AuctionCard {...mockProps} />);

    const bidButton = screen.getByText('Place Sealed Bid');
    await user.click(bidButton);

    expect(mockProps.onBidClick).toHaveBeenCalledTimes(1);
  });

  it('renders without onBidClick handler', () => {
    const propsWithoutClick = { ...mockProps, onBidClick: undefined };
    render(<AuctionCard {...propsWithoutClick} />);

    expect(screen.getByText('Place Sealed Bid')).toBeInTheDocument();
  });

  it('displays bid count correctly', () => {
    render(<AuctionCard {...mockProps} bidCount={0} />);
    expect(screen.getByText('0 encrypted')).toBeInTheDocument();
  });

  it('shows minimum bid information', () => {
    render(<AuctionCard {...mockProps} />);

    expect(screen.getByText('Minimum Bid')).toBeInTheDocument();
    expect(screen.getByText('0.1 ETH')).toBeInTheDocument();
  });
});
