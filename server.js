const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

//firebase admin setup

var serviceAccount = require("./aria-website-db0f4-firebase-adminsdk-v8a3x-a45e3652c0.json");
const { database } = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

//declare stactic path
let staticPath = path.join(__dirname);

const app = express();

app.use(express.static(staticPath));
app.use(express.json());

// app.get('/404', (req,res) => {
//     res.sendFile(path.join(staticPath, "404.html"))
// })
// app.use((req,res) => {
//     res.redirect('/404')
// })

// seller route
app.get('/seller', (req, res) => {
    res.sendFile(path.join(staticPath, "seller.html"));
})
app.post('/seller', (req, res) => {
    let {name, about, address, number, tac, legit, email} = req.body;
    if(!name.length || !address.length || !about.length || number.length <10 || !Number(number)) {
        return res.json({'alert': 'some information(s) is/are invalid'});
    } else if(!tac || !legit){
        return res.json({'alert':'you must agree to our terms and conditions'})
    } else {
        //update users seller status here
        db.collection('sellers').doc(email).set(req.body).then(data => {
            db.collection('users').doc(email).update({
                seller: true
            }).then(data => {
                res.json(true);
            })
        })
    }
})
//signup
app.get('/signup', (req,res) => {
    res.sendFile(path.join(staticPath, "register.html"));
})
app.post('/signup', (req,res) => {
    let {name, email, password,number} =req.body;

    if(name.length < 3) {
        return res.json({'alert': 'name must be 3 letters longs'});
    } else if(!email.length) {
        return res.json({'alert': 'Enter your email'});
    } else if(password.length < 8) {
        return res.json({'alert': 'password should be 8 letters long'});
    }    else if(!number.length) {
        return res.json({'alert': 'Enter your phone number'});
    }   

    //store user in db
    db.collection('users').doc(email).get()
    .then(user => {
        if(user.exists){
            return res.json({'alert':'eamil already exists'})
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    req.body.password = hash;
                    db.collection('users').doc(email).set(req.body).then(data => {
                        res.json({
                            name: req.body.name,
                            email: req.body.email,
                            seller: req.body.seller,
                        })
                    })
                })
            })
        }
    })
})
//login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})
app.post('/login', (req, res) => {
    let {email, password} = req.body;

    if(!email.length || !password.length){
        return res.json({'alert': 'fill all the inputs'})
    }

    db.collection('users').doc(email).get().then(user =>{
        if(!user.exists){
            return res.json({'alert': 'log in email does not exist'})
        } else {
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller,
                    })
                } else{
                    return res.json({'alert': 'password in correct'})
                }
            })
        }
    })
}) 
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index_EN.html"));
})
app.listen(3000, () => {
    console.log('listening on port 3000......');
})