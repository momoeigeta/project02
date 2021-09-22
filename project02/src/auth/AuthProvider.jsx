import React, { useEffect, useState, createContext } from "react";
import { auth } from "../firebase/Firebase";

import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// const auth = getAuth();

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    //サインアップ後認証情報を更新
    const signup = async (email, password, history) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            onAuthStateChanged(auth, user => setCurrentUser(user));
            history.push("/");
        } catch (error) {
            alert(error);
        }
    };

    //ログインさせる
    const login = async (email, password, history) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onAuthStateChanged(auth, user => setCurrentUser(user));
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }

    //初回アクセス時に認証済みかチェック
    useEffect(() => {
        onAuthStateChanged(auth, setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider value={{auth, signup, login, currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }