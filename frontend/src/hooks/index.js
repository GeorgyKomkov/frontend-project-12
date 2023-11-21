import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { SocketContext } from '../context/SocketProvaider';
import { FilterContext } from '../context/FilterProvaider';

export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(SocketContext);
export const useFilter = () => useContext(FilterContext);
