const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));

// Middleware1
// app.use(function(req, res, next){
//     req.myName = "Abhishek";
//     console.log('Middleware 1 called');
//     next();
// });

// Middleware2
// app.use(function(req, res, next){
//     console.log("My name from MW2 is ", req.myName);
    // console.log("Middleware 2 called");
//     next();
// })

var contactList = [
    {
        name: "Abhishek",
        phone: "8674392932"
    },
    {
        name: "Tony Stark",
        phone: "6827392177"
    },
    {
        name: "Coding Ninjas",
        phone: "01164726893"
    }
];

app.get('/', function(req, res){
    // console.log("From the get route controller ",req.myName);

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home', {
            title: "Contacts List",
            contact_list: contacts
        });
    });

    
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});

app.post('/create-contact', function(req, res){

    // contactList.push({
    //     name: req.body.my_name,
    //     phone: req.body.my_phone
    // });

    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact!');
            return;
        }

        console.log('******', newContact);
        return res.redirect('back');
    });

    // return res.redirect('/');
});

app.get('/delete-contact/', function(req, res){
    // console.log(req.params);
    // let phone = req.params.phone;
    
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }


    // get the id from query in the url
    let id = req.query.id;
    
    // find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }

        return res.redirect('back');
    });

});



app.listen(port, function(err){
    if(err){console.log("Error in running the server ", err);}

    console.log('Yup! My Express Server is running on Port: ', port);
});