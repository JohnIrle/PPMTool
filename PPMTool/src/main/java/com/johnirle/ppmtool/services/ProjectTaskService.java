package com.johnirle.ppmtool.services;
// 
// John Irle
// 02 April 2020

import com.johnirle.ppmtool.domain.Backlog;
import com.johnirle.ppmtool.domain.Project;
import com.johnirle.ppmtool.domain.ProjectTask;
import com.johnirle.ppmtool.exceptions.ProjectNotFoundException;
import com.johnirle.ppmtool.repositories.BacklogRepository;
import com.johnirle.ppmtool.repositories.ProjectRepository;
import com.johnirle.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

  @Autowired
  private BacklogRepository backlogRepository;

  @Autowired
  private ProjectTaskRepository projectTaskRepository;


  public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
    try {
      Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

      projectTask.setBacklog(backlog);
      // project sequence IDPRO-1, IDPRO-2 etc
      Integer BacklogSequence = backlog.getPTSequence();
      BacklogSequence++;
      backlog.setPTSequence(BacklogSequence);

      // Add Sequence to Project Task
      projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
      projectTask.setProjectIdentifier(projectIdentifier);

      // Initial priority when priority null
      if (projectTask.getPriority() == null) {
        projectTask.setPriority(3);
      }
      // Initial status when status is null
      if (projectTask.getStatus() == null) {
        projectTask.setStatus("TO_DO");
      }

      return projectTaskRepository.save(projectTask);
    } catch (Exception ex) {
      throw new ProjectNotFoundException("Project not found");
    }
  }

  public Iterable<ProjectTask> findBacklogById(String id) {

    Iterable<ProjectTask> tasks = projectTaskRepository.findByProjectIdentifierOrderByPriority(id);

    if (((List<ProjectTask>) tasks).isEmpty()){
      throw new ProjectNotFoundException("Project with ID: '" + id + "' does not exist");
    }
    return tasks;
  }

  public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id) {
    // make sure we are searching on an existing backlog

    Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
    if(backlog == null) {
      throw new ProjectNotFoundException("Project with ID: '" + backlog_id + "' does not exist");
    }

    // make sure that the task exists
    ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);

    if (projectTask == null) {
      throw new ProjectNotFoundException("Project Task '" + pt_id + "' not found");
    }

    // make sure that the backlog/project id in the path corresponds to the correct project
    if(!projectTask.getBacklog().getProjectIdentifier().equals(backlog_id)){
      throw new ProjectNotFoundException("Project Task '" + pt_id + "' does not exist in project: '" + backlog_id);
    }

    return projectTask;
  }
}
