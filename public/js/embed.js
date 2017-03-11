;(function(){

  var widget = window.FriendheadsWidget = {};
  FriendheadsWidget._count = 0;

  ['add', 'destroy', 'count'].forEach(function(func){
    widget[func] = function() {
      console.error('FriendheadsWidget not initialized')
    }
  })

  widget.init = function (headId) {
    widget._headId = headId || '_404_';

    widget.add = function(num) {
      num = arguments.length ? num : 1;
      widget.count(widget.count() + num);

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
        if(widget._count < 0) { widget._count = 0; }
        updateIframe()
      }
      return widget._count;
    };
  }

  var updateIframe = function () {
    if(!widget.iframe) {
      createIframe()
    };
    widget.iframe.src = 'https://friendheads.herokuapp.com/' + widget._headId + '?embedded=1#'+widget._count;
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
