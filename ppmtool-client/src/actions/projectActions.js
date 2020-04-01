import axios from "axios"
import { GET_ERRORS } from "./types"

export const createProject = (project, history) => dispatch => {
  axios.post("http://localhost:8080/api/project", project)
    .then(res => history.pushState("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

