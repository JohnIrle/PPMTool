import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Landing = ({ security, history }) => {
  // Don't display if logged in
  if (security.validToken) {
    history.push("/dashboard")
  }
  return (
    <div className="landing">
      <div className="light-overlay landing-inner text-dark">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Personal Kanban Tool</h1>
              <p className="lead">
                Create your account to join active projects or start you own
                </p>
              <hr />
              <Link to="/register" className="btn btn-lg btn-primary mr-2">
                Sign Up
                </Link>
              <Link to="/login" className="btn btn-lg btn-secondary mr-2">
                Login
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Landing.propTypes = {
  security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  security: state.security
})

export default connect(mapStateToProps, {})(Landing)
