import React
// , { useContext }
, { useState }
    from 'react';
import { auth } from "../firebase/Firebase";
// import { AuthContext } from '../auth/AuthProvider';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import DatePicker from "react-datepicker";
import {
    registerLocale
    // , setDefaultLocale
} from "react-datepicker";
import ja from 'date-fns/locale/ja';
import "./datepicker.scss";
import Calender from "./calPink.png";

registerLocale('ja', ja)


const SignOutButton = styled(Button)({
    // background: '#C1C1C1',
    background: "#9e9eff",
    // fontSize: '1.0rem',
    fontSize: '1.2rem',
    // fontWeight: "bold",
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 30,
    padding: '0 10px',
    margin: '0 0 0 auto',
    display: 'block',
    '&:hover': {
        // backgroundColor: '#B4B4B4',
        backgroundColor: '#9393ff',

    },
});

export const Header = ({ date, setPrevMonth, setNextMonth, setDate }) => {

    // const { currentUser } = useContext(AuthContext);

    const today = date;
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    // const day = today.getDate();


    const [startDate, setStartDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (date) => {
        setIsOpen(!isOpen);
        setStartDate(date);
        setDate(date);
    };
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);

    };

    const PrevMonth = () => {
        const year = date.getFullYear();
        const month = date.getMonth() - 1;
        const day = date.getDate();
        setStartDate(new Date(year, month, day));
        setPrevMonth();
    };

    const NextMonth = () => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        setStartDate(new Date(year, month, day));
        setNextMonth();
    };


    return (
        <div className="head">
            <SignOutButton onClick={() => auth.signOut()}>サインアウト</SignOutButton>

            <div className="headerItem">
                <button className="showToday" onClick={() => {
                    setDate(new Date());
                    setStartDate(new Date());
                }}>今月</button>

                <img src={Calender} alt=""
                    className="calender"
                    onClick={handleClick}
                // startDate
                />

            {
                isOpen && (
                    <div>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => handleChange(date)}
                            inline
                            showMonthYearPicker
                            locale="ja"
                        />
                    </div>
                )
            }
            </div>





            <div className="showMonth">
                <button onClick={PrevMonth}>
                    ⇦前月</button>

                <h1>{year}年{month}月</h1>

                <button onClick={NextMonth}>
                    次月⇨</button>
            </div>
        </div >
    )
};

