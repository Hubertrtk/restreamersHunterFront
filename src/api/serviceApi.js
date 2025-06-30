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

  /**
   * [
  {
    "email": "hubr2000@gmail.com",
    // "wmtId": "1916681",
    "monitors": {
      "HASH": "BLOCKED"
    }
  }
]
   */
export const assignUsers = (users, description) => {
	if(description){
		users = users.map(user => {
			return {
				...user,
				description
			}
		})
	}
	return axiosInstance.post(`/restreamershunter/assignUsers`, 
		users
	)
  }

export const getMonitor = (monitorType) => {
	return axiosInstance.post(`/restreamershunter/getMonitor`, {monitorType})
  }

export const runMonitor = (monitorType) => {
	return axiosInstance.post(`/restreamershunter/runMonitor`, {monitorType})
  }