import React from "react";
import {useProvideAuth, TeacherContext} from "utils/auth/AuthHooks"

const AuthProvider = ({children}) => {
    const auth = useProvideAuth();

    return(
        <TeacherContext.Provider value={auth}>
            {children}
        </TeacherContext.Provider>
    );
};

export default AuthProvider;
