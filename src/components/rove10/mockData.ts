// All values are invented placeholders. No real names, IDs or balances.

export interface StatusRow {
  id: string;
  asset: string;
  type: string;
  amount: string;
  date: string;
  status: string;
}

// One series per tab. Values are arbitrary, shaped so each tab looks different.
export const performanceSeries: Record<string, { labels: string[]; values: number[] }> = {
  "1D": {
    labels: ["9am", "11am", "1pm", "3pm", "5pm"],
    values: [1.2, 1.4, 1.3, 1.7, 1.6],
  },
  "1W": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    values: [14, 18, 16, 21, 19],
  },
  "1M": {
    labels: ["W1", "W2", "W3", "W4"],
    values: [40, 52, 48, 61],
  },
  YTD: {
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
    values: [30, 42, 38, 55, 60, 72],
  },
};

export const statusRows: StatusRow[] = [
  { id: "TX-1001", asset: "91-day Treasury bill", type: "Subscribe", amount: "$100,000", date: "Apr 10, 12:23", status: "done" },
  { id: "TX-1002", asset: "Money market fund", type: "Sell", amount: "$50,000", date: "Apr 10, 12:40", status: "pending" },
  { id: "TX-1003", asset: "Dollar fund", type: "Deposit", amount: "$500,000", date: "Apr 11, 09:05", status: "failed" },
  { id: "TX-1004", asset: "FGN bond 2030", type: "Withdrawal", amount: "$75,000", date: "Apr 11, 14:18", status: "queued" },
  { id: "TX-1005", asset: "Equity fund", type: "Buy", amount: "$20,000", date: "Apr 12, 10:02", status: "approved" },
];
