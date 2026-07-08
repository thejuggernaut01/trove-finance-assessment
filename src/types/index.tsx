export type Currency = 'USD' | 'NGN';
export type TxStatus = 'COMPLETED' | 'PENDING' | 'FAILED';
export type TxType = 'BUY' | 'SELL';

export type LoginProps = {
  email: string;
  password: string;
};
