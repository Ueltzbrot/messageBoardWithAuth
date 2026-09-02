


const isAuth = (req, res,next) =>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/log-in")
    }
}

const isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.admin){
            next();
    }
    res.redirect("/log-in")
}

module.exports={
    isAuth,
    isAdmin,
}