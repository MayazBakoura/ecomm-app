const express= require('express');
const app = express();
const usersRepo = require('./repositories/users');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.get('/',(req,res) =>{


  res.send(`
    <div>
    <form method="POST">
    <input name="email" placeholder="email"/>
    <input name="password" placeholder="password"/>
    <input name = "passwordConfirmation"  placeholder="password confirmation"/>
<button>Sign up</button>

    </form>
    </div>
    
    `)
});

app.post('/', async (req,res) =>{
 const {email , password , passwordConfirmation} = req.body;

 const existingUser =  await usersRepo.getOneBy({email});

 if(existingUser){
  return  res.send("Email in use")
}

if(password!=passwordConfirmation){
   return res.send("Passwords must match")
}
 res.send("account created")
});

app.listen(4000,() =>{
  console.log("listening")
})