package com.johnirle.ppmtool.domain;
// 
// John Irle
// 02 April 2020

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Backlog {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Integer PTSequence = 0;
  private String projectIdentifier;

  //OneToOne with project

  //OneToMany projectTasks


  public Backlog() {
  }

  public Long getId() {
    return id;
  }
}
