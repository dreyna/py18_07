$(document).ready(function () {
    listarProducto();
    limpiar()
});
function listarProducto() {
    $.get("pc", {"opc": 1}, function (data) {
        var x = JSON.parse(data);
        $("#tablita tbody tr").remove();
        for (var i = 0; i < x.length; i++) {
            $("#tablita").append("<tr><td>" + (i + 1) + "</td><td>" + x[i].producto + "</td><td>" + x[i].precio + "</td><td>" + x[i].cantidad + "</td><td>" + x[i].categoria + "</td><td><a href='#' onclick='editar(" + x[i].idproducto + ")' class='edit'><i class='far fa-edit'></i></a></td><td><a href='#' onclick='del(" + x[i].idproducto + ")' class='del'><i class='fas fa-trash-alt'></i></a></td></tr>");
        }
    });
}
function agregar() {
    $("#myModal").modal('show');
}
function add() {
    if ($("#id").val() === '0') {
        var prod = $("#producto").val();
        var pre = $("#precio").val();
        var cant = $("#cantidad").val();
        var idcat = $("#categoria").val();
        /**/
        if (idcat !== 0 && prod !== "") {
            $.post("pc", {"producto": prod, "precio": pre, "cantidad": cant, "categoria": idcat, "opc": 2}, function (data) {
                listarProducto();
                limpiar();
                $("#myModal").modal('hide');
                bootbox.alert({
                    message: "La producto " + prod + " registrado correctamente...!",
                    backdrop: true
                });
            });
        } else {
            bootbox.alert({
                message: "No se ha seleccionado facultad o sea ingresado una escuela...!",
                backdrop: true
            });
        }
        /**/
    } else {
        actualizar();
    }
}
function limpiar() {
    $("#categoria").val(0);
    $("#producto").val("");
    $("#precio").val("");
    $("#cantidad").val("");
    $("#id").val(0);
}
function del(x) {
    bootbox.confirm({
        message: "Realmente desea eliminar ?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.get("pc", {"idprod": x, "opc": 4}, function () {
                    listarProducto();
                    bootbox.alert({
                        message: "El producto ha sido eliminado correctamente...!",
                        backdrop: true
                    });
                });
            } else {
                bootbox.alert({
                    message: "No se eliminó el producto",
                    size: 'small'
                });
                limpiar();
            }

        }
    });

}
function editar(x) {
    $.get("pc", {"opc": 5, "idprod": x}, function (data) {
        var x = JSON.parse(data);
        $("#id").val(x.idproducto);
        $("#producto").val(x.nomprod);
        $("#precio").val(x.precio);
        $("#cantidad").val(x.cantidad);
        $("#categoria").val(x.idcategoria);
    });
    $("#myModal").modal('show');
}
function actualizar() {
    var idprod = $("#id").val();
    var prod = $("#producto").val();
    var pre = $("#precio").val();
    var cant = $("#cantidad").val();
    var idcat = $("#categoria").val();
    bootbox.confirm({
        message: "Realmente desea modificar el producto " + prod + "?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.post("pc", {"idprod": idprod, "producto": prod, "precio": pre, "cantidad": cant, "categoria": idcat, "opc": 3}, function () {
                    listarProducto();
                    limpiar();
                    bootbox.alert({
                        message: "La escuela " + prod + " ha sido modificado correctamente...!",
                        backdrop: true
                    });
                });
            } else {
                bootbox.alert({
                    message: "No se modificó la escuela " + prod+ "!",
                    size: 'small'
                });
                limpiar();
            }

        }
    });


    $("#myModal").modal('hide');

}

