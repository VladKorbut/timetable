'use strict';
app.factory('storageService', function() {
  var storage = window.localStorage;

  return {
    set: function(key, data) {
      storage.setItem(key, data);
    },
    get: function(key) {
      return storage.getItem(key);
    },
    has: function(key) {
      return this.get(key) !== null;
    },
    clear: function() {
      storage.clear();
    },
    remove: function(key) {
      storage.removeItem(key);
    }
  };
});