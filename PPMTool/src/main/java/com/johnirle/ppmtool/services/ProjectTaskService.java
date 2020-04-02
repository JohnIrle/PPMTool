package com.johnirle.ppmtool.services;
// 
// John Irle
// 02 April 2020

import com.johnirle.ppmtool.domain.Backlog;
import com.johnirle.ppmtool.domain.ProjectTask;
import com.johnirle.ppmtool.repositories.BacklogRepository;
import com.johnirle.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

  @Autowired
  private BacklogRepository backlogRepository;

  @Autowired
  private ProjectTaskRepository projectTaskRepository;

  public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
    Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

    projectTask.setBacklog(backlog);
    // project sequence IDPRO-1, IDPRO-2 etc
    Integer BacklogSequence = backlog.getPTSequence();
    BacklogSequence++;
    backlog.setPTSequence(BacklogSequence);

    // Add Sequence to Project Task
    projectTask.setProjectSequence(projectIdentifier+"-"+BacklogSequence);
    projectTask.setProjectIdentifier(projectIdentifier);

    // Initial priority when priority null
    if(projectTask.getPriority() == null) {
      projectTask.setPriority(3);
    }
    // Initial status when status is null
    if(projectTask.getStatus()==null) {
      projectTask.setStatus("TO_DO");
    }

    return projectTaskRepository.save(projectTask);
  }
}
