import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createNewUser } from "../../actions/securityActions"
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Register = ({ errors, history, createNewUser, security }) => {
  // Don't display if logged in
  if (security.validToken) {
    history.push("/dashboard")
  }

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: ""
  })

  const {
    fullName,
    username,
    password,
    confirmPassword
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    createNewUser(formData, history)
  }

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Account</p>
            <form onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <input type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.fullName
                  })}
                  placeholder="Full Name"
                  name="fullName"
                  value={fullName}
                  onChange={e => onChange(e)}
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.username
                  })}
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={e => onChange(e)}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password
                  })}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.confirmPassword
                  })}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={e => onChange(e)}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                )}
              </div>

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Register.propTypes = ({
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  createNewUser: PropTypes.func.isRequired
})

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(mapStateToProps, { createNewUser })(Register);
