import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { getProjectTask, updateProjectTask } from '../../../actions/backlogActions'
import PropTypes from 'prop-types'

const UpdateProjectTask = ({ match, errors, history, getProjectTask, updateProjectTask, project_task, loading }) => {

  const [formData, setFormData] = useState({
    id: "",
    projectSequence: "",
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: 0,
    dueDate: "",
    projectIdentifier: "",
    created_At: ""
  })

  const { backlog_id, pt_id } = match.params

  useEffect(() => {
    getProjectTask(backlog_id, pt_id, history);

    setFormData({
      id: !project_task.id ? '' : project_task.id,
      projectSequence: project_task.projectSequence,
      summary: loading || !project_task.summary ? '' : project_task.summary,
      acceptanceCriteria: loading || !project_task.acceptanceCriteria ? '' : project_task.acceptanceCriteria,
      status: loading || !project_task.status ? '' : project_task.status,
      priority: loading || !project_task.priority ? '' : project_task.priority,
      dueDate: loading || !project_task.dueDate ? '' : project_task.dueDate,
      projectIdentifier: !project_task.projectIdentifier ? '' : project_task.projectIdentifier,
      created_At: !project_task.created_At ? '' : project_task.created_At
    })
  }, [loading])
  const {
    summary,
    acceptanceCriteria,
    status,
    priority,
    dueDate,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    updateProjectTask(backlog_id, pt_id, formData, history)
  }

  const { projectIdentifier, projectSequence } = formData

  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${projectIdentifier}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Update Project Task</h4>
            <p className="lead text-center">Project Name: {"  "} {projectIdentifier}  TaskID: {projectSequence} </p>
            <form onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.summary
                  })}
                  name="summary"
                  placeholder="Project Task summary"
                  value={summary}
                  onChange={e => onChange(e)}
                />
                {errors.summary && (
                  <div className="invalid-feedback">{errors.summary}</div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={acceptanceCriteria}
                  onChange={e => onChange(e)}
                ></textarea>
              </div>
              <h6>Due Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={dueDate}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  value={priority}
                  onChange={e => onChange(e)}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group">
                <select className="form-control form-control-lg" name="status" value={status} onChange={e => onChange(e)}>
                  <option value="">Select Status</option>
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  project_task: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  project_task: state.backlog.project_task,
  loading: state.backlog.loading
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(UpdateProjectTask)
