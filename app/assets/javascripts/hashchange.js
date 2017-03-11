window.FriendheadsApp = window.FriendheadsApp || {}
FriendheadsApp.countFromHash = function () {
  return parseInt(window.location.hash.slice(1) || 1);
  FriendheadsApp.updateCount(count);
};
$(function(){
  $(window).on('hashchange', function(){
    FriendheadsApp.updateCount(FriendheadsApp.countFromHash())
  })
})
