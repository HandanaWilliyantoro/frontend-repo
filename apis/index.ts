import axios from "axios"

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

// Add a response interceptor
instance.interceptors.response.use(
    response => {
        // Check the status code and handle accordingly
        if (response.status === 200) {
            console.log('Data updated successfully:', response.data);
        } else {
            console.warn('Unexpected status code:', response.status);
        }
        return response;
    },
    error => {
        // Handle the error
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
            error.message = error.response.data.message
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }
        return Promise.reject(error);
    }
);


export default instance