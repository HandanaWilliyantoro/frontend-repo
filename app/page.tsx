'use client';
import { useEffect } from 'react';
import { UserAPI } from '../apis/userApi';

export default function MainPage() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserAPI.fetchUser('ascascacs');
        // Dispatch success action
        console.log(response)
      } catch (error) {
        // Dispatch error action
        console.log(error.message)
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  );
}
