import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/securityActions'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Login = ({ errors, history, login, security }) => {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const {
    username,
    password
  } = formData

  useEffect(() => {
    if (security.validToken) {
      history.push("/dashboard")
    }
  })

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    login(formData)
  }

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <form onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="email"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.username
                  })}
                  placeholder="Email Address"
                  name="username" value={username}
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
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = ({
  security: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
})

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security,
})

export default connect(mapStateToProps, { login })(Login)
