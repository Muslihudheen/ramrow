/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { loginRequest } from "../redux/slices/authSlice";
import LoaderButton from "../components/LoaderButton";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #1e293b 0%, #4fa4f6 50%, #92cbfd 100%);
`;

const LoginCard = styled(motion.div)`
  padding: 3rem;
  width: 400px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  position: relative;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const AdminHeading = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = () => {
    dispatch(loginRequest({ email, password }));
  };

  return (
    <LoginContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <LoginCard
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Logo src="/path-to-logo.png" alt="Logo" />
        <AdminHeading>ADMIN</AdminHeading>
        <Typography
          variant="h6"
          gutterBottom
          css={{
            marginTop:"-1.2rem",
            fontWeight: "700",
            color: "#1e293b",
            textShadow: "1px 2px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          css={{
            color: "#64748b",
            marginBottom: "2rem",
          }}
        >
          Log in to access your dashboard
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          css={{
            marginBottom: "1rem",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          css={{
            marginBottom: "1.5rem",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
        <LoaderButton
          loading={loading}
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          css={{
            background: "linear-gradient(90deg, #FF416C, #FF4B2B)",
            color: "#fff",
            fontWeight: "bold",
            padding: "0.75rem",
            borderRadius: "8px",
            textTransform: "uppercase",
            boxShadow: "0px 4px 15px rgba(255, 75, 43, 0.5)",
            "&:hover": {
              background: "linear-gradient(90deg, #FF4B2B, #FF416C)",
            },
          }}
        >
          Login
        </LoaderButton>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
