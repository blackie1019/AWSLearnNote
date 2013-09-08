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
function iconClassName(type){
    var iconClass="glyphicon "; 
    switch(type){
        case "fb":
            iconClass+="icon-facebook";
            break;
        case "g+=":
            iconClass+="icon-googleplus";
            break;
        case "twitter":
            iconClass+="icon-twitter";
            break;
        case "word":
            iconClass+="icon-file-word";
            break;
        case "excel":
            iconClass+="icon-file-excel";
            break;
        case "ppt":
            iconClass+="icon-file-powerpoint";
            break;
        case "pdf":
            iconClass+="icon-file-pdf";
            break;
        case "html":
            iconClass+="icon-file-xml";
            break;
        case "zip":
            iconClass+="icon-file-zip";
            break;
        case "img":
            iconClass+="icon-picture";
            break;
        case "media":
            iconClass+="icon-youtube";
            break;
        case "site":
            iconClass+="icon-globe";
            break;
        default:
            iconClass+="glyphicon-file";
            break;
    }
    return iconClass;
}