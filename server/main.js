import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
    var Lists = new Mongo.Collection('list');
}
