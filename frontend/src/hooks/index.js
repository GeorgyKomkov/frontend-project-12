import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { SocketContext } from '../context/SocketProvaider';

export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(SocketContext);
