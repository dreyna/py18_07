$(document).ready(function (){
    listarRol();
});
function listarRol(){
    var nom = $("#caja").val();
    $.get("rol2",{"opc":1},function (data) {
        var x = JSON.parse(data);
          $("#tablita tbody tr").remove(); 
        for(var i = 0;i<x.length;i++){
            $("#tablita").append("<tr><td>"+(i+1)+"</td><td>"+x[i].idr+"</td><td>"+x[i].nomrol+"</td><td><a href='#' onclick='editar("+x[i].idr+")'><i class='far fa-edit'></i></a></td><td><a href='#' onclick='eliminar("+x[i].idr+")'><i class='fas fa-trash-alt'></i></a></td></tr>");
        }
    });

}
function editar(x){
    $.get("rol2",{"opc":2,"id":x},function (data) {
       var x = JSON.parse(data);
        $("#edit_nomrol").val(x.nomrol);
        $("#edit_idrol").val(x.idr);
    });
    $("#myModal2").modal('show');
}
function eliminar(x){
    
    $.get("rol2",{"id":x,"opc":5},function () {
        listarRol();
    });
}
function listarRolId(){
    $.get("rol2",{"opc":2},function (data) {
        alert(data);
    });
}
$("#crearRol").click(function (){
      alert("saverol");
    $("#nomrol").val("");
    document.getElementById("nomrol").focus();
    $("#myModal").modal('show');
    
});

$("#saverol").click(function (){
    alert("saverol");
    var nr = $("#nomrol").val();
    $.post("rol2",{"nombrerol":nr,"opc":3},function () {
        listarRol();
    });
    $("#myModal").modal('hide');
    
});
$("#editrol").click(function (){
    var id = $("#edit_idrol").val();
    var nomrol = $("#edit_nomrol").val();
    $.post("rol2",{"id":id,"nomrol":nomrol,"opc":4}, function () {
        listarRol();
    });
    $("#myModal2").modal('hide');
});


