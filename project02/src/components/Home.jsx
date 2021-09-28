import React, { useState, useEffect, useContext } from 'react';
import { db } from "../firebase/Firebase";
import { Header } from './Header';
import { Balance } from './Balance';
import { IncomeExpense } from './IncomeExpense';
import { AddItem } from './AddItem';
import { ItemsList } from './ItemsList';
import { AuthContext } from '../auth/AuthProvider';
import { totalCalc } from './TotalIncome';
// import { firebase } from "firebase/app";
import "firebase/firestore";
import {
    collection
    // , addDoc, getDocs
    , doc, setDoc
    , where, query, orderBy, startAt, endAt
    , onSnapshot
    , Timestamp
    , deleteDoc
} from "firebase/firestore";


const Home = () => {

    const [inputText, setInputText] = useState("");
    const [inputAmount, setInputAmount] = useState(0);
    const [incomeItems, setIncomeItems] = useState([]);
    const [expenseItems, setExpenseItems] = useState([]);
    const [type, setType] = useState("inc");
    const [date, setDate] = useState(new Date());

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


    // Header
    const setPrevMonth = () => {
        const year = date.getFullYear();
        const month = date.getMonth() - 1;
        const day = date.getDate();
        setDate(new Date(year, month, day));
    };

    const setNextMonth = () => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        setDate(new Date(year, month, day));
    };

    // const setCurrentMonth = () => {
    //     window.location.reload()
    // };

    // get first date of the month
    const startOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };

    // get last date of this month
    const endOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    };

    // operate add form and income/expense list
    const selectedMonth = date.getMonth() + 1;
    const today = new Date();
    const thisMonth = today.getMonth() + 1;

    // firebase IncomeData
    const getIncomeData = () => {
        const incomeData = query(collection(db, 'incomeItems')
            , where('uid', '==', currentUser.uid)
            , orderBy('date')
            , startAt(startOfMonth(date))
            , endAt(endOfMonth(date))
        );

        // eslint-disable-next-line
        const unsubscribe = onSnapshot(incomeData, (querySnapshot) => {
            const incomeItems = [];
            querySnapshot.forEach(doc => incomeItems.push({ ...doc.data(), docId: doc.id }))
            setIncomeItems(incomeItems);
        });
    };

    const addIncome = (text, amount) => {
        const docId = Math.random().toString(32).substring(2);
        const date =
            Timestamp.now();
        // new Date();

        setDoc(doc(db, "incomeItems", docId), {
            uid: currentUser.uid,
            text,
            amount,
            date,
        });
        setIncomeItems([
            ...incomeItems, { text: inputText, amount: inputAmount, docId: docId, date: date }
        ]);
    };

    const deleteIncome = (docId) => {
        deleteDoc(doc(db, "incomeItems", docId));
    };


    // firebase Expense data 
    const getExpenseData = () => {
        const expenseData = query(collection(db, 'expenseItems')
            , where('uid', '==', currentUser.uid)
            , orderBy('date')
            , startAt(startOfMonth(date))
            , endAt(endOfMonth(date)));

        // eslint-disable-next-line
        const unsubscribe = onSnapshot(expenseData, (querySnapshot) => {
            const expenseItems = [];
            querySnapshot.forEach(doc => expenseItems.push({ ...doc.data(), docId: doc.id }))
            setExpenseItems(expenseItems);
        });
    };

    const addExpense = (text, amount) => {
        const docId = Math.random().toString(32).substring(2);
        const date = Timestamp.now();

        setDoc(doc(db, "expenseItems", docId), {
            uid: currentUser.uid,
            text,
            amount,
            date,
        });
        setExpenseItems([
            ...expenseItems, { text: inputText, amount: inputAmount, docId: docId, date: date }
        ]);
    };

    const deleteExpense = (docId) => {
        deleteDoc(doc(db, "expenseItems", docId));
    };


    // calculate % and show total 
    // Balance
    const incomeTotal = totalCalc(incomeItems);

    // const incomeTotal = totalCalc(incomeItems);


    return (
        <>
            <div className="container">
                <div className="top">
                    <Header
                        date={date}
                        setPrevMonth={setPrevMonth}
                        setNextMonth={setNextMonth}
                    // setCurrentMonth={setCurrentMonth}
                    />
                    <Balance
                        incomeTotal={incomeTotal}
                        expenseItems={expenseItems}
                    // setPrevMonth={setPrevMonth}
                    />
                    <IncomeExpense
                        incomeTotal={incomeTotal}
                        expenseItems={expenseItems}
                    />
                </div>
                <AddItem
                    addIncome={addIncome}
                    addExpense={addExpense}
                    inputText={inputText}
                    setInputText={setInputText}
                    inputAmount={inputAmount}
                    setInputAmount={setInputAmount}
                    type={type}
                    setType={setType}
                    selectedMonth={selectedMonth}
                    thisMonth={thisMonth}
                    date={date}
                />
                <ItemsList
                    deleteIncome={deleteIncome}
                    deleteExpense={deleteExpense}
                    incomeTotal={incomeTotal}
                    incomeItems={incomeItems}
                    expenseItems={expenseItems}
                    selectedMonth={selectedMonth}
                    thisMonth={thisMonth}
                    date={date}
                // date={incomeItems.date}
                />
            </div>
        </>
    );

};

export default Home;