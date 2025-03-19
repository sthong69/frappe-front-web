export interface CreditTransfer {
  id: number;
  university: string;
  country: string;
  startDate: string;
  endDate: string;
}

export interface GetCreditTransfersInput {
  id: number;
}
