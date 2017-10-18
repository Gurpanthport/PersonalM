Meteor.users.allow({
    insert() { return true; }
});

Meteor.users.deny({
    insert() { return false; }
});

Roles.addUsersToRoles('j8tuNc5CGxKMNEgYM', ['admin']);
