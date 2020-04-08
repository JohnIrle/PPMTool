package com.johnirle.ppmtool.services;
// 
// John Irle
// 07 April 2020

import com.johnirle.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  
}
