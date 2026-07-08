# Trove Finance Dashboard

A React application built with Vite, TypeScript, and Tailwind CSS. It serves as a mock portfolio dashboard designed to visualize asset allocations, handle complex financial edge cases, and present historical transaction data gracefully.

## How to run the project locally

1. **Install Dependencies**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```
   *(Alternatively, you can use `yarn` or `pnpm`)*

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

---

## Approach & Architectural Decisions

- **Component-Driven Architecture:** The UI is split into focused, reusable components like `TransactionRow`, `TickerIcon`, and `SubPortfolioCard`. This maintains a clean and readable tree in `DashboardContent`.
- **Centralized Data Derivation:** To keep components strictly focused on rendering, data calculations (like computing allocations or deriving values like `gainLoss`) are centralized inside `BaseHelper`. This creates a clean boundary between business logic and the view layer.
- **Type Safety:** Full TypeScript interfaces (`Holding`, `Transaction`, `HoldingDerived`) ensure that any quirks or unexpected fields in the JSON are safely handled or warned during development. The `HoldingDerived` interface extends the raw data with useful display flags (e.g., `hasPrice`, `isActive`).

---

## Handling the Intentional Data Quirks

The raw JSON payload contained several edge cases. Here is how they were thoughtfully resolved:

1. **NVDA has a currentPrice of 0:** 
   - **Decision:** It cannot be factored into net worth or asset allocation because its true value is unknown.
   - **Implementation:** In `BaseHelper.deriveHolding`, a `hasPrice` boolean flag is introduced. If false, properties like `marketValue` and `gainLoss` default to `null`. On the UI, this triggers a graceful "Price unavailable" fallback instead of rendering `$0.00` or breaking calculations.

2. **DIS has 0 shares:** 
   - **Decision:** It is no longer an active holding and shouldn't impact current portfolio visuals or allocations.
   - **Implementation:** Added an `isActive` flag (`shares > 0`). The dashboard components actively filter out holdings where `isActive` is false, completely removing DIS from the holdings list and the allocation chart.

3. **Transaction status "PENDING":** 
   - **Decision:** A pending transaction means the order is placed but not executed; the final price isn't locked in.
   - **Implementation:** The `TransactionRow` component replaces the hardcoded `totalAmount` with a "Price unavailable" message and applies a distinct yellow-toned badge to signify it's awaiting finalization.

4. **Transaction status "FAILED":** 
   - **Decision:** The transaction didn't go through. It should remain in history for auditing but must look distinctly inactive.
   - **Implementation:** The entire row is slightly faded out (`opacity-90`), the amount text is given a `line-through` (strikethrough) with a disabled text color, and it gets a red "FAILED" status badge.

5. **Gain/loss for negative returns:** 
   - **Decision:** Requires precise signage (the minus sign must be before the currency symbol) and semantic coloring.
   - **Implementation:** Created a utility `formatSignedCurrency` in `BaseHelper` that uses `Math.abs` to isolate the value, properly formatting strings like `-$15.00` (instead of `$-15.00`). Negative numbers are paired with the Tailwind `text-error` (red) class, while positive numbers use `text-success` (green).

---

## Future Improvements

Given more time, here are a few things I would add or improve:

1. **Unit Testing:** Implement testing using Vitest and React Testing Library, specifically prioritizing the `BaseHelper` logic to ensure edge cases (like zero shares, zero prices, negative percentages) are robustly handled.
2. **State Management & Data Fetching:** Use React Query (TanStack Query) to manage the API calls. This would handle caching, loading states, skeleton loaders, and error boundaries much better than native hooks.
3. **Virtualization:** For users with hundreds of holdings or transactions, I would implement `react-window` or `react-virtuoso` to virtualize the lists and maintain high performance.
4. **Accessibility (a11y):** Enhance ARIA labeling across custom buttons (e.g., the show/hide balance toggle) and ensure the Recharts tooltips can be navigated via keyboard.
5. **Responsive Polish:** Refine the behavior of the data tables and charts on very small mobile viewports to prevent horizontal scrolling or text clipping.
