import React from 'react';
import { Timestamp } from 'firebase/firestore';

export const IncomeItem = ({ deleteIncome, incomeItem, incomeText, incomeAmount, thisMonth, selectedMonth, date }) => {

    const deleteHandler = () => {
        deleteIncome(incomeItem.docId);
    };

    const today = date;
    const day = today.getDate();

    // const sdate = Timestamp.toDate();

    const showThisMonth = () => {
        return (
            <li className="thisMonthList">
                <div>{day}日</div>
                <div>{incomeText}</div>
                <div className="money-plus">+{Number(incomeAmount).toLocaleString()}円</div>
                <button className="delete-btn" onClick={deleteHandler}>×</button>
            </li>
        )
    }

    const showPastMonth = () => {
        return (
            <li>
                {/* {sdate} */}
                {/* <div>{date.day}日</div> */}
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