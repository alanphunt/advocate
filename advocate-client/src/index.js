import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from "react-router-dom";
import './css/styles.scss';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AuthProvider from 'utils/auth/AuthProvider';
import UiProvider from 'utils/ui/UiProvider';

ReactDOM.render(
        <BrowserRouter>
            <AuthProvider>
                <UiProvider>
                    <Route path="/" component={App}/>
                </UiProvider>
            </AuthProvider>
        </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
