;(function(){

  window.Friendheads = function (headId, options) {
    options = options || {};
    this.iframe = null;
    this._headId = headId;
    this._count = 0;
    this._opacity = options.hasOwnProperty('opacity') ? options.opacity : 1;
    this._container = options.container;
  };

  var proto = Friendheads.prototype;

  proto.add = function (num) {
    num = arguments.length ? num : 1;
    this.count(this.count() + num);

    return this.count();
  }

  proto.count = function () {
    if(arguments.length) {
      this._count = parseInt(arguments[0]);
      if(this._count < 0) { this._count = 0; }
      this._updateIframe()
    }
    return parseInt(this._count);
  };

  proto.opacity = function () {
    if(arguments.length) {
      this._opacity = parseFloat(arguments[0]);
      this.iframe && (this.iframe.style.opacity = this._opacity);
    }
    return this._opacity;
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
      overflow: 'hidden',
      display: 'block',
      border: 'none',
      width: '100%',
      height: '100%',
      opacity: this.opacity(),
      'pointer-events': 'none'
    };

    if (this._container) {
      var container = this._container;
      if(container instanceof (window.jQuery || Array)) { // container is dom element if jQuery, or first element if Array
        container = container[0];
      }
    } else {
      var container = document.body
      style.width = '100vw';
      style.height = '100vh';
    }

    for(var key in style) {
      this.iframe.style[key] = style[key];
    }

    container.append(this.iframe);
  }

})();
