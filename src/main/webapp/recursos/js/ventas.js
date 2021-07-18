$(document).ready(function (){   
    $("#registrarVenta").attr('disabled','true');
});
var cod = 0;
$("#prod").keyup(function (){
    cod = $("#prod").val();var w = 0.0;
    if(cod.length>=3){    	
    $.get("ventas",{"opc":1,"cod":cod},function(data) {
    	clear();
        if(data==0){
        	$("#prod").val("").focus();
            cod = 0;
        	bootbox.alert("Producto no Existe...!");

        }else{
        	cod =0;
            var x = JSON.parse(data);
            clear();            
            if(x.stock >0){           
                $("#tablaVentas").append("<tr><td><input type='text' id='cant' value='1' class='form-control' style='width: 50px;'" +
                        "maxlength='3'></td><td>" + x.idprod + "</td><td>" + x.cod + "</td><td>" + x.nomprod + "</td><td>" + x.precio + "</td><td>" + x.stock + "</td><td>" +
                        "<a href='#' onclick='prodDatos()'><i class='fas fa-cart-arrow-down fa-2x' style='color: #43d503;'></i></a></td></tr>");
                $("#visualizarProducto").css("display", "block"); 
            }else{
                $("#tablaVentas").append("<tr><td><input type='text' id='cant' value='1' class='form-control' style='width: 50px;'" +
                        "maxlength='3' disabled='true'></td><td>" + x.idprod + "</td><td>" + x.cod + "</td><td>" + x.nomprod + "</td><td>" + x.precio + "</td><td>" + x.stock + "</td><td>" +
                        "<a href='#' onclick='#'><i class='fas fa-cart-arrow-down fa-2x' style='color: #43d503;'></i></a></td></tr>");
                $("#visualizarProducto").css("display", "block");
            }
        }       
    });
    }/*else{
        clear();
        if(cod.length>3)
        	$("#prod").val("");
            $("#prod").focus();
    }*/
});
function imprimir() {
  window.print();
}
function clear(){
	$('#tablaVentas tbody tr').remove();
    $("#visualizarProducto").css("display", "none"); 
}
var carrito = new Array(); 
function prodDatos(){
    $("#prod").val("");
    $("#prod").val("").focus();
    var obj = new Object();
    $('#tablaVentas tr').each(function () {        
        obj.cant = $("#cant").val();
        obj.idp = $(this).find("td").eq(1).html();
        obj.cod = $(this).find("td").eq(2).html();
        obj.prod = $(this).find("td").eq(3).html();
        obj.pre = $(this).find("td").eq(4).html();        
    });
    $('#tablaVentas tbody tr').remove();
    addObject(obj);
    listarObject();
}
function addObject(cad){
  if(carrito.length>0){
      var j =0;
      while(j<carrito.length){
          if(carrito[j].cod===cad.cod){
              carrito[j].cant=parseInt(carrito[j].cant)+parseInt(cad.cant);  
              j = carrito.length;cad = null;
          }
          j++;
      }
      if(cad!==null){
          carrito.push(cad); 
      }    
  }else{
      carrito.push(cad); 
  }
  $("#prod").focus();
}
function listarObject(){
    var item = 1, st=0, igv=0, total=0;

  $("#visualizarProducto").css("display", "none");//0cultar la tabla de busqueda  
  $('#tablitaDetalle tbody tr').remove();
  for (var j =0;j<carrito.length;j++){
    $("#tablitaDetalle").append("<tr><td>"+item+"</td><td>"+carrito[j].cod+"</td><td>"+carrito[j].prod+"</td><td>"+carrito[j].pre+"</td><td>"+carrito[j].cant+"</td><td>"+
    "<a href='#' onclick='eliminarDetalle("+j+")'><i class='fas fa-trash-alt fa-2x' style='color: black;'></i></a></td></tr>");
    total= total+ parseFloat(carrito[j].cant)*parseFloat(carrito[j].pre);   
    item++;
  }  
  igv = total*0.18;
  st = total -igv;//numero.toFixed(2); 
  $("#total").html("S/. "+total.toFixed(2));
  $("#st").html("S/. "+ st.toFixed(2));
  $("#igv").html("S/. "+ igv.toFixed(2));
  $("#totalcito").html("S/. "+ total.toFixed(2));
  
}
function eliminarDetalle(j){
    carrito.splice(j,1);
    listarObject();   
}
$('#prod').numeric({ });
$('#cliente').numeric({ });
//buscar cliente
$("#cliente").keyup(function(){
  var d = $("#cliente").val();
  if(d.length===8){
    $.post("ventas",{"dni":d,"opc":2},function(data){
        if(data==0){
          $("#cliente").val("Cliente no existe...!");
        }else{
          var x = JSON.parse(data);
          var nombre = x[0].nombres+" "+x[0].apellidos;
          $("#idcliente").val(x[0].idpersona);
          $("#cliente").attr('disabled','true');
          $("#cliente").val(nombre);
          $("#registrarVenta").removeAttr('disabled');
        }
    });
  }    
  });
$("#registrarVenta").click(function (){
    var idc = parseInt($("#idcliente").val());
    var det = JSON.stringify(carrito);
    if(idc>0){
          $.post("ventas",{"opc":3,"idc":idc},function(w){
            var idv = parseInt(w);
            if(idv>0){
                $.post("ventas",{"carrito":det,"opc":4,"id":idv},function(data){
                    if(data>0){
                        alert("Venta realizada satisfactoriamente...!");
                        limpiar();
                    }else{
                        alert("No se pudo realizar la venta...!");
                        limpiar();
                    }
                });
            }else{
                alert("No se pudo registrar la venta...!");
                limpiar();
            }
         });
   }else{
      alert("Insertar Cliente...!");
  }   
});
function limpiar(){
    $("#prod").val("");
    $('#tablitaDetalle tbody tr').remove();
    $("#cliente").val("");
    $("#idcliente").val("");
    $("#prod").val("").focus();
    $("#total").html("");
    $("#st").html("");
    $("#igv").html("");
    $("#totalcito").html("S/.0.0");
    $("#registrarVenta").attr('disabled','true');
    $("#cliente").prop('disabled', false);
    $('#tablaVentas tbody tr').remove();
    carrito.length = 0;
}