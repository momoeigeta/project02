import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Balance } from './Balance';
import { totalCalc } from './TotalIncome';
// import Header from './Header';

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
                </div>

            </div>
        </>
    );

}


export default Home;