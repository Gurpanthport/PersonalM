import { Meteor } from 'meteor/meteor';
if(Meteor.isServer){
    Meteor.publish('users', function usersFunction() {
        return Meteor.users.find({/*_id: this.userId*/});
    })}

var Todos = new Mongo.Collection('todos');
//var Inventory = new Mongo.Collection('inventory');
Todos.allow({
    insert() {return true;},
    remove() {return true;},
    update() {return true;}
});

Todos.deny({
    insert(){return false;},
    update(){return true;},
    remove(){return false;}
});


Meteor.publish('todosList', function todo() {
    return Todos.find({});
});
