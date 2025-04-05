import axios from 'axios';
import {User} from '../entities/user'

export const UserAPI = {
  fetchUser: async (uid: string) => {
    return axios.get(`/api/users/${uid}`);
  },
  updateUser: async (userData: User) => {
    return axios.patch('/api/users', userData);
  }
};
