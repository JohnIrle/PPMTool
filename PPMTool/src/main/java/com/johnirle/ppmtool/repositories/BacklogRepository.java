package com.johnirle.ppmtool.repositories;

import com.johnirle.ppmtool.domain.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

//
// John Irle
// 02 April 2020

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {
  Backlog findByProjectIdentifier(String Identifier);
}
