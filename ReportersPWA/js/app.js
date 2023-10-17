console.log("APP.JS: Hello Word");

if(navigator.serviceWorker){
    navigator.serviceWorker.register("sw.js");
}