import React
// , { useContext }
    from 'react';
import { auth } from "../firebase/Firebase";
// import { AuthContext } from '../auth/AuthProvider';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const SignOutButton = styled(Button)({
    // background: '#C1C1C1',
    background: "#9e9eff",
    fontSize: '1.0rem',
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

    return (
        <div className="head">
            <SignOutButton onClick={() => auth.signOut()}>サインアウト</SignOutButton>
            <button className="showToday" onClick={() => setDate(new Date())}>今月</button>

            <div className="showMonth">
                <button onClick={() => setPrevMonth()}>⇦前月</button>
                <h1>{year}年{month}月</h1>
                <button onClick={() => setNextMonth()}>次月⇨</button>
            </div>
        </div>
    )
};

// export default Header;