import axios from 'axios';
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK, } from './types'


export const addProjectTask = (backlog_id, project_task, history) => async dispatch => {
  await axios.post(`/api/backlog/${backlog_id}`, project_task)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
      history.push(`/projectBoard/${backlog_id}`)
    })
    .catch(err => {
      if (err) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    })
}

export const getBacklog = (backlog_id) => async dispatch => {
  await axios.get(`/api/backlog/${backlog_id}`)
    .then(res => {
      dispatch({
        type: GET_BACKLOG,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const getProjectTask = (backlog_id, pt_id, history) => async dispatch => {
  await axios.get(`/api/backlog/${backlog_id}/${pt_id}`)
    .then(res => {
      dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data
      })
    })
    .catch(err => {
      history.push('/dashboard')
    })
}

export const updateProjectTask = (backlog_id, pt_id, project_task, history) => async dispatch => {
  await axios.patch(`/api/backlog/${backlog_id}/${pt_id}`, project_task)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
      history.push(`/projectBoard/${backlog_id}`)
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const deleteProjectTask = (backlog_id, pt_id) => async dispatch => {
  if (window.confirm(`Your are deleting project task ${pt_id}, this action cannot be undone`)) {
    await axios.delete(`/api/backlog/${backlog_id}/${pt_id}`)
      .then(res => {
        dispatch({
          type: DELETE_PROJECT_TASK,
          payload: pt_id
        })
      })
  }
}
