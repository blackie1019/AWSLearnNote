var app = angular.module('app', ['ui.router']);

/*Navli*/
app.directive('ngNavliServices',function ($compile,$location) {
	var getTemplate=function(itemType){
			var template=' <li class="divider"></li><li class="dropdown-header">{{item.type}}</li><li ng-repeat="service in item.items"><a ng-click="doService(item.type,service.index,service.name)">{{service.name}}</a></li>';
			return template;
		},
		linker = function(scope, element, attrs) {
	        scope.doService = function (type,index,name){
                $location.path("/services").search('md',index);
	        }
	        element.html(getTemplate(scope.item.type)).show();
	        $compile(element.contents())(scope);
	    };
	return {
        restrict: "EA",
        replace: true,
        link: linker,
        scope: {
            item:'='
        }
    };
});
app.directive('ngNavliShowcases',function ($compile,$location) {
    var serialTemplate=' <li class="divider"></li><li class="dropdown-header">{{item.name}}</li><li ng-repeat="part in item.Parts"><a data-img={{part.img}} ng-click="doShowCase(part.img)">{{part.name}}</a></li>',
        singleTemplate='<li><a data-img={{item.img}} ng-click="doShowCase(item.img)">{{item.name}}</a></li>',
        getTemplate=function(itemType){
            var template='';
            switch(itemType){
                case "single":
                    template = singleTemplate;
                    break;
                case "serial":
                    template = serialTemplate;
                    break;
            }
            return template;
        },
        linker = function(scope, element, attrs) {
            scope.doShowCase = function (img){
                $location.path("/showcases").search('img',img);
            }
            element.html(getTemplate(scope.item.type)).show();
            $compile(element.contents())(scope);

        };
    return {
        restrict: "EA",
        replace: true,
        link: linker,
        scope: {
            item:'='
        }
    };
});
// app.directive('ngServicesMdHtml',function ($compile) {
//     return {
//         restrict: "EA",
//         replace: true,
//         link: function(scope, element, attrs) {
//             element.html('<div ng-bind-html="trustedHtml"></div>').show();
//             $compile(element.contents())(scope);
//         },
//         scope: {
//             content:'='
//         }
//     };
// });
/*Factory*/
app.factory('appData',function($http){
	var appData={
		async:function(){
			var data= $http.get('data.json').then(function(response) {
		    	return response.data;
			});
			return data;
		}
	};
	return appData;
});

/*Control*/
function HeaderCtrl($scope,$http,$location,appData){
	$scope.activeNavLI= $location.path();
	appData.async().then(function(data){
		$scope.services= data.services;
		$scope.showcases= data.showcases;
	});
}
function indexPageCtrl($scope,$http,$location,appData){
	appData.async().then(function(data){
		$scope.index= data.index;
	});
}
function servicesPageCtrl($scope,$http,$location,$sce){
    openMD($location.search().md).async($http).then(function(data){
        $scope.trustedHtml = $sce.trustAsHtml(convertMDtoHTML(data));
    },function(error){
        $scope.trustedHtml = $sce.trustAsHtml("Still working on it");
    });
}
function keywordsPageCtrl($scope,$http,$location,appData){
	appData.async().then(function(data){
		$scope.items= data.keywords;
	});
    $scope.openBrowser=function(url){
    	openBrowser(url);
    };
}
function showcasesPageCtrl($scope,$http,$location,appData){
	var myScroll;
    $scope.imgURL=$location.search().img;
	appData.async().then(function(data){
	    $scope.items= data.showcases;

	});
    myScroll = new iScroll('div_showcase_img',{ zoom: true });
    $scope.openBrowser=function(url){
    	openBrowser(url);
    };
}
function whitepapersPageCtrl($scope,$http,$location,appData){
	appData.async().then(function(data){
	    $scope.items= data.whitepapers;
	});
    $scope.openBrowser=function(url){
    	openBrowser(url);
    };
    $scope.getIcon=function(type){
    	return  iconClassName(type);
    };
}
function sitesPageCtrl($scope,$http,$location,appData){
	appData.async().then(function(data){
		$scope.items= data.sites;
	});
    $scope.openBrowser=function(url){
    	openBrowser(url);
    };
    $scope.getIcon=function(type){
    	return  iconClassName(type);
    };
}
function othersPageCtrl($scope,$http,$location,appData){
	appData.async().then(function(data){
		$scope.items= data.others;
	});
    $scope.openBrowser=function(url){
    	openBrowser(url);
    };
    $scope.getIcon=function(type){
    	return  iconClassName(type);
    };
}
function authorPageCtrl($scope,$http,$location){
	$scope.welcomeStr="Hi";
}

/*Config*/
app.config(function($stateProvider, $urlRouterProvider){
  //
  // For any unmatched url, send to /index
  $urlRouterProvider.otherwise("/index")
  //
  // Now set up the states
  $stateProvider
    .state('index', {
        url: "/index",
        templateUrl: "themeplates/index.ejs"
    })
    .state('services', {
        url: "/services?md",
        templateUrl: "themeplates/services.ejs"
    })
    .state('keywords', {
        url: "/keywords",
        templateUrl: "themeplates/keywords.ejs"
    })
    .state('showcases', {
        url: "/showcases?img",
        templateUrl: "themeplates/showcases.ejs"
    })
   	.state('whitepapers', {
        url: "/whitepapers",
        templateUrl: "themeplates/whitepapers.ejs"
    })
    .state('sites', {
        url: "/sites",
        templateUrl: "themeplates/sites.ejs"
    })
    .state('others', {
        url: "/others",
        templateUrl: "themeplates/others.ejs"
    })
    .state('author', {
        url: "/author",
        templateUrl: "themeplates/author.ejs"
    })
});