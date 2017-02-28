$(function(){
  var $headCount = $('#head-count');

  $headCount.val(FriendHeads.defaultHeadCount)

  var changeFunc = function(){
    $('#head-count-value').text(this.value)
  }.bind($headCount[0])

  $headCount.on('input', changeFunc)
  changeFunc()
});
