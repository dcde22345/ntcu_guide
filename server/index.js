const express=require("express");
const { Socket }=require("socket.io");
const bcrypt=require("bcryptjs");
const saltRounds=10;
const mysql=require("mysql");
const app=express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const cookieParser=require("cookie-parser");
const session=require("express-session");

const server=app.listen(3001,()=>{
    console.log("Server is running on 3001.");
});
const {Server}=require("socket.io");
const cors=require("cors");

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true,
}));
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
});



io.on("connection",(socket)=>{
    console.log(`User Connected:${socket.id}`);
    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id);
    });
});

app.use(cookieParser());
app.use(session({
    key:"userId",
    secret: 'login',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60 }
}));

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'au4a83',
    database:'ntcu_guide'
});


app.post("/login",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const query="SELECT * FROM USERS WHERE 使用者姓名=?";
    db.query(query,username,(err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"Username query failure."});
        };
        if(result.length>0 && result[0].權限===1){
            bcrypt.compare(password,result[0].密碼,(err,response)=>{
                if(err){
                    console.log(err);
                    res.send({message:"Password coding failure."});
                }
                if(response){
                    console.log(response)
                    req.session.user=result;
                    res.send({loginned:true});
                }else{
                    res.send({message:"The password is incorrect.",warning:true})
                };
            });
        }else{
            res.send({message:"Login failure.",warning:true})
        };
    });
});

app.post("/register",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const confirmPwd=req.body.confirmPwd;
    const email=req.body.email;
    const gender=req.body.gender;
    const birth=req.body.birth;
    bcrypt.hash(password,saltRounds,(err,hash)=>{
        if(err){
            console.log(err);
        };
        if(password === confirmPwd && password  && username && email && gender && birth){
            const query="SELECT * FROM USERS WHERE 使用者姓名 = ?";
            db.query(query,username,(err,result)=>{
                if(err){
                    res.send({message:err});
                }
                if(result.length===0){
                    const query1="INSERT INTO USERS (使用者姓名,密碼,電子郵件,性別,生日,權限) VALUES (?,?,?,?,?,1)";
                    db.query(query1,[username,hash,email,gender,birth],(err,result)=>{
                        if(err){
                            console.log(err);
                            res.send({message:"Account addition failure.",warning:true});
                        }
                        if(result){
                            console.log(result);
                            res.send({message:"Account added successfully."});
                        }
                    }); 
                }else{
                    res.send({message:"The account has been used.",warning:true});
                };
            });
            
        }else{
            res.send({message:"Data setting error.",warning:true});
        };   
    });
});

app.get("/logout",(req,res)=>{
    req.session.user='';
	res.send()
});

app.get("/login",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn:true});
    }else{
        res.send({loggedIn:false});
        
    };
});


app.post("/comments",(req,res)=>{
    const name=req.body.Name;
    const content=req.body.Content;
    const rating=req.body.Rating;

    // 資料庫處理
    const query="INSERT INTO `comments` (`評論者`, `評論內容`, `評分`) VALUES (?,?,?)";
    db.query(query,[name, content, rating],(err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"Comment addition failure.",warning:true});
        }
        if(result){
            console.log(result);
            res.send({message:"Comment added successfully."});
        }
    });
});



app.get("/comments", (req, res) => {
    const query = "SELECT * FROM comments";
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("錯誤：從資料庫中無法抓取留言");
      } 
      else {
        res.status(200).json(result);
      }
    });
  });
