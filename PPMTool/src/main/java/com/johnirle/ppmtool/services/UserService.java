package com.johnirle.ppmtool.services;
// 
// John Irle
// 07 April 2020

import com.johnirle.ppmtool.domain.User;
import com.johnirle.ppmtool.exceptions.UsernameAlreadyExistsException;
import com.johnirle.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;


  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  public User saveUser (User newUser){

    try{
      newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
      //Username has to be unique (exception)
      newUser.setUsername(newUser.getUsername());
      // Make sure that password and confirmPassword match

      // We don't persist or show the confirmPassword
      newUser.setConfirmPassword("");
      return userRepository.save(newUser);

    }catch (Exception e){
      throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
    }

  }



}