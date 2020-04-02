package com.johnirle.ppmtool.repositories;
// 
// John Irle
// 02 April 2020

import com.johnirle.ppmtool.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {
}
