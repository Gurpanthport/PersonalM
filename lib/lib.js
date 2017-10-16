Meteor.users.allow({
    remove() { return false; }
});

Meteor.users.deny({
    remove() { return true; }
});


Roles.addUsersToRoles('PkJTAYzexQJxvzD3E', ['admin']);
