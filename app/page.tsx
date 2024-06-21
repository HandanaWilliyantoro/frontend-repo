"use client"

import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Paper, Button } from '@mui/material';
import { fetchUserData, UserData } from 'app/apis/userApi';
import { useAuth } from 'app/hooks/useAuth'; // Import useAuth hook
import { UpdateButton, ProtectedRoute } from 'app/components';

interface Props {
  initialData: UserData[];
}

const Home: React.FC<Props> = () => {
  const [userData, setUserData] = useState([]);
  const { logout, user: loggedUser } = useAuth(); // Destructure logout from useAuth

  const initialFetch = async () => {
    try {
      const { data }: UserData[] = await fetchUserData();
      setUserData(data);
    } catch (e) {
      console.log('Error: ', e.message);
    }
  };

  useEffect(() => {
    initialFetch();
  }, []);

  return (
    <ProtectedRoute>
      <Button onClick={logout} variant="contained" color="error" style={{ paddingTop: '10px', width: '100%', paddingBottom: '10px' }}>
        Sign Out
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Bio</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData && userData?.length > 0 && userData.map((user) => (
              <TableRow sx={{backgroundColor: loggedUser?.uid === user?.id ? "#ADD8E6" : "white"}} key={user.id}>
                <TableCell>
                  <Avatar alt={user.name} src={user.avatar} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.occupation}</TableCell>
                <TableCell>{user.bio}</TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <UpdateButton id={user.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ProtectedRoute>
  );
};

export default Home;
