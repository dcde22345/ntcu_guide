import React, { useState,useEffect } from 'react';
import  Axios  from "axios";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Box } from "@mui/system";


Axios.defaults.withCredentials=true;


function Feedback(){
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [gotoLogin,setGotoLogin] = useState(false);
//new1
  const [comments, setComments] = useState([]);
  const [insertStatus, setInsertStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001" + "/comments", {
      Name: name,
      Content: content,
      Rating: rating,
    })
    .then((response) => {
      setInsertStatus(response.data.message);
      // setWarning(response.data.warning);
      fetchComments();
    });
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchComments = () => {
    Axios.get("http://localhost:3001/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  function RatingStars(props) {
    const { rating, onClick } = props;

    const handleClick = (selectedRating) => {
      if (onClick) {
        onClick(selectedRating);
      }
    };

    const stars = [1, 2, 3, 4, 5].map((star) => (
      <img
        key={star}
        src={star <= rating ? 'filled-star.png' : 'empty-star.png'}
        alt={star <= rating ? 'Filled Star' : 'Empty Star'}
        onClick={() => handleClick(star)}
        style={{ cursor: 'pointer' }} // 添加指標樣式以顯示可點擊
      />
    ));

    return <div>{stars}</div>;
  }

  const text = {
    color: "#013c4f",
    fontWeight: "900",
  };

  useEffect(()=>{
    Axios.get("http://localhost:3001"+"/login")
    .then((response)=>{
        if(response.data.loggedIn===false){
          setGotoLogin(true);
        }
    });
},[]);

if(gotoLogin)
{
  return <Navigate to="/login"/>
}




  return (
    <div className="comments" style={{marginBottom: "10vh"}}>
      <div className="container" style={text}>
        <form>
        <h1
            className="text-center m-4 display-3"
            style={{ fontWeight: "900" }}
          >
            新增留言
          </h1>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Name">
              您的姓名：
            </label>
            <input
              className="form-control"
              type="text"
              id="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Content">
              留言內容：
            </label>
            <input
              className="form-control"
              type="text"
              id="Content"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">評分：</label>
            <RatingStars rating={rating} onClick={handleRatingClick} />
          </div>

          <button
            className="btn btn-block my-4 w-100 text-white"
            style={{backgroundColor: '#013c4f'}}
            onClick={handleSubmit}
          >
            送出留言
          </button>

        </form>





        {/* 留言版的顯示 */}
        <h1
            className="text-center m-4 display-3"
            style={{ fontWeight: "900" }}
        >
            留言版
        </h1>

        {/* 顯示留言 */}
        {comments.map((comment) => (
          <div key={comment.id}>
            <Box>
              <p>姓名：{comment.評論者}</p>
              <p>內容：{comment.評論內容}</p>
              <p>評分：{comment.評分}</p>
              <hr />
            </Box>
          </div>
        ))}

        {/* 顯示新增留言的狀態 */}
        <p>{insertStatus}</p>

      </div>


    </div>
  ); // 對到 return

} // 對到Feedback

export default Feedback;