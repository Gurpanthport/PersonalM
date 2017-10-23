

Inventory = new Mongo.Collection('inventory');
InventoryHistory = new Mongo.Collection('inventoryHistory');

Inventory.allow({
    insert() {return true;},
    update() {return true;}
});
Inventory.deny({
    insert() {return false;},
    update() {return false;}
});

InventoryHistory.allow({
   insert() {return true;}
});
InventoryHistory.deny({
   insert() {return false;}
});
//Publishing Inventory Data (Only the toner amount of the Inventory page
Meteor.publish('selectInventory', function selectList(){
    return Inventory.find({}/*, {fields:{customTonerName: 1}}*/);
});