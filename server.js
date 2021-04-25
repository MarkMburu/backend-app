const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const {notFound,errorHandler} = require("./Middlewares/middlewares");
require("dotenv").config();

const app = express();

// middlewares
app.use(helmet());
app.use(morgan('common'));
app.use(cors({
}));

app.use(express.json());
// app.use(express.urlencoded({ extended: true}));



// Routes
const userRoutes = require("./Routes/userRoutes");
const projectRoutes = require("./Routes/projectRoutes");
const galleryRoutes = require("./Routes/galleryRouter");
const plotRoutes = require("./Routes/plotRouter");

app.use("/api/user",userRoutes);
app.use("/api/project",projectRoutes);
app.use("/api/gallery",galleryRoutes);
app.use("/api/plot",plotRoutes);

// ErrorHandler and notFound
app.use(notFound);
app.use(errorHandler);

// Port
const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
});