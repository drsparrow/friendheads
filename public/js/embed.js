;(function(){

  var widget = window.FriendheadsWidget = {};
  FriendheadsWidget._count = 0;

  widget.add = function(num) {
    num = arguments.length ? num : 1;
    widget._count += (num);
    var id = widget.headId;

    if(!widget.iframe) {
      createIframe()
    }

    updateIframe();

    return widget._count;
  }

  widget.destroy = function() {
    if(!widget.iframe) { return false; }

    document.body.removeChild(widget.iframe);
    delete widget.iframe;
    return true;
  }

  widget.count = function () {
    if(arguments.length) {
      widget._count = arguments[0];
      updateIframe()
    }
    return widget._count;
  };

  var updateIframe = function () {
    widget.iframe.src = 'https://friendheads.herokuapp.com/' + widget.headId + '?embedded=1#'+widget._count;
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
