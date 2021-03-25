const AppError = require('./utilities/appError');

const express           = require('express'),
      app               = express(),
      path              = require('path'),
      mongoose          = require("mongoose");
      Campground        = require('./models/campground'),
      campgroundRoutes  = require("./Routes/campgroundRoutes"),
      methodOverride    = require("method-override"),
      morgan            = require('morgan'),
      ejsMate           = require('ejs-mate'),
      dotenv            = require("dotenv"),

     
      
dotenv.config()
      

// To connect to the database and listen for the server on the port stated
mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.3wcla.mongodb.net/ProjectYelpCamp?retryWrites=true&w=majority`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
})
.catch(err => console.log(err))
.then(() => app.listen("3010", () => {
    console.log("App up and running! PORT:3010")
}))


//to tell us if there's a connection problem with the database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})


// so that we can use ejs-mate to set a boilerplate for all pages
app.engine('ejs', ejsMate);

// to tell the node or the server that we are using EJS and where it is
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))



//Use this to serve up static files such as css, html, js etc.. 
app.use(express.static('Static'))

// This parses the information from the form so that we can create a new database entry in the post route
app.use(express.urlencoded({extended:true})) 

// This allows us to use the DELETE and EDIT methods in the routes
app.use(methodOverride("_method"))

//To log information on the requests and responses
app.use(morgan("tiny"))



// need to use this app.use to use the variable set to the routes file (middleware for routes)
app.use("/", campgroundRoutes)



 
//for when somebody inputs an incorrect path in the url
app.all("*", (req, res, next) => {
    res.render("404NotFound")
})

//This is for error handling of the routes - it needs an extra argument at the start and 
// to get the default error handling from express, the arguemtn needs to be entered into 
// the next function at the end of the function
app.use((err, req, res, next) => {
    const { name } = err;
    console.log(name) 
    
    const {status = 500, message = "speak to the systems administrator to rectify this issue"} = err;
    res.status(status).render("error", { err })
})






