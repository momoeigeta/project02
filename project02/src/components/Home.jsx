import React, { useState, useEffect, useContext } from 'react';
import { db } from "../firebase/Firebase";
import { Header } from './Header';
import { Balance } from './Balance';
import { IncomeExpense } from './IncomeExpense';
import { AddItem } from './AddItem';
import { AuthContext } from '../auth/AuthProvider';
import { totalCalc } from './TotalIncome';
// import { firebase } from "firebase/app";
import "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";


const Home = () => {

    const [inputText, setInputText] = useState("");
    const [inputAmount, setInputAmount] = useState(0);
    const [incomeItems, setIncomeItems] = useState([]);
    const [expenseItems, setExpenseItems] = useState([]);
    const [type, setType] = useState("inc");
    const [date, setDate] = useState(new Date());

    // const { currentUser } = useContext(AuthContext);

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

    const setCurrentMonth = () => {
        window.location.reload()
    };

    const addIncome = (text, amount) => {
        const docId = Math.random().toString(32).substring(2);
        // const date = db.Timestamp.now();

        collection('incomeItems').doc(docId).set({
            // uid: currentUser.uid,
            text,
            amount,
            date,
        })
    }

    // Balance
    const incomeTotal = totalCalc(incomeItems);

    return (
        <>
            <div className="container">
                <div className="top">
                    <Header
                        date={date}
                        setPrevMonth={setPrevMonth}
                        setNextMonth={setNextMonth}
                        setCurrentMonth={setCurrentMonth}
                    />
                    <Balance
                        incomeTotal={incomeTotal}
                        expenseItems={expenseItems}
                    />
                    <IncomeExpense
                        incomeTotal={incomeTotal}
                        expenseItems={expenseItems}
                    />
                </div>
                <AddItem
                    addIncome={addIncome}
                    // addExpense={addExpense}
                    inputText={inputText}
                    setInputText={setInputText}
                    inputAmount={inputAmount}
                    setInputAmount={setInputAmount}
                    type={type}
                    setType={setType}
                // selectedMonth={selectedMonth}
                // thisMonth={thisMonth}
                />

            </div>
        </>
    );

}


export default Home;