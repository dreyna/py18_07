$(document).ready(function (){
menu();
});

function menu(){
   var rol = $("#rolcito").val();
   var p = "";
   if(rol=="Administrador"){
    p = ""+
        "<li><a href='menu?op=1' id='m0' class='active'><i class='fas fa-id-card' style='margin-right: 7px;color: #00ccff;' id='urlRol'></i>Rol</a></li>"+
        "<li><a href='menu?op=2' id='m1' class='active'><i class='fas fa-users' style='margin-right: 7px;color: #00ccff;' id='urlRol'></i>Persona</a></li>"+
        "<li><a href='menu?op=3' id='m2' class='active'><i class='fas fa-user-alt' style='margin-right: 7px;color: #00ccff;' id='urlRol'></i>Usuario</a></li>"+
        "<li><a href='menu?op=4' id='m3' class='active'><i class='fas fa-boxes' style='margin-right: 7px;color: #00ccff;' id='urlRol'></i>Producto</a></li>"+
        "<li><a href='menu?op=5' id='m4' class='active'><i class='fas fa-cart-plus' style='margin-right: 7px;color: #00ccff;' id='urlRol'></i>Ventas</a></li>"+
        "<li><a href='menu?op=6' id='m5' class='active'><i class='fas fa-chart-bar' style='margin-right: 7px;color: #00ccff;' id='urlRol'></i>Reportes</a></li>";
   }
   if(rol=="Gerente de Ventas"){
    p = "<li><a href='menu?op=6' id='m5' class='active'><i class='fas fa-cart-plus' style='margin-right: 7px;color: #00ccff;' id='urlRol6'></i>Reportes</a></li>";
   }
   if(rol=="Vendedor"){
    p = "<li><a href='menu?op=5' id='m4' class='active'><i class='fas fa-id-card' style='margin-right: 7px;color: #00ccff;' id='urlRol'></i>Ventas</a></li>";
   }
   $("#abc").append(p);
                        
}
$("#perfil").click(function (){
    $.get("menu",{"op":7},function (data){
       $("#contenido").html(data); 
    });
   
});

