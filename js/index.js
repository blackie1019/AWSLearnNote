function openBrowser(linkURL){
    var tempURL=encodeURI(linkURL);
    if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|IEMobile)/)){
    var ref = window.open(tempURL, '_system', 'location=yes');
    ref.addEventListener('loadstart', function() { alert(event.url); });
    }else{
          var win=window.open(tempURL, '_blank');
          win.focus();
        // window.location.href=tempURL;
    }
}