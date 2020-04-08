package com.johnirle.ppmtool.exceptions;
// 
// John Irle
// 08 April 2020

public class UsernameAlreadyExistsResponse {

  private String username;

  public UsernameAlreadyExistsResponse(String username) {
    this.username = username;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
}
