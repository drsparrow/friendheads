$(function(){
  $('#url-input').change(function(){
    window.history.replaceState('', document.title, '?u='+this.value);
    window.FriendHeads.update()
  })
})
