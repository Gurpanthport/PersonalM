import { Template } from 'meteor/templating';
var Todos = new Mongo.Collection('todos');
var Inventory = new Mongo.Collection('inventory');
InventoryHistory = new Mongo.Collection('inventoryHistory');
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
            createdBy: createdBy,
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

Template.inventory.events({
   'submit .customTonerAdd': function (event) {
       event.preventDefault();
       var customTonerName = event.target.customTonerName.value;
       var customTonerAmount = Number(event.target.customTonerAmount.value);
       var createdBy = Meteor.userId();

       Inventory.insert({
           customTonerName: customTonerName,
           customTonerAmount: customTonerAmount,
           createdBy: createdBy,
           createdAt: new Date()
       }, function (err) {
           if (!err) {
               console.log('Entry Made');
           }
           else{
               console.log(err);
           }
       });

   },
    'submit .inventoryEntry': function (event) {
        //event.preventDefault();
        var tonerType = event.target.selectToner.value;
        var quantity = Number(event.target.quantity.value);
        var name = event.target.tonerGivenName.value;
        var location = event.target.location.value;
        var notes = event.target.notes.value;
        var department = event.target.dept.value;

        var selectedToner = Inventory.findOne({customTonerName: tonerType})._id;
        if(tonerType != '' && quantity != '' && name != '' && location != '' && department != ''){
            Inventory.update({_id: selectedToner}, {'$inc': {customTonerAmount: - quantity}});

            InventoryHistory.insert({
                tonerType: tonerType,
                quantity: quantity,
                name: name,
                location: location,
                notes: notes,
                department: department
            }, function (err) {
                if(!err){
                    console.log('Entry Made');
                }
            });
        }
        console.log(selectedToner);

    },
    'submit .overwriteStock': function (event) {
        var tonerType = event.target.selectTonerOverwrite.value;
        var quantity = event.target.quantityOverwrite.value;
        var selectedToner = Inventory.findOne({customTonerName: tonerType})._id;

        Inventory.update({_id: selectedToner}, {"$inc": {customTonerAmount: + quantity}});

    }
});

//Listing all the toners on the Inventory page (In the option menu.
Template.inventory.helpers({
   listAllToners: function () {
       Meteor.subscribe('selectInventory');
       return Inventory.find();
   }
});

