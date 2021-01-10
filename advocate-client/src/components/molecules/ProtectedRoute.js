import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "utils/auth/AuthHooks";

const ProtectedRoute = ({children, path}) => {
    let auth = useAuth();
    return (
        <Route path={path} render={({location}) => 
                auth.teacher 
                    ? children
                    : <Redirect to={{
                        pathname: "/",
                        state: { from: location }
                      }}/>
            }/>
    );
};

export default ProtectedRoute;
