import { useState } from 'react';
import loginService from '../services/login';
import noteService from '../services/notes';

const LoginForm = ({ setErrorMessage, updateNotification, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setPassword('');
      setUsername('');
    } catch (error) {
      updateNotification(() => {
        setErrorMessage(error.response.data.error);
      });
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username :
            <input
              value={username}
              type="text"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Paswword :
            <input
              value={password}
              type="text"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
