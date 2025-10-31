# NFTPlaza Testing Suite

This directory contains comprehensive unit tests for the NFTPlaza project, covering React components, utility functions, and smart contracts.

## Test Structure

```
tests/
├── components/          # React component tests
│   ├── AuctionCard.test.tsx
│   └── Hero.test.tsx
├── utils/              # Utility function tests
│   └── format.test.ts
├── contracts/          # Smart contract tests
│   └── SealedAuction.test.js
├── setup.ts            # Test setup and global mocks
└── README.md           # This file
```

## Running Tests

### Frontend Tests (Vitest)

Run all frontend tests:
```bash
npm test
```

Run tests in watch mode (interactive):
```bash
npm test
```

Run tests once (CI mode):
```bash
npm run test:run
```

Run tests with UI:
```bash
npm run test:ui
```

Generate coverage report:
```bash
npm run test:coverage
```

### Smart Contract Tests (Hardhat)

Run smart contract tests:
```bash
npm run test:contracts
```

## Test Coverage

### Component Tests
- **AuctionCard**: Tests rendering, user interactions, and prop handling
- **Hero**: Tests hero section display and navigation elements

### Utility Tests
- **Format Utils**: Tests time formatting and ETH amount conversion

### Contract Tests
- **SealedAuction**: Tests deployment, state management, bidding lifecycle, finalization, and access control

## Writing New Tests

### Component Test Example
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Utility Test Example
```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '@/utils/helpers';

describe('myFunction', () => {
  it('returns expected value', () => {
    expect(myFunction('input')).toBe('output');
  });
});
```

### Contract Test Example
```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyContract", function () {
  it("Should deploy correctly", async function () {
    const Contract = await ethers.getContractFactory("MyContract");
    const contract = await Contract.deploy();
    await contract.waitForDeployment();
    expect(await contract.owner()).to.not.equal(ethers.ZeroAddress);
  });
});
```

## Test Configuration

- **Vitest Config**: `vitest.config.ts`
- **Test Environment**: jsdom (simulates browser environment)
- **Test Framework**: Vitest with React Testing Library
- **Contract Testing**: Hardhat with Chai assertions

## Dependencies

- `vitest`: Test runner
- `@vitest/ui`: Interactive test UI
- `@testing-library/react`: React testing utilities
- `@testing-library/jest-dom`: Custom DOM matchers
- `@testing-library/user-event`: User interaction simulation
- `jsdom`: DOM implementation for Node.js
- `hardhat`: Ethereum development environment
- `chai`: Assertion library

## Best Practices

1. **Isolation**: Each test should be independent
2. **Descriptive Names**: Use clear test descriptions
3. **AAA Pattern**: Arrange, Act, Assert
4. **Mock External Dependencies**: Use `vi.fn()` for mocks
5. **Clean Up**: Use `afterEach` for cleanup
6. **Test Edge Cases**: Include error scenarios

## CI/CD Integration

For CI/CD pipelines, use:
```bash
npm run test:run
npm run test:contracts
```

These commands will run tests once and exit with appropriate status codes.

## Troubleshooting

### Tests not found
- Ensure test files match pattern `**/*.test.{ts,tsx,js}`
- Check that files are in the `tests/` directory

### Import errors
- Verify `@` alias is configured in `vitest.config.ts`
- Check that all dependencies are installed

### Contract test failures
- Ensure Hardhat is properly configured
- Verify contracts are compiled: `npx hardhat compile`

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Hardhat Testing](https://hardhat.org/tutorial/testing-contracts)
