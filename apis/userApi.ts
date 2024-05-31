import instance from ".";
import {User} from '../domain/user'

export const fetchUserData = async (id?: string): Promise<string> => {
    const response = await instance.get('/fetch-user-data', {params: {id}});
    return response.data;
};

export const updateUserData = async (id: string, body: User): Promise<string> => {
    const response = await instance.put(`/update-user-data?id=${id}`, {data: body});
    return response.data;
}