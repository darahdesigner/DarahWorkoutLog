const Express = require("express");
const app = Express();
const dbConnection = require("./db");

const controllers = require(".");

app.use(Express.json());

app.use("/workoutlog", controllers.workoutLogController);
app.use("/user", controllers.usercontroller);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3001, () => {
            console.log(`[Server]: App is listening on 3001.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });

// app.use('/test', (req, res)=>{
//     res.send(`This is a message from the test endpoint on the server!`)
// });
