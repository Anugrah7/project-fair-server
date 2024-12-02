
// register
 exports.registerController = (req,res)=>{
    console.log("Inside registerContoller");
    const {username,email,password} = req.body  // req data will be only in body
    console.log(username,email,password);

    res.status(200).json("Request recieved!!!")  //res is similar to return in function
}

//Login

//profile updation