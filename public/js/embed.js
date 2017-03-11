;(function(){

  window.Friendheads = function (headId) {
    this.iframe = null;
    this._headId = headId;
    this._count = 0;
  };

  var proto = Friendheads.prototype;

  proto.add = function (num) {
    num = arguments.length ? num : 1;
    this.count(this.count() + num);

    this._updateIframe();

    return this.count();
  }

  proto.count = function () {
    if(arguments.length) {
      this._count = parseInt(arguments[0]);
      if(this._count < 0) { this._count = 0; }
      this._updateIframe()
    }
    return this._count;
  };

  proto.destroy = function() {
    this.iframe && document.body.removeChild(this.iframe);
  };

  proto._updateIframe = function () {
    if(!this.iframe) {
      this._createIframe()
    };
    this.iframe.src = 'https://friendheads.herokuapp.com/' + this._headId + '?embedded=1#'+this.count();
  }

  proto._createIframe = function () {
    this.iframe = document.createElement('iframe');

    this.iframe.setAttribute('tabindex', -1);
    this.iframe.setAttribute('allowtransparency', true);

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
      this.iframe.style[key] = style[key];
    }

    document.body.append(this.iframe);
  }

})();
