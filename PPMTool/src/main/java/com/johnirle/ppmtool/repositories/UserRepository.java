package com.johnirle.ppmtool.repositories;
// 
// John Irle
// 07 April 2020

import com.johnirle.ppmtool.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}
