import axios from 'axios';
import { GET_ERRORS } from './types'


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
