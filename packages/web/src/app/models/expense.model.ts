export type Expense = {
  name: string;
  amount: number;
};

type WhoOwesWho = {
  amount: number;
  owes: string;
  owed: string;
}

export type APIRequestResponse = {
  equalShare: number;
  payouts: Array<WhoOwesWho>;
  total: number;
}
