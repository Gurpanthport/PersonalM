import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if (Meteor.isClient) {
    //Event triggered when the user is registering, saves data to the db.
    Template.signup.events({
        'submit .user': function (event) {
            event.preventDefault();

            var userName = event.target.userName.value;
            var userPassword = event.target.userPassword.value;
            Accounts.createUser({
                username: userName,
                password: userPassword,
                createdAt: new Date()
            }, function (err) {
                if (err) {
                    console.log(err + "Contact IT");
                }
                else {
                    console.log("Account Created");
                }
            });
        }
    });

    //Give the User to login
    Template.loginUser.events({
       'submit .user': function (event) {
           event.preventDefault();
           var userName = event.target.userName.value;
           var userPassword = event.target.userPassword.value;

           Meteor.loginWithPassword(userName, userPassword, function (err) {
               if(!err){
                   console.log("The user is now Logged in");
                   Router.go('dashboard');
               }
               else{
                   console.log("Contact IT " + err.reason);
               }
           });
           Meteor.subscribe('users');
       }
    });
    Meteor.subscribe('users');

    //Display all the user on the Allusers page
    Template.allusers.helpers({
       'usersArray': function () {
           return Meteor.users.find({});
       }
    });

    //All Users delete functionality
    Template.allusers.events({
       'click .delete': function () {
               return Meteor.users.remove(this._id);
       }
    });
}
