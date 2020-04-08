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


  return (
    <div className="container">
      <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
        <i className="fa fa-plus-circle"> Create Project Task</i>
      </Link>
      <br />
      <hr />
      <Backlog project_tasks={backlog.project_tasks} />
    </div>
  )
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  backlog: state.backlog
})

export default connect(mapStateToProps, { getBacklog })(ProjectBoard)
