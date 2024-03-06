import { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [warning, setWarning] = useState(false);
  let navigate = useNavigate();

  // login
  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001" + "/login", { username, password }).then(
      (response) => {
        if (response.data.loginned) {
          navigate("/");
        } else {
          setLoginMsg(response.data.message);
          setWarning(response.data.warning);
        }
      }
    );
  };

  const gotoRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  // style
  const text = {
    color: "#013c4f",
    fontWeight: "900",
  };

  return (
    <div className="login" style={text}>
      <div className="container">
        <div className="my-4 h4">
          Login <i className="bi bi-person-fill"></i>
        </div>
        <form>
          <h1
            className="text-center m-4 display-3"
            style={{ fontWeight: "900" }}
          >
            登入
          </h1>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="username">
              使用者名稱
            </label>
            <input
              className="form-control"
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">
              密碼
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn btn-block my-4 w-100 text-white"
            style={{ backgroundColor: "#013C4F" }}
            onClick={login}
          >
            登入
          </button>
        </form>
        <hr className="hr" />
        <p className="text-center my-4">
          你還沒有帳戶? <Link to="../Register">請註冊</Link>
        </p>
        <p style={warning ? { backgroundColor: "red" } : {}}>{loginMsg}</p>
      </div>
    </div>
  );
};

export default Login;
