import React from 'react';
import { GetServerSideProps } from 'next';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Paper } from '@mui/material';
import { fetchUserData, UserData } from '../apis/userApi';
import axios from 'axios';

// Components
import { UpdateButton } from '@/components';

interface Props {
  initialData: UserData[];
}

const Home: React.FC<Props> = ({ data }) => {

  return (
    <div>
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
            {data.map((user) => (
              <TableRow key={user.id}>
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
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const {data}: UserData[] = await fetchUserData();
  return { props: { data } };
};

export default Home;
