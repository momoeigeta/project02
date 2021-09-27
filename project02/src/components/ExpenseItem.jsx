import React from 'react';

export const ExpenseItem = ({ deleteExpense, expenseItem, expenseText, expenseAmount, incomeTotal, thisMonth, selectedMonth, date }) => {

    const deleteHandler = () => {
        deleteExpense(expenseItem.docId);
    };

    const percentage = () => {
        if (incomeTotal >= 1) {
            return `${Math.round((expenseAmount / incomeTotal) * 100)} %`;
        } else {
            return "--";
        };
    };

    // const today = date;
    // const day = today.getDate();


    const showThisMonth = () => {
        return (
            <li className="thisMonthList">
                <div>{date.getMonth() + 1}月
                    <span>{date.getDate()}日</span>
                </div>
                <div className="text">{expenseText}</div>
                <div className="money-minus">-{Number(expenseAmount).toLocaleString()}円
                    <span>{percentage()}</span>
                    <button className="delete-btn" onClick={deleteHandler}>×</button>
                </div>
            </li>
        );
    };

    const showPastMonth = () => {
        return (
            <li>
                <div>{date.getMonth() + 1}月
                    <span>{date.getDate()}日</span>
                </div>

                <div className="text">{expenseText}</div>
                <div className="money-minus">-{Number(expenseAmount).toLocaleString()}円
                    <span>{percentage()}</span>
                </div>
            </li>
        );
    };

    return (
        <>
            {thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}
        </>
    );
};