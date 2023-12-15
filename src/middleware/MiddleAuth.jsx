import { Navigate } from "react-router-dom";

function MiddleAuth({ children }) {
  if (!localStorage.getItem("User")) {
    return <Navigate to="/auth" replace={true} />;
  }

  return children;
}

export default MiddleAuth;
