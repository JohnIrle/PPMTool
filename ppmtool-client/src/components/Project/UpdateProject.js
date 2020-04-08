import React, { useState, useEffect } from "react";
import { getProject, createProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import classnames from "classnames";

const UpdateProject = ({
  project,
  loading,
  getProject,
  createProject,
  history,
  match,
  errors
}) => {
  const [formData, setFormData] = useState({
    id: "",
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
    errors: {}
  })


  useEffect(() => {
    getProject(match.params.id);

    setFormData({
      id: loading || !project.id ? '' : project.id,
      projectName: loading || !project.projectName ? '' : project.projectName,
      projectIdentifier: loading || !project.projectIdentifier ? '' : project.projectIdentifier,
      description: loading || !project.description ? '' : project.description,
      start_date: loading || !project.start_date ? '' : project.start_date,
      end_date: loading || !project.end_date ? '' : project.end_date
    })
  }, [loading])

  const {
    id,
    projectName,
    projectIdentifier,
    description,
    start_date,
    end_date
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log(formData)
    createProject(formData, history, true);
  }


  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Project form</h5>
            <hr />
            <form onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.projectName
                  })}
                  placeholder="Project Name"
                  name="projectName"
                  value={projectName}
                  onChange={e => onChange(e)}
                />
                {errors.projectName && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  value={projectIdentifier}
                  onChange={e => onChange(e)}
                  disabled
                />
              </div>
              <div className="form-group">
                <textarea
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.description
                  })}
                  placeholder="Project Description"
                  name="description"
                  onChange={e => onChange(e)}
                  value={description}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="start_date"
                  value={start_date}
                  onChange={e => onChange(e)}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
                  value={end_date}
                  onChange={e => onChange(e)}
                />
              </div>

              <input
                type="submit"
                className="btn btn-primary btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project.project,
  errors: state.errors,
  loading: state.project.loading
});

export default connect(
  mapStateToProps,
  { getProject, createProject }
)(withRouter(UpdateProject));
