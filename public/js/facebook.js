window.fbAsyncInit = function() {
  FB.init({
    appId      : '1137251959737350',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

 var blah = function () {
     FB.ui(
   {
    method: 'share',
    href: window.location.href
  }, function(response){console.log(response)});
 }
