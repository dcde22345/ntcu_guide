import { Link } from "react-router-dom";

const isLogin = () => {
  return false;
};
function Profile() {
  const profile = {
    height: "25vh",
    minHeight: "250px",
  };
  return (
    <>
      <div className="bg-primary" style={profile}>
        {isLogin() ? (
          <div className="container w-100 h-100 d-flex flex-column justify-content-center align-items-center"></div>
        ) : (
          <div className="container w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white fw-bold">
            <div className="icon">
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "75px" }}
              ></i>
            </div>
            <div className="describe">
              <span className="fs-3">請登入/註冊</span>
            </div>
          </div>
        )}
      </div>
      <div className="container my-5 pb-5">
          {isLogin() ? (
            <></>
          ) : (
            <Link className="btn outline btn-outline-primary w-75 fw-bold d-flex  justify-content-center align-items-center m-auto" to="/login">
              <i className="bi bi-person me-2 fs-5"></i>
              請登入/註冊
              </Link>
          ) }
      </div>
    </>
  );
}

export default Profile;
