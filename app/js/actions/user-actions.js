var AppDispatcher = require('../dispatcher/app-dispatcher');
var UserApi = require('../api/user-api');

module.exports = {
  getUsers: function() {
    var promise = UserApi.getAllUsers();
    AppDispatcher.dispatch({
      action: 'USERS_GET_ALL',
      promise: promise
    });
  },
  createUser: function(user) {
    var promise = UserApi.createNewUser(user);
    AppDispatcher.dispatch({
      action: 'USER_CREATE',
      promise: promise
    });
  }
}