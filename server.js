const express = require('express');
const app = express();
require('dotenv/config');
const productRoute = require('./routes/product.route');
const categoryRoute = require('./routes/category.route');
const subCategoryRoute = require('./routes/subCategory.route');
const brandRoute = require('./routes/brand.route');
const userRoute = require('./auth/routes/user.route');
const roleRoute = require('./auth/routes/role.route');
const permissionRoute = require('./auth/routes/permission.route');
const signInRoute = require('./auth/routes/signin.route.js');
const signUpRoute = require('./auth/routes/signup.route.js');
const resetPasswordRoute = require('./auth/routes/resetPassword.route');
const orderRoute = require('./routes/order.route');
const cartRoute = require('./routes/cart.route');
const reviewRoute = require('./routes/review.route');
const ErrorHandler = require('./middlewares/ErrorHandler');


const DbConnection = require('./config/database')

// Connect to MongoDB
DbConnection();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use('/api/v1/products',productRoute);
app.use('/api/v1/categories',categoryRoute);
app.use('/api/v1/subcategories',subCategoryRoute);
app.use('/api/v1/brands',brandRoute);
app.use('/api/v1/orders',orderRoute);
app.use('/api/v1/cart',cartRoute);
app.use('/api/v1/reviews',reviewRoute);


// auth 
app.use('/api/v1/auth/users',userRoute);
app.use('/api/v1/auth/roles',roleRoute);
app.use('/api/v1/auth/permissions',permissionRoute);
app.use('/api/v1/auth',signInRoute);
app.use('/api/v1/auth',signUpRoute);
app.use('/api/v1/auth',resetPasswordRoute);




app.use(ErrorHandler);
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})