$(document).ready(function (){
listarFacultad();
});
function listarFacultad(){
    $.get("fc",{"opc":1},function (data) {
        var x = JSON.parse(data);
        for(var i = 0;i<x.length;i++){
            $("#facultad").append("<option value='"+x[i].idfacultad+"'>"+x[i].nombre+"</option>");
        }
    });
}


