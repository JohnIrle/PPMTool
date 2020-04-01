package com.johnirle.ppmtool.services;
// 
// John Irle
// 31 March 2020

import com.johnirle.ppmtool.domain.Project;
import com.johnirle.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

  @Autowired
  private ProjectRepository projectRepository;


  public Project saveOrUpdateProject(Project project) {

    return projectRepository.save(project);
  }
}
