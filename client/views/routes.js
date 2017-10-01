//Created a map for routing pages to different paths.
Router.map(function() {
    this.route('loginPage', { path: '/' });
    this.route('registration', {path: '/register'});
    this.route('private'); // this should be protected
    this.route('dashboard', {path: '/dashboard'});
    this.route('profile', {path: '/profile'});
    this.route('listTodos', {path: '/todos'});
//    this.route('views', {path: '/users'});
    //this.route('profile',  {path: '/profile'});
});


/*Only redirect to the dashboard page once the user is logged in.
Any page that loads without logging in will be redirected to the main Page(LoginPage)
Except ('/') or any other page that has to be shown to the user before login.
*/
loginRequired = function () {
    if (!Meteor.user()) {
        if (!Meteor.loggingIn()) {
            this.render('loginPage');
        }
    } else {
       this.next();
    }
};
//Execute the LoginRequired function before login.
Router.onBeforeAction(loginRequired, {except: 'registration'});

