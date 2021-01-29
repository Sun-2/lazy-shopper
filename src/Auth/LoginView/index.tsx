import React, { FC, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography
} from "@material-ui/core";
import { Form } from "./styles";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";

export const LoginView: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const { push } = useHistory();

  const onSubmit = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        push("/");
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box p={2} boxShadow={2} component={Paper}>
        <Form onSubmit={onSubmit}>
          <Typography variant="h5">Log in</Typography>
          <TextField
            fullWidth
            label="Email"
            name="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Typography color="error">{error}</Typography>
          <Button type="submit" fullWidth>
            Log in
          </Button>
        </Form>
      </Box>
    </Box>
  );
};
