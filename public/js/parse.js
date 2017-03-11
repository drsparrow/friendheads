$(function(){
  window.FriendheadsApp = window.FriendheadsApp || {};

  window.FriendheadsApp.params = function() { // http://stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
    var query = $('#head-options').data('options') || '';
    var result = $('.js-page-data').data();
    if (FriendheadsApp._params) {
      result = FriendheadsApp._params;
    } else {
      query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
      });
    }
    return arguments.length ? result[arguments[0]] : result
  }

})
