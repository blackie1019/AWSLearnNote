function openMD(url){
    var fileContent={
            async:function($http){
                var content= $http.get('md/'+url+'.md').then(function(response) {
                    return response.data;
                });
                return content;
            }
        };
    return fileContent;
}
function convertMDtoHTML(text){
    var converter = new Showdown.converter(),
        html=converter.makeHtml(text);
        html=html.replace(/\n/g, "");
    return html;
}
function openBrowser(linkURL){
    var tempURL=encodeURI(linkURL);
    if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|IEMobile)/)){
    var ref = window.open(tempURL, '_system', 'location=yes');
    ref.addEventListener('loadstart', function() { alert(event.url); });
    }else{
          var win=window.open(tempURL, '_blank');
          win.focus();
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