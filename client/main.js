import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
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
           });
           Router.go('dashboard')
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
               }
               else {
                   return "Contact IT Team"
               }
           });
       }
   });

   //Event triggered when the logout button is clicked
    Template.dashboard.events({
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


    //Display all the registered users in the Accounts (Collection)

}