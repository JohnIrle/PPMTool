package com.johnirle.ppmtool.repositories;
// 
// John Irle
// 31 March 2020

import com.johnirle.ppmtool.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
  @Override
  Iterable<Project> findAllById(Iterable<Long> iterable);
}
