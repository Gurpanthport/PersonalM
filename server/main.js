import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
    Meteor.publish('users', function usersFunction() {
        return Meteor.users.find({_id: this.userId});
    });
}
