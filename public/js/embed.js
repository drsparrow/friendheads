;(function(){

  var widget = window.FriendheadsWidget = {};
  FriendheadsWidget.iframes = {};

  widget.add = function(id) {
    var iframe = document.createElement('iframe');

    iframe.src = 'https://friendheads.herokuapp.com/' + id + '?embeded=1';
    iframe.setAttribute('tabindex', -1);
    iframe.setAttribute('allowtransparency', true);

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
      iframe.style[key] = style[key];
    }

    document.body.append(iframe);
    widget.iframes[id] = widget.iframes[id] || []
    widget.iframes[id].push(iframe);

    return iframe;
  }

  widget.clear = function () {
    for (var id in widget.iframes) {
      widget.remove(id)
    }

    widget.iframes = {};
  };

  widget.remove = function (id) {
    var iframes = widget.iframes[id];
    if(!iframes) { return false }
    iframes.forEach(function(iframe){
      document.body.removeChild(iframe);
    });

    delete widget.iframes[id];
    return true;
  }

})();
