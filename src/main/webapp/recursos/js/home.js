$(document).ready(function (){
});
$("#login").click(function (){
   $("#myModal").modal('show');
});
$("#validar").click(function (){
    var x = $("#user").val();
    var y = $("#pass").val();
    $.post("main",{"user":x,"pass":y,"op":1});

   $("#myModal").modal('hide');
});