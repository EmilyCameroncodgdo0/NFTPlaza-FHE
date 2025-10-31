const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SealedAuction Contract", function () {
  let sealedAuction;
  let seller;
  let bidder1;
  let bidder2;
  let bidder3;
  const biddingTime = 3600; // 1 hour in seconds
  const imageHash = "QmTest123";

  beforeEach(async function () {
    [seller, bidder1, bidder2, bidder3] = await ethers.getSigners();

    const SealedAuction = await ethers.getContractFactory("SealedAuction");
    sealedAuction = await SealedAuction.deploy(biddingTime, seller.address, imageHash);
    await sealedAuction.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct seller", async function () {
      expect(await sealedAuction.seller()).to.equal(seller.address);
    });

    it("Should set the correct endTime", async function () {
      const endTime = await sealedAuction.endTime();
      const currentTime = (await ethers.provider.getBlock("latest")).timestamp;
      expect(endTime).to.be.closeTo(currentTime + biddingTime, 5);
    });

    it("Should set the correct image hash", async function () {
      expect(await sealedAuction.imageHash()).to.equal(imageHash);
    });

    it("Should not be ended initially", async function () {
      expect(await sealedAuction.ended()).to.equal(false);
    });

    it("Should have zero bids initially", async function () {
      expect(await sealedAuction.bids()).to.equal(0);
    });

    it("Should grant seller view permissions by default", async function () {
      expect(await sealedAuction.canViewAfterEnd(seller.address)).to.equal(true);
    });
  });

  describe("State Retrieval", function () {
    it("Should return correct initial state", async function () {
      const state = await sealedAuction.getState();
      expect(state.isBidding).to.equal(true);
      expect(state.isEnded).to.equal(false);
      expect(state._bids).to.equal(0);
    });

    it("Should indicate not bidding after time expires", async function () {
      // Fast-forward time
      await ethers.provider.send("evm_increaseTime", [biddingTime + 1]);
      await ethers.provider.send("evm_mine");

      const state = await sealedAuction.getState();
      expect(state.isBidding).to.equal(false);
    });
  });

  describe("Finalize", function () {
    it("Should revert if called before endTime", async function () {
      await expect(
        sealedAuction.finalize()
      ).to.be.revertedWith("not yet");
    });

    it("Should finalize successfully after endTime", async function () {
      // Fast-forward time
      await ethers.provider.send("evm_increaseTime", [biddingTime + 1]);
      await ethers.provider.send("evm_mine");

      await expect(sealedAuction.finalize())
        .to.emit(sealedAuction, "Finalized")
        .withArgs(seller.address);

      expect(await sealedAuction.ended()).to.equal(true);
    });

    it("Should revert if finalized twice", async function () {
      // Fast-forward time and finalize
      await ethers.provider.send("evm_increaseTime", [biddingTime + 1]);
      await ethers.provider.send("evm_mine");
      await sealedAuction.finalize();

      await expect(
        sealedAuction.finalize()
      ).to.be.revertedWith("already");
    });
  });

  describe("Grant View Permissions", function () {
    it("Should revert grantView if not finalized", async function () {
      await expect(
        sealedAuction.connect(seller).grantView(bidder1.address)
      ).to.be.revertedWith("not finalized");
    });

    it("Should revert grantView if not called by seller", async function () {
      // Fast-forward and finalize
      await ethers.provider.send("evm_increaseTime", [biddingTime + 1]);
      await ethers.provider.send("evm_mine");
      await sealedAuction.finalize();

      await expect(
        sealedAuction.connect(bidder1).grantView(bidder2.address)
      ).to.be.revertedWith("not seller");
    });

    it("Should grant view permission successfully", async function () {
      // Fast-forward and finalize
      await ethers.provider.send("evm_increaseTime", [biddingTime + 1]);
      await ethers.provider.send("evm_mine");
      await sealedAuction.finalize();

      await sealedAuction.connect(seller).grantView(bidder1.address);
      expect(await sealedAuction.canViewAfterEnd(bidder1.address)).to.equal(true);
    });
  });

  describe("Cipher Access Control", function () {
    it("Should revert highestBidCipher if not finalized", async function () {
      await expect(
        sealedAuction.highestBidCipher()
      ).to.be.revertedWith("not finalized");
    });

    it("Should revert winnerCipher if not finalized", async function () {
      await expect(
        sealedAuction.winnerCipher()
      ).to.be.revertedWith("not finalized");
    });

    it("Should revert highestBidCipher without view permission", async function () {
      // Fast-forward and finalize
      await ethers.provider.send("evm_increaseTime", [biddingTime + 1]);
      await ethers.provider.send("evm_mine");
      await sealedAuction.finalize();

      await expect(
        sealedAuction.connect(bidder1).highestBidCipher()
      ).to.be.revertedWith("no view permission");
    });

    it("Should revert winnerCipher without view permission", async function () {
      // Fast-forward and finalize
      await ethers.provider.send("evm_increaseTime", [biddingTime + 1]);
      await ethers.provider.send("evm_mine");
      await sealedAuction.finalize();

      await expect(
        sealedAuction.connect(bidder1).winnerCipher()
      ).to.be.revertedWith("no view permission");
    });
  });

  describe("Integration Tests", function () {
    it("Should handle complete auction lifecycle", async function () {
      // Initial state
      let state = await sealedAuction.getState();
      expect(state.isBidding).to.equal(true);
      expect(state._bids).to.equal(0);

      // Fast-forward time
      await ethers.provider.send("evm_increaseTime", [biddingTime + 1]);
      await ethers.provider.send("evm_mine");

      // Finalize
      await sealedAuction.finalize();
      expect(await sealedAuction.ended()).to.equal(true);

      // Verify final state
      state = await sealedAuction.getState();
      expect(state.isEnded).to.equal(true);
      expect(state.isBidding).to.equal(false);
    });
  });
});
