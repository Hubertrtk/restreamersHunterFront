import axios from 'axios';

const getBaseURL = () => {
  return localStorage.getItem('API_BASE_URL') || 'http://domyslny.url/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor do dynamicznego ustawiania baseURL przed każdym requestem
api.interceptors.request.use(config => {
  config.baseURL = getBaseURL();
  return config;
});

api.interceptors.response.use(
	function (response) {
	  return response.data.data
	},
	function (error) {
	  if (error.response.data.error) {
		return Promise.reject(error.response.data.error[0])
	  }
	  return Promise.reject(error)
	}
  )

export default api;
