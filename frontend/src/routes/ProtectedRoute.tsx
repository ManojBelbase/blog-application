import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PATH } from "../const/Path";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={PATH.LOGIN} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;