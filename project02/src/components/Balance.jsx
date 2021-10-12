import React from 'react';

export const Balance = ({ incomeTotal, expenseItems, allIncomeTotal, allExpenseItems }) => {

    const expenseAmounts = expenseItems.map(expenseItem => expenseItem.amount);

    const expenseTotal = expenseAmounts.reduce((acc, cur) => acc += cur, 0);

    const balance = incomeTotal - expenseTotal;


    const allExpenseAmounts = allExpenseItems.map(allExpenseItem => allExpenseItem.amount);
    const allExpenseTotal = allExpenseAmounts.reduce((acc, cur) => acc += cur, 0);
    const allBalance = allIncomeTotal - allExpenseTotal;


    return (
        <div className="Balance">
            <div className="balance-container">
                <h2>収支</h2>
                <div className="balance">
                    {Number(balance).toLocaleString()}
                    <span>円</span>
                </div>

                <div className="all-balance">
                    <h5>残高</h5>
                    {Number(allBalance).toLocaleString()}
                    <span>円</span>
                </div>
            </div>
        </div>
    );
};