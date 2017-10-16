import { Template } from 'meteor/templating';

Template.navbar.events({
   'click .logout': function (event) {
       event.preventDefault();
       Meteor.logout(function (err) {
           if(!err){
               Router.go('/');
           }
           else{
               return "Contact IT" + err
           }
       })
   } 
});