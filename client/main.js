import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


    var Lists = new Mongo.Collection('list');


if (Meteor.isClient) {
    //Event triggered when the user is registering, saves data to the db.
   Template.registration.events({
       'submit .register': function (event) {
           event.preventDefault();

           var userName = event.target.registeredUserName.value;
           var userPassword = event.target.registeredPassword.value;
          Accounts.createUser({
               username: userName,
               password: userPassword,
           }, function (err) {
              if(err){
                  console.log(err + "Contact IT");
              }
              else {
                  Router.go('dashboard');
              }
          });
       }
   });

   //Event triggered what any link in the nav bar is clicked.
   Template.loginPage.events({
       'submit .loginFormClass': function (event) {
           event.preventDefault();
           var userVar = event.target.loginUser.value;
           var passwordVar = event.target.loginPassword.value;
           Meteor.loginWithPassword(userVar, passwordVar, function (err) {
               if(!err){
                   Router.go('dashboard');
                   console.log("User initiated the login request.");
               }
               else {
                   console.log(err.reason);
               }
           });
       }
   });

   //Event triggered when the logout button is clicked
    Template.navbar.events({
        'click .logout': function(event){
            event.preventDefault();
            Meteor.logout(function (err) {
                if(!err){
                    Router.go('/');
                }
                else {
                    return "Contact IT Team";
                }
            });

        }
    });

//Private Todos
    //Todo Entry
    Template.listTodos.events({
        'submit .todosEntry': function (event) {
            var title = event.target.todoItem.value;
            var currentUser =  Meteor.users.findOne({ _id: Meteor.userId() }).username
            var titleId = this._id;
            //Inserting the data in the collection
            Lists.insert({
                title: title,
                createdAt: new Date(),
                createdBy: currentUser,
                titleID: titleId

            });
            event.target.title.value = "";
            return false;
        },
        'click .toggle-checked': function () {
            Lists.update(this._id, {$set: {checked: !this.checked}});
        },
        'click .delete': function () {
            Lists.remove(this._id);
        }
    });

//Display the todos on the Todos page (Private todos)
    Template.listTodos.helpers({

        //Returning a function to display the data from the collections
        myArray: function () {
            var currentUser =  Meteor.users.findOne({_id: Meteor.userId() }).username
            return Lists.find({createdBy: currentUser});

        }
    });



}

