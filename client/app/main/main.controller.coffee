'use strict'

angular.module 'dictamedWebApp'

.directive 'ngSelection', ->
  restrict: 'A'
  link: (scope, elems, attrs) ->
    attrs.$observe 'ngSelection', (value) ->
      values = value.split ','
      elems[0].setSelectionRange values[0], values[1]

.controller 'MainCtrl', ($scope, $http, socket) ->
  $scope.translations = []

  # yo angular-fullstack:heroku
  # grunt
  # grunt buildcontrol:heroku

  $scope.play = (i) ->
    i.start = 0
    i.end = (i.end || 0) + 1

  $scope.delete = (i) ->
    $http.delete('/api/translations/' + i._id).success ->
      index = $scope.translations.indexOf i
      $scope.translations.splice index, 1

  $scope.save = (i) ->
    i.translation = i.translationTemp
    i.validated = true
    delete i.translationTemp
    $http.put '/api/translations/' + i._id, i

  $scope.send = (i) ->
    i.translation = i.translationTemp
    i.validated = true
    delete i.translationTemp
    $http.put '/api/translations/' + i._id, i

  $http.get('/api/translations').success (translations) ->
    $scope.translations = translations
    socket.syncUpdates 'translation', $scope.translations

  $scope.$on '$destroy', ->
    socket.unsyncUpdates 'translation'
