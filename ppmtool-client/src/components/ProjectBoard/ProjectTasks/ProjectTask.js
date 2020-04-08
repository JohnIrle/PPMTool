import React from 'react'
import { Link } from 'react-router-dom'
import { deleteProjectTask } from "../../../actions/backlogActions"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const ProjectTask = ({ project_task, deleteProjectTask }) => {

  let priorityString;
  let priorityClass;

  if (project_task.priority === 1) {
    priorityClass = "bg-danger text-light"
    priorityString = "HIGH"
  } else if (project_task.priority === 2) {
    priorityClass = "bg-warning text-light"
    priorityString = "MEDIUM"
  } else if (project_task.priority === 3) {
    priorityClass = "bg-info text-light"
    priorityString = "LOW"
  }

  const onDeleteClick = (e) => {
    deleteProjectTask(project_task.projectIdentifier, project_task.projectSequence)
  }


  return (
    <div className="card mb - 1 bg - light" >
      < div className={`card-header text-primary ${priorityClass}`} >
        ID: {project_task.projectSequence} -- Priority: {priorityString}
      </div >
      <div className="card-body bg-light">
        <h5 className="card-title">{project_task.summary}</h5>
        <p className="card-text text-truncate ">
          {project_task.acceptanceCriteria}
        </p>
        <Link to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`} className="btn btn-primary">
          Update
        </Link>

        <button onClick={e => onDeleteClick(e)} className="btn btn-danger ml-4">
          Delete
        </button>
      </div>
    </div >
  )
}

ProjectTask.propTypes = ({
  deleteProjectTask: PropTypes.func.isRequired
})

export default connect(null, { deleteProjectTask })(ProjectTask)
