import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { encryptBidAmount } from '@/lib/fhe';
import { AUCTION_ADDRESSES, SEALED_AUCTION_ABI } from '@/config/contracts';

interface BidDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auctionTitle: string;
  auctionIndex: number;
  minBid: string;
}

export function BidDialog({ open, onOpenChange, auctionTitle, auctionIndex, minBid }: BidDialogProps) {
  const [bidAmount, setBidAmount] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);

  const { address } = useAccount();
  const { writeContract, data: hash, isPending: isWritePending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const contractAddress = AUCTION_ADDRESSES[auctionIndex];

  const handleSubmit = async () => {
    if (!bidAmount || parseFloat(bidAmount) < parseFloat(minBid)) {
      alert(`Bid must be at least ${minBid} ETH`);
      return;
    }

    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!contractAddress) {
      alert('Invalid auction contract address');
      return;
    }

    try {
      setIsEncrypting(true);

      // Convert ETH to Wei
      const bidWei = parseEther(bidAmount);
      console.log('📊 Bid amount:', bidAmount, 'ETH =', bidWei.toString(), 'Wei');

      // Encrypt the bid using FHE
      console.log('🔐 Encrypting bid...');
      const { encryptedBid, proof } = await encryptBidAmount(
        bidWei,
        contractAddress,
        address
      );

      console.log('✅ Encryption complete');
      console.log('- Encrypted Bid:', encryptedBid);
      console.log('- Proof:', proof);

      setIsEncrypting(false);

      // Submit encrypted bid to contract
      console.log('📤 Submitting bid to contract:', contractAddress);

      writeContract({
        address: contractAddress,
        abi: SEALED_AUCTION_ABI,
        functionName: 'placeBid',
        args: [encryptedBid, proof],
      });

    } catch (error: any) {
      console.error('❌ Error placing bid:', error);
      setIsEncrypting(false);
      alert(`Failed to place bid: ${error.message || 'Unknown error'}`);
    }
  };

  // Handle successful transaction
  if (isSuccess) {
    setTimeout(() => {
      onOpenChange(false);
      setBidAmount('');
      alert('🎉 Bid placed successfully! Your bid is encrypted and hidden.');
    }, 500);
  }

  const isSubmitting = isEncrypting || isWritePending || isConfirming;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Place Sealed Bid</DialogTitle>
          <DialogDescription>
            {auctionTitle}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="bid">Bid Amount (ETH)</Label>
            <Input
              id="bid"
              type="number"
              step="0.01"
              min={minBid}
              placeholder={`Minimum: ${minBid} ETH`}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              disabled={isSubmitting}
            />
            <p className="text-sm text-muted-foreground">
              Your bid will be encrypted using FHE and remain hidden until the auction ends.
            </p>
            {!address && (
              <p className="text-sm text-destructive">
                ⚠️ Please connect your wallet to place a bid
              </p>
            )}
          </div>

          {isSubmitting && (
            <div className="text-sm text-center space-y-1">
              {isEncrypting && <p>🔐 Encrypting your bid...</p>}
              {isWritePending && <p>📝 Waiting for wallet confirmation...</p>}
              {isConfirming && <p>⏳ Transaction confirming on Sepolia...</p>}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !bidAmount || !address}
          >
            {isSubmitting ? 'Processing...' : 'Place Bid'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
