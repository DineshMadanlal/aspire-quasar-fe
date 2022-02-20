export const MAX_CARD_TRANSACTIONS_LIST = 4;

export const CARD_CHARGE_TYPES = {
  REFUND: 'REFUND',
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT',
};

export const CARD_TYPES = {
  DEBIT: 'DEBIT',
  CREDIT: 'CREDIT',
};

export const CARD_TAB_OPTOINS = {
  DEBIT_CARDS: {
    name: 'debitcards', label: 'My debit cards',
  },
  COMPANY_CARDS: {
    name: 'companycards', label: 'All company cards',
  },
};

export const TRANSACTION_ICONS = {
  Other: {
    icon: 'megaphone', bgColor: 'rgba(242, 81, 149, 0.1)',
  },
  Food: {
    icon: 'file-storage', bgColor: 'rgba(0, 157, 255, 0.1)',
  },
  Flight: {
    icon: 'flights', bgColor: 'rgba(0, 214, 181, 0.1)',
  },
};
