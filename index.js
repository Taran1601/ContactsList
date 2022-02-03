const express = require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
app.set('view engine','ejs');
 app.set('views',path.join(__dirname,'views'));
 app.use(express.urlencoded());
 app.use(express.static('assests'));
//  //middlware 1
//  app.use(function(req,res,next){
// console.log("Middleware 1 called");
// next();
//  });
//  //middlware 2
//  app.use(function(req,res,next){
//     console.log("Middleware 2 called");
//     next();
//      });
var contactsList=[
    {
      name:"Gurleen",
      contact:"9878472530"
    },
    {
        name:"Taranpreet",
        contact:"9350379244"
    },
    {
        name:"Himanshu",
        contact:"8847246618"
    }
]
app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
if(err){
    console.log('Error in fetching contacts from db');
    return;
}
return res.render('home',{
    title:"My Contacts List",
    contacts_list: contacts
 });
    });
//    return res.render('home',{
//        title:"My Contacts List",
//        contacts_list: contactsList
    // });
});
app.get('/practice',function(req,res){
return res.render('practice',{
title:"Let us play with ejs"
});
});
app.post('/create-contact',function(req,res){
// contactsList.push({
//     name:req.body.name,
//     contact:req.body.contact
// });
//contactList.push(req.body);
Contact.create({
    name:req.body.name,
    contact: req.body.phone
},function(err,newContact){
if(err){console.log('error in creating a contact');
return;}
console.log('*********',newContact);
return res.redirect('back');
});
// return res.redirect('back');

 
});
//for deleting a contact
app.get('/delete-contact/',function(req,res){
    // console.log(req.query);
    // //get the query from the url
    // let phone=req.query.phone;
    // let contactIndex=contactsList.findIndex(contacts =>contacts.contact == phone);
    // if(contactIndex !=-1){
    //     contactsList.splice(contactIndex,1);
    // }
    // return res.redirect('back');


    //get the id from query in the url
    let id = req.query.id;
    //find the contact in the db using id and delete it
    Contact.findByIdAndDelete(id,function(err){
if(err){
    console.log('Error in deleting an object from database');
    return;
}
    });
    return res.redirect('back');
});
app.listen(port,function(err){
    if(err){console.log('Error in running the server',err);}
    console.log('Yup!My Express Server is running on Port:',port);
});