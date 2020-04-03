package com.johnirle.ppmtool.exceptions;
// 
// John Irle
// 02 April 2020

public class ProjectNotFoundExceptionResponse {
  private String ProjectNotFound;

  public ProjectNotFoundExceptionResponse(String projectNotFound) {
    this.ProjectNotFound = projectNotFound;
  }

  public String getProjectNotFound() {
    return ProjectNotFound;
  }

  public void setProjectNotFound(String projectNotFound) {
    this.ProjectNotFound = projectNotFound;
  }
}
