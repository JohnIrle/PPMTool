import axios from 'axios'
import { GET_ERRORS } from './types'

export const createNewUser = (newUser, history) => async dispatch => {
  await axios.post("/api/users/register", newUser)
    .then((res) => {
      history.push("/login")
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })

    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}
