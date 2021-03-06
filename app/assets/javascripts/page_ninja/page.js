var app = angular.module('editable', []);

var editableStringTemplate = '<span ng-hide="editMode" ng-dblclick="editMode=true">{{prop}}</span>' +
                             '<span ng-show="editMode">' +
                                '<input ng-enter="editMode=false" type="text" ng-model="prop"/><a herf="#" ng-click="editMode=false">done</a>' +
                             '</span>';
var editableTextTemplate = '<span ng-hide="editMode" ng-dblclick="editMode=true">{{prop}}</span>' +
                           '<span ng-show="editMode">' +
                               '<textarea ng-model="prop"></textarea><a herf="#" ng-click="editMode=false">done</a>' +
                           '</span>';

app.directive('ngEnter', function() {
    return function(scope, elm, attrs) {
        elm.bind('keypress', function(e) {
            if (e.charCode === 13) scope.$apply(attrs.ngEnter);
        });
    };
});

app.directive('editableString', function factory() {
    return {
        template: editableStringTemplate,
        restrict:'AE',
        scope: {prop: '=bind'}
    };
});
app.directive('editableText', function factory() {
    return {
        template: editableTextTemplate,
        restrict:'AE',
        scope: {prop: '=bind'}
    };
});

//app.directive('addMore', function factory() {
//    return {
//        template: '<a href="#" class="btn" ng-click="addMore()">Add More</a>',
//        restrict:'AE',
//        scope: {prop: '=bind'}
//    };
//});
//
function PageCtrl($scope) {
    $scope.page = {title:'Hello, world!',
        dialog:'This is a template for a simple marketing or informational website.',
        hero_button_text:'Learn more »',
        menu:[{text: 'Home', link: '#'}],
        portfolios:[
            {title:'Heading',
                description:'Donec',
                button_text:'View details »'},
            {title:'Heading',
                description:'Donec',
                button_text:'View details »'}
        ]};

    $scope.addMore = function (exp) {
        var nestedVar = exp.split('.');
        var scope = $scope;
        for(var i=0 ; i < nestedVar.length ; i++) {
            scope = scope[nestedVar[i]];
        }
        var newClonedObject = JSON.parse(JSON.stringify(scope[scope.length - 1]));
        scope.push(newClonedObject);
    };
}