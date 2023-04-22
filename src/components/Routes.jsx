import AutenticatedRoutes from './AutenticatedRoutes'
import UnautenticatedRoutes from "./UnauthenticatedRoutes";
import { useAuth } from '../contexts/authContext';

export default function Routes() {
    const { user } = useAuth();
    return user ? <AutenticatedRoutes  /> : <UnautenticatedRoutes />;
}