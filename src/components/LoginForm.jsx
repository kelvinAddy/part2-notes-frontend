import loginService from '../services/login';
import noteService from '../services/notes';

const LoginForm = ({ setErrorMessage, updateNotification, setUser }) => {
  const handleLogin = async (formData) => {
    const user = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
    try {
      const data = await loginService.login(user);
      window.localStorage.setItem('loggedInUser', JSON.stringify(data));
      noteService.setToken(data.token);
      setUser(data);
    } catch (error) {
      updateNotification(() => {
        setErrorMessage(error.response.data.error);
      });
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form action={handleLogin}>
        <div>
          <label>
            Username :
            <input name="username" type="text" />
          </label>
        </div>
        <div>
          <label>
            Password :
            <input name="password" type="text" />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
