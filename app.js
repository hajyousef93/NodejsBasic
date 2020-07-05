const express=require('express');//for router
const morgan=require('morgan');//for debug 
const bodyparser=require("body-parser");

// for databse mongoDB atles
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://mohammad93:mohammad93@cluster0.sdzlq.mongodb.net/test?retryWrites=true&w=majority',{
    useMongoClient:true
})
mongoose.Promise=global.Promise;

const productsRoutes=require('./Api/router/products');
const ordersRoutes=require('./Api/router/orders');
const userRoute=require('./Api/router/user');

const app=express();

// for cors problem
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,PATCH');
        return res.status(200).json({});
    }
    next();
});

//upload static
app.use('/upload',express.static('upload'));
// for debug
app.use(morgan('dev'));
// for body
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
// for router
app.use('/products',productsRoutes);
app.use('/orders',ordersRoutes);
app.use('/user',userRoute);


// for error handling
app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });

});

// for export
module.exports=app;