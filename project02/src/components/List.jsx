import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import "../styles/List.css";
import { db } from "../firebase/Firebase";

import {
    collection
    , where, query, orderBy
    , onSnapshot
    , limit
} from "firebase/firestore";
import { AuthContext } from '../auth/AuthProvider';


export const List = () => {

    const [incomeItems, setIncomeItems] = useState([]);
    const [expenseItems, setExpenseItems] = useState([]);
    const [date] = useState(new Date());
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        getIncomeData();
        getExpenseData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
    );

    useEffect(() => {
        getIncomeData();
        getExpenseData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);
    const history = useHistory();


    const getIncomeData = () => {
        const incomeData = query(collection(db, 'incomeItems')
            , where('uid', '==', currentUser.uid)
            // , where('lastUpdated', '>', 'lastFetchTimestamp')
            , orderBy('date')
            , limit(25)
        );
        // eslint-disable-next-line
        const unsubscribe = onSnapshot(incomeData, (querySnapshot) => {
            const incomeItems = [];
            querySnapshot.forEach(doc => incomeItems.push({ ...doc.data(), docId: doc.id }))
            setIncomeItems(incomeItems);
        });
    };

    const getExpenseData = () => {
        const expenseData = query(collection(db, 'expenseItems')
            , where('uid', '==', currentUser.uid)
            , orderBy('date')
            , limit(25)
        );

        // eslint-disable-next-line
        const unsubscribe = onSnapshot(expenseData, (querySnapshot) => {
            const expenseItems = [];
            querySnapshot.forEach(doc => expenseItems.push({ ...doc.data(), docId: doc.id }))
            setExpenseItems(expenseItems);
        });


    };

    return (
        <>
            <div className="List">
                <div className="List-container">
                    <button className="showToday" type="button" onClick={() => history.goBack()}>戻る</button>
                    <h1>収支一覧</h1>
                    <div className="list-container">
                        <div className="income-list">
                            <h3>収入一覧</h3>
                            <ul className="list">
                                {incomeItems.map((incomeItem) => (
                                    <IncomeItem
                                        incomeText={incomeItem.text}
                                        incomeAmount={incomeItem.amount}
                                        incomeItem={incomeItem}
                                        key={incomeItem.docId}
                                        date={incomeItem.date.toDate()}
                                    />
                                ))}
                            </ul>
                        </div>
                        <div className="expense-list">
                            <h3>支出一覧</h3>
                            <ul className="list">
                                {expenseItems.map((expenseItem) => (
                                    <ExpenseItem
                                        expenseText={expenseItem.text}
                                        expenseAmount={expenseItem.amount}
                                        expenseItem={expenseItem}
                                        key={expenseItem.docId}
                                        date={expenseItem.date.toDate()}
                                    />
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};

export const IncomeItem = ({ incomeText, incomeAmount, date }) => {
    return (
        <li>
            <div>{date.getMonth() + 1}月
                <span>{date.getDate()}日</span>
            </div>
            <div>{incomeText}</div>
            <div className="money-plus">+{Number(incomeAmount).toLocaleString()}円</div>
        </li>
    )
};

export const ExpenseItem = ({ expenseText, expenseAmount, date }) => {

    return (
        <li>
            <div>{date.getMonth() + 1}月
                <span>{date.getDate()}日</span>
            </div>
            <div className="text">{expenseText}</div>
            <div className="money-minus">-{Number(expenseAmount).toLocaleString()}円
            </div>
        </li>
    );
};



// export default List;