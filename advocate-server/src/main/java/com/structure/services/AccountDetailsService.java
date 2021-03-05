package com.structure.services;

import com.structure.models.AccountDetails;
import com.structure.repositories.AccountDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AccountDetailsService implements UserDetailsService{

    @Autowired
    private AccountDetailsRepo adr;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return adr.findByUsername(username);
    }

    public AccountDetails refreshAccountDetailsWithUsername(String username){
        return adr.findByUsername(username);
    };

    public AccountDetails saveAccountDetails(AccountDetails accountDetails){
        return adr.save(accountDetails);
    }

}
