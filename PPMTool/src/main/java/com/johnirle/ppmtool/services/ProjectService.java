package com.johnirle.ppmtool.services;
// 
// John Irle
// 31 March 2020

import com.johnirle.ppmtool.domain.Backlog;
import com.johnirle.ppmtool.domain.Project;
import com.johnirle.ppmtool.exceptions.ProjectIdException;
import com.johnirle.ppmtool.repositories.BacklogRepository;
import com.johnirle.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

  @Autowired
  private ProjectRepository projectRepository;

  @Autowired
  private BacklogRepository backlogRepository;


  public Project saveOrUpdateProject(Project project) {
    String projectIdentifier = project.getProjectIdentifier().toUpperCase();

    try {
      project.setProjectIdentifier(projectIdentifier);

      if(project.getId() == null) {
        Backlog backlog = new Backlog();
        project.setBacklog(backlog);
        backlog.setProject(project);
        backlog.setProjectIdentifier(projectIdentifier);
      }

      if(project.getId() != null) {
        project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
      }

      return projectRepository.save(project);
    } catch (Exception e) {
      throw new ProjectIdException("Project ID '"+projectIdentifier+"' already exists");
    }
  }

  public Project findProjectByIdentifier(String projectId) {

    Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

    if (project == null) {
      throw new ProjectIdException("Project Id '"+projectId.toUpperCase()+"' does not exist");
    }

    return project;
  }

  public Iterable<Project> findAllProjects() {
    return projectRepository.findAll();
  }

  public void deleteProjectByIdentifier(String projectId) {
    Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

    if(project == null) {
      throw new ProjectIdException("Cannot Delete Project with ID '"+projectId.toUpperCase()+"'. This project does not exist");
    }

    projectRepository.delete(project);
  }
}
