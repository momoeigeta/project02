import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Login from "./Login";

const PrivateRoute = ({ component, ...rest }) => {
    const { currentUser } = useContext(AuthContext);

    const renderingComponent = currentUser ? component : Login;

    return <Route {...rest} component={renderingComponent} />
};

export default PrivateRoute;