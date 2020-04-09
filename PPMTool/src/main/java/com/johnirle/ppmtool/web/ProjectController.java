package com.johnirle.ppmtool.web;
// 
// John Irle
// 31 March 2020

import com.johnirle.ppmtool.domain.Project;
import com.johnirle.ppmtool.services.MapValidationErrorService;
import com.johnirle.ppmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/project")
public class ProjectController {

  @Autowired
  private ProjectService projectService;

  @Autowired
  private MapValidationErrorService mapValidationErrorService;

  @PostMapping("")
  public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal) {

    ResponseEntity<?> errorMap = MapValidationErrorService.MapValidationService(result);
    if(errorMap != null) return errorMap;

    projectService.saveOrUpdateProject(project, principal.getName());
    return new ResponseEntity<>(project, HttpStatus.CREATED);
  }

  @GetMapping("/all")
  public Iterable<Project> getAllProjects() {
    return projectService.findAllProjects();
  }

  @GetMapping("/{projectId}")
  public ResponseEntity<?> getProjectById(@PathVariable String projectId) {
    Project project = projectService.findProjectByIdentifier(projectId);

    return new ResponseEntity<>(project, HttpStatus.OK);
  }

  @DeleteMapping("/{projectId}")
  public ResponseEntity<?> deletedProject(@PathVariable String projectId) {
    projectService.deleteProjectByIdentifier(projectId);

    return new ResponseEntity<>("Project with ID: '"+projectId.toUpperCase()+"' was deleted.", HttpStatus.OK);
  }
}
