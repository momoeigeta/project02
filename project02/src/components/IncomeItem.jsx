import React from 'react';

export const IncomeItem = ({ deleteIncome, incomeItem, incomeText, incomeAmount, thisMonth, selectedMonth, date }) => {

    const deleteHandler = () => {
        deleteIncome(incomeItem.docId);
    };


    const showThisMonth = () => {
        return (
            <li className="thisMonthList">
                <div>{date.getMonth() + 1}月
                    <span>{date.getDate()}日</span>
                </div>
                <div>{incomeText}</div>
                <div className="money-plus">+{Number(incomeAmount).toLocaleString()}円</div>
                <button className="delete-btn" onClick={deleteHandler}>×</button>
            </li>
        )
    }

    const showPastMonth = () => {
        return (
            <li>
                <div>{date.getMonth() + 1}月
                    <span>{date.getDate()}日</span>
                </div>
                <div>{incomeText}</div>
                <div className="money-plus">+{Number(incomeAmount).toLocaleString()}円</div>
            </li>
        )
    }

    return (
        <>
            {thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}
        </>
    )
}