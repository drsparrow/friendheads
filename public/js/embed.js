window.FriendheadsWidget = function(id) {
  var i = FriendheadsWidget.iframe = document.createElement('iframe');
  i.src = 'https://friendheads.herokuapp.com/' + id + '?embeded=1';
  i.setAttribute('tabindex', -1);
  i.setAttribute('allowtransparency', true);

  var style = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'block',
    border: 'none',
    'pointer-events': 'none'
  };

  for(var key in style) {
    i.style[key] = style[key];
  }

  document.body.append(i);
}
