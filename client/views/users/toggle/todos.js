import { Template } from 'meteor/templating';
var Todos = new Mongo.Collection('todos');

import './todos.html';

Template.todos.events({
    'submit #todos': function (event) {
        event.preventDefault();
        var title = event.target.titleTodos.value;
        var notes = event.target.todosNotes.value;
        var createdBy = Meteor.userId();
        Todos.insert({
            title: title,
            notes: notes,
            createdAt: new Date(),
            createdBy: createdBy
        }, function (err) {
            if(!err){
                console.log("Entry made");
            }
        });
        Meteor.subscribe('todosList');
        event.target.titleTodos.value = "";
        event.target.todosNotes.value = "";

        return false;
    },
    'click .delete': function () {

        /*
        if the todos id
         */
        if(this.createdBy === Meteor.userId()){
            Todos.remove(this._id);
        }
        else{
            console.log("Cannot delete someone else post.");
        }
    }
    

});
Template.todos.helpers({
    allTodos: function () {
        Meteor.subscribe('todosList');
        return Todos.find({});
    }
});