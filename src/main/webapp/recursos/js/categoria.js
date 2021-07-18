$(document).ready(function (){
    listarCategoria();
});
function listarCategoria(){    
    $.get('cc',{"opc":1},function(data) {
        var x = JSON.parse(data);
        for(var i = 0;i<x.length;i++){
            $("#categoria").append("<option value='"+x[i].idcategoria+"'>"+x[i].nomcat+"</option>");
        }
    }); 
}


