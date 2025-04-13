export const formatCurrency = (amount: number) => {
    return `€${parseFloat(amount.toString()).toFixed(2)}`;
};