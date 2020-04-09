package com.johnirle.ppmtool.repositories;
// 
// John Irle
// 31 March 2020

import com.johnirle.ppmtool.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

  Project findByProjectIdentifier(String projectId);

  @Override
  Iterable<Project> findAll();

  Iterable<Project> findAllByProjectLeader(String username);
}