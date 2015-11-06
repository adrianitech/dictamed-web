'use strict'

angular.module 'dictamedWebApp'
.controller 'MainCtrl', ($scope, $http, socket) ->
  $scope.translations = []

  # yo angular-fullstack:heroku
  # grunt
  # grunt buildcontrol:heroku

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
