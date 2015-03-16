var AppDispatcher = require('../dispatcher/app-dispatcher');
var UserApi = require('../api/user-api');

module.exports = {
  getUsers: function() {
    var promise = UserApi.getAllUsers();
    console.log('USER_GET_ALL');
    AppDispatcher.handleAction({
      action: 'USER_GET_ALL',
      promise: promise
    });
  },
  createUser: function(user) {
    var promise = UserApi.createNewUser(user);
    AppDispatcher.handleAction({
      action: 'USER_CREATE',
      promise: promise
    });
  },
  signIn: function(user) {
    var promise = UserApi.signIn(user);
    AppDispatcher.handleAction({
      action: 'USER_SIGN_IN',
      promise: promise
    })
  },
  signOut: function(name) {
    var promise = UserApi.signOut(name);
    AppDispatcher.handleAction({
      action: 'USER_SIGN_OUT',
      promise: promise
    })
  }
};
