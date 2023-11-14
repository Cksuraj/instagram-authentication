
// Here we create our server and define  and run our application on the port 
require('dotenv').config(); 
const PORT = process.env.PORT || 4000;
const app=require('./app.js');                                        // here we requier our express app 

// listen is baiscally to start at the Port on express server
app.listen(PORT, ()=>{
  console.log(`server is running on : http://localhost:${PORT} `);  
})