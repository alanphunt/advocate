package com.structure.repositories;

import com.structure.models.AccountDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountDetailsRepo extends CrudRepository<AccountDetails, String>  {
    AccountDetails findByUsername(String username);
}
