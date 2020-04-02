import axios from "axios"
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types"

export const createProject = (project, history) => async dispatch => {
  await axios.post("/api/project", project)
    .then(res => {
      history.push("/dashboard")
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    })
    .catch(err => {
      if (err) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    }
    )
}

export const getProjects = () => async dispatch => {
  await axios.get("/api/project/all")
    .then(res =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    )
}

export const getProject = (id, history) => async dispatch => {
  try {
    await axios.get(`/api/project/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROJECT,
          payload: res.data
        }))
  } catch (err) {
    history.push('/dashboard')
  }
}

export const deleteProject = (id) => async dispatch => {
  if (window.confirm("Are you sure? This will delete the project and all data related to it.")) {
    await axios.delete(`/api/project/${id}`)
    dispatch({
      type: DELETE_PROJECT,
      payload: id
    })
  }
}

