export const SAMPLE_EVENTS = {
  "billing.paid": {
    event: "billing.paid",
    data: {
      id: "bill_123456789",
      status: "paid",
      amount: 2990,
      customer: {
        name: "John Doe",
        email: "john@example.com",
      },
    },
  },
  "payouts.done": {
    event: "payouts.done",
    data: {
      id: "pay_123456789",
      status: "done",
      amount: 5000,
      bankAccount: {
        bank: "001",
        branch: "1234",
        account: "12345-6",
      },
    },
  },
  "payouts.failed": {
    event: "payouts.failed",
    data: {
      id: "pay_987654321",
      status: "failed",
      amount: 5000,
      failureReason: "invalid_account",
    },
  },
} as const;

export type SampleEventType = keyof typeof SAMPLE_EVENTS;

export const MOCK_HISTORY = [
  {
    id: "evt_1",
    type: "billing.paid",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    payload: SAMPLE_EVENTS["billing.paid"],
  },
  {
    id: "evt_2",
    type: "payouts.done",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    payload: SAMPLE_EVENTS["payouts.done"],
  },
  {
    id: "evt_3",
    type: "payouts.failed",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    payload: SAMPLE_EVENTS["payouts.failed"],
  },
];
