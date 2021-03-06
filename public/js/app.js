angular
  .module("leagueSplash", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("SkinFactory", [
    "$resource",
    SkinFactoryFunction
  ])
  .factory("ChampionFactory", [
    "$resource",
    ChampionFactoryFunction
  ])
  .factory("SpotlightFactory", [
    "$resource",
    SpotlightFactoryFunction
  ])
  .controller("indexCtrl", [
    "$state",
    "SkinFactory",
    indexController
  ])
  .controller("championCtrl", [
    "$state",
    "ChampionFactory",
    "$stateParams",
    championController
  ])
  .controller("spotlightCtrl", [
    "$state",
    "SpotlightFactory",
    "$stateParams",
    spotlightController
  ])

function Router ($stateProvider) {
  $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "/assets/js/ng-views/index.html",
      controller: "indexCtrl",
      controllerAs: "vm"
    })
    .state("champion", {
      url: "/champions/:name",
      templateUrl: "/assets/js/ng-views/champion.html",
      controller: "championCtrl",
      controllerAs: "vm"
    })
    .state("spotlight", {
      url: "/champions/:name/:nameOfSkin/spotlight",
      templateUrl: "/views/skin.hbs",
      controller: "spotlightCtrl",
      controllerAs: "vm"
    })

}
function SkinFactoryFunction($resource) {
  return $resource("/api/champions", {}, {
    update: {method: "put"}
  })
}
function ChampionFactoryFunction($resource){
  return $resource("/api/champions/:name", {}, {
    update: {method: "put"}
  })
}
function SpotlightFactoryFunction($resource){
  return $resource("/api/champions/:name/:nameOfSkin")
}
function indexController ($state, SkinFactory){
  console.log("index controller working")
  SkinFactory
    .query() 
    .$promise
    .then(champions => this.champions = champions)
}

function championController($state, ChampionFactory, $stateParams){
  console.log("Champion controller working")
  ChampionFactory
    .get({name: $stateParams.name})
    .$promise
    .then(championSkins => this.championSkins = championSkins)
}
function spotlightController($state, SpotlightFactory, $stateParams){
  console.log("Spotlight Controller working")
  SpotlightFactory
    .get({name: $stateParams.name, nameOfSkin: $stateParams.nameOfSkin})
    .$promise
    .then(spotlight => this.spotlight = spotlight)
}
