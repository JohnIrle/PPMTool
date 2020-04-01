package com.johnirle.ppmtool.exceptions;
// 
// John Irle
// 31 March 2020

public class ProjectIdExceptionResponse {
  private String projectIdentifier;

  public ProjectIdExceptionResponse(String projectIdentifier) {
    this.projectIdentifier = projectIdentifier;
  }

  public String getProjectIdentifier() {
    return projectIdentifier;
  }

  public void setProjectIdentifier(String projectIdentifier) {
    this.projectIdentifier = projectIdentifier;
  }
}
