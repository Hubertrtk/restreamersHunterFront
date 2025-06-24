import axiosInstance from './axios'

export const getGroup = (GROUP) => {
	return axiosInstance.post(`/restreamershunter/getGroup`, {
		"monitorGroup": GROUP
	})
  }

export const getUser = (email) => {
	return axiosInstance.post(`/restreamershunter/getRhUser`, {
		email
	})
  }