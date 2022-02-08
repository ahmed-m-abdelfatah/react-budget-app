import React from 'react';

const BudgetsContext = React.createContext();

export function useBudgets() {}

export const BudgetsProvider = ({ children }) => {
  return children;
};
