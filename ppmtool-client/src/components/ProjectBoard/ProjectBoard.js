import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Backlog from './Backlog'
import { getBacklog } from '../../actions/backlogActions'

const ProjectBoard = ({ match, getBacklog, backlog, errors }) => {
  const { id } = match.params;

  useEffect(() => {
    getBacklog(id);
  }, [])

  let BoardContent;

  const boardAlgorithm = (errors, backlog) => {
    if (backlog.project_tasks.length < 1) {
      if (errors.projectNotFound) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {errors.projectNotFound}
          </div>
        )
      } else if (errors.projectIdentifier) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {errors.projectIdentifier}
          </div>
        )
      } else {
        return (
          <div className="alert alert-info text-center" role="alert">No Project Tasks on this board</div>
        )
      }
    } else {
      return <Backlog project_tasks={backlog.project_tasks} />
    }
  }

  BoardContent = boardAlgorithm(errors, backlog)

  return (
    <div className="container">
      <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
        <i className="fa fa-plus-circle"> Create Project Task</i>
      </Link>
      <br />
      <hr />
      {BoardContent}
    </div>
  )
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors
})

export default connect(mapStateToProps, { getBacklog })(ProjectBoard)
