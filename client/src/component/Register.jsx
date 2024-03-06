import { useState } from "react";
import  Axios  from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";

const Register=()=>{
    const [usernameReg,setUsernameReg]=useState("");
    const [passwordReg,setPasswordReg]=useState("");
    const [confirmPwdReg,setConfirmPwdReg]=useState("");
    const [emailReg,setEmailReg]=useState("");
    const [genderReg,setGenderReg]=useState("");
    const [birthReg,setBirthReg]=useState("");
    const [insertStatus,setInsertStatus]=useState("");
    const [warning,setWarning]=useState(false);
    let navigate=useNavigate();

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001" + "/register", {
      username: usernameReg,
      password: passwordReg,
      confirmPwd: confirmPwdReg,
      email: emailReg,
      gender: genderReg,
      birth: birthReg,
    }).then((response) => {
      setInsertStatus(response.data);
      setWarning(response.data.warning);
      navigate("/login")
    });
  };

  const text = {
    color: "#013c4f",
    fontWeight: "900",
  };

  return (
    <div className="register" style={{marginBottom: "10vh"}}>
      <div className="container" style={text}>
        <div className="my-4 h4">
          Sign up <i className="bi bi-person-fill"></i>
        </div>
        <form>
          <h1
            className="text-center m-4 display-3"
            style={{ fontWeight: "900" }}
          >
            註冊
          </h1>
          
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="username">
              使用者姓名：
            </label>
            <input
              className="form-control"
              type="text"
              id="username"
              onChange={(e) => setUsernameReg(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">
              密碼：
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              onChange={(e) => setPasswordReg(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="confirmPwd">
              確認密碼：
            </label>
            <input
              className="form-control"
              type="password"
              id="confirmPwd"
              onChange={(e) => setConfirmPwdReg(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">
              電子郵件：
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              onChange={(e) => setEmailReg(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="gender">
              性別：
            </label>
            <select className="form-select" onChange={(e) => setGenderReg(e.target.value)}>
              <option defaultValue selected>請選擇</option>
              <option value="男">
                男
              </option>
              <option value="女">
                女
              </option>
            </select>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="birth">
              生日：
            </label>
            <input
              className="form-control"
              type="date"
              id="birth"
              onChange={(e) => setBirthReg(e.target.value)}
            />
          </div>
          <button
            className="btn btn-block my-4 w-100 text-white"
            style={{backgroundColor: '#013c4f'}}
            onClick={register}
          >
            註冊
          </button>
        </form>
        <hr className="hr" />
        <p className="text-center my-4">
          你已經有帳戶了? <Link to='../Login'>請登入</Link>
        </p>
        <p style={warning ? { backgroundColor: "red" } : {}}>
          {insertStatus.message}
        </p>
      </div>
    </div>
  );
};

export default Register;
