package com.structure.utilities;

import com.structure.models.AccountDetails;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequestScope
public class AccountDetailsRequestBean {

    private AccountDetails accountDetails;


    public AccountDetailsRequestBean() {
    }

    public AccountDetailsRequestBean(AccountDetails accountDetails) {
        this.accountDetails = accountDetails;
    }

    public AccountDetails getAccountDetails() {
        return this.accountDetails;
    }

    public void setAccountDetails(AccountDetails accountDetails) {
        this.accountDetails = accountDetails;
    }

    @Override
    public String toString() {
        return "{" +
            " accountDetails='" + getAccountDetails() + "'" +
            "}";
    }

}
