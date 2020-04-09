package com.johnirle.ppmtool.services;
// 
// John Irle
// 31 March 2020

import com.johnirle.ppmtool.domain.Backlog;
import com.johnirle.ppmtool.domain.Project;
import com.johnirle.ppmtool.domain.User;
import com.johnirle.ppmtool.exceptions.ProjectIdException;
import com.johnirle.ppmtool.exceptions.ProjectNotFoundException;
import com.johnirle.ppmtool.repositories.BacklogRepository;
import com.johnirle.ppmtool.repositories.ProjectRepository;
import com.johnirle.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProjectService {

  @Autowired
  private ProjectRepository projectRepository;

  @Autowired
  private BacklogRepository backlogRepository;

  @Autowired
  private UserRepository userRepository;


  public Project saveOrUpdateProject(Project project, String username) {

    // project.getId != null
    // find by db id -> null

    if(project.getId() != null) {
      Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());

      if (existingProject != null && (!existingProject.getProjectLeader().equals(username))) {
        throw new ProjectNotFoundException("Project not found in your account");
      } else if (existingProject == null) {
        throw new ProjectNotFoundException("Project with ID: '" + project.getProjectIdentifier()+"' cannot be updated because it doesn't exist");
      }
    }


    try {
      String projectIdentifier = project.getProjectIdentifier().toUpperCase();

      User user = userRepository.findByUsername(username);
      project.setUser(user);
      project.setProjectLeader(user.getUsername());
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
      throw new ProjectIdException("Project ID '"+ project.getProjectIdentifier().toUpperCase() +"' already exists");
    }
  }

  public Project findProjectByIdentifier(String projectId, String username) {

    Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

    if (project == null) {
      throw new ProjectIdException("Project Id '"+projectId.toUpperCase()+"' does not exist");
    }

    if(!project.getProjectLeader().equals(username)) {
      throw new ProjectNotFoundException("Project not found in your account");
    }

    return project;
  }

  public Iterable<Project> findAllProjects(String username) {
    return projectRepository.findAllByProjectLeader(username);
  }

  public void deleteProjectByIdentifier(String projectId, String username) {


    projectRepository.delete(findProjectByIdentifier(projectId, username));
  }
}
