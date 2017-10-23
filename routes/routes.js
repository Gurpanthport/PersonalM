Router.route('/', function () {
    if(!Meteor.user()){
        this.render('loginUser');
    }
    else {
        this.render('dashboard')
    }
});
Router.route('/register', function () {
    this.render('signup');
});

Router.route('/allusers', function(){
   this.render('allusers');
});
Router.route('/dashboard', function(){
        this.render('dashboard');
});
Router.route('/personalInfo',function () {
    this.render('personalInfo');
});
Router.route('/todos', function(){
   this.render('todos');
});
Router.route('/schedule', function () {
   this.render('schedule');
});
Router.route('/inventory', function () {
   this.render('inventory');
});

loginRequired = function () {
    if (!Meteor.user()) {
        if (!Meteor.loggingIn()) {
            this.render('loginUser');
        }
    } else {
        this.next();
    }
};
//Execute the LoginRequired function before login.
Router.onBeforeAction(loginRequired, {except: 'signup'});