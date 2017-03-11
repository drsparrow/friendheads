;(function(){

  var widget = window.FriendheadsWidget = {};
  FriendheadsWidget.count = 0;

  widget.add = function(num) {
    widget.count += (num || 1);
    var id = widget.headId;

    if(!widget.iframe) {
      createIframe()
    }

    widget.iframe.src = 'https://friendheads.herokuapp.com/' + widget.headId + '?embedded=1#'+widget.count;

    return widget.count;
  }

  widget.destroy = function() {
    if(!widget.iframe) { return false; }

    document.body.removeChild(widget.iframe);
    delete widget.iframe;
    return true;
  }

  var createIframe = function () {
    var iframe = document.createElement('iframe');

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
    widget.iframe = iframe;
  }

})();
