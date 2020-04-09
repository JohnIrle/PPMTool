package com.johnirle.ppmtool.services;
// 
// John Irle
// 02 April 2020

import com.johnirle.ppmtool.domain.Backlog;
import com.johnirle.ppmtool.domain.ProjectTask;
import com.johnirle.ppmtool.exceptions.ProjectNotFoundException;
import com.johnirle.ppmtool.repositories.BacklogRepository;
import com.johnirle.ppmtool.repositories.ProjectRepository;
import com.johnirle.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

  @Autowired
  private BacklogRepository backlogRepository;

  @Autowired
  private ProjectTaskRepository projectTaskRepository;

  @Autowired
  private ProjectRepository projectRepository;

  @Autowired
  private ProjectService projectService;


  public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {


      Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();

      projectTask.setBacklog(backlog);
      // project sequence IDPRO-1, IDPRO-2 etc
      Integer BacklogSequence = backlog.getPTSequence();
      // Update BL Sequence
      BacklogSequence++;
      backlog.setPTSequence(BacklogSequence);

      // Add Sequence to Project Task
      projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
      projectTask.setProjectIdentifier(projectIdentifier);

      // Initial priority when priority null
      if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
        projectTask.setPriority(3);
      }
      // Initial status when status is null
      if (projectTask.getStatus() == null) {
        projectTask.setStatus("TO_DO");
      }

      return projectTaskRepository.save(projectTask);
  }


  public Iterable<ProjectTask> findBacklogById(String id, String username) {

    projectService.findProjectByIdentifier(id, username);

    return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
  }


  public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id, String username) {

    // make sure we are searching on an existing backlog
    projectService.findProjectByIdentifier(backlog_id, username);


    ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);

    // make sure that the task exists
    if (projectTask == null) {
      throw new ProjectNotFoundException("Project Task '" + pt_id + "' not found");
    }

    // make sure that the backlog/project id in the path corresponds to the correct project
    if(!projectTask.getProjectIdentifier().equals(backlog_id)){
      throw new ProjectNotFoundException("Project Task '" + pt_id + "' does not exist in project: '" + backlog_id);
    }

    return projectTask;
  }

  public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlog_id, String pt_id, String username) {
    ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id, username);

    projectTask = updatedTask;

    return projectTaskRepository.save(projectTask);
  }

  public void deletePTByProjectSequence(String backlog_id, String pt_id, String username) {
    ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id, username);

    projectTaskRepository.delete(projectTask);
  }
}
