'use client';
import { useEffect } from 'react';
import { UserAPI } from '../apis/userApi';
import { useRouter } from 'next/navigation';

export default function MainPage() {

  const router = useRouter()

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
      <button onClick={() => router.push('/login')}>NAVIGATE TO LOGIN</button>
    </div>
  );
}
