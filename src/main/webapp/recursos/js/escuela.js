$(document).ready(function () {
    listarEscuela();
    limpiar();
});
function listarEscuela() {

    $.get("ec", {"opc": 1}, function (data) {
        var x = JSON.parse(data);
        $("#tablita tbody tr").remove();
        for (var i = 0; i < x.length; i++) {
            $("#tablita").append("<tr><td>" + (i + 1) + "</td><td>" + x[i].facultad + "</td><td>" + x[i].escuela + "</td><td><a href='#' onclick='editar(" + x[i].idescuela + ")' class='edit'><i class='far fa-edit'></i></a></td><td><a href='#' onclick='del(" + x[i].idescuela + ")' class='del'><i class='fas fa-trash-alt'></i></a></td></tr>");
        }
    });
}
function agregar() {
    $("#myModal").modal('show');
}
function add() {
    if ($("#id").val() === '0') {
        var id = $("#id").val();
        var idfacu = $("#facultad").val();
        var escuela = $("#escuela").val();
        /**/
        if (idfacu !== 0 && escuela !== "") {
            $.post("ec", {"idfacu": idfacu, "escuela": escuela, "opc": 2}, function (data) {
                listarEscuela();
                limpiar();
                $("#myModal").modal('hide');
                bootbox.alert({
                    message: "La escuela " + escuela + " registrado correctamente...!",
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
                $.get("ec", {"idesc": x, "opc": 4}, function () {
                    listarEscuela();
                    bootbox.alert({
                        message: "La escuela ha sido eliminado correctamente...!",
                        backdrop: true
                    });
                });
            } else {
                bootbox.alert({
                    message: "No se eliminó la escuela",
                    size: 'small'
                });
                limpiar();
            }

        }
    });

}
function editar(x) {
    $.get("ec", {"opc": 5, "idesc": x}, function (data) {
        var x = JSON.parse(data);
        $("#escuela").val(x.nombre);
        $("#facultad").val(x.idfacultad);
        $("#id").val(x.idescuela);
    });
    $("#myModal").modal('show');
}
function limpiar() {
    $("#facultad").val(0);
    $("#escuela").val("");
    $("#id").val(0);
}
function actualizar() {
    var idesc = $("#id").val();
    var escuela = $("#escuela").val();
    var idfacu = $("#facultad").val();
    bootbox.confirm({
        message: "Realmente desea modificar la escuela " + escuela + "?",
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
                $.post("ec", {"idesc": idesc, "escuela": escuela, "idfacu": idfacu, "opc": 3}, function () {
                    listarEscuela();
                    limpiar();
                    bootbox.alert({
                        message: "La escuela " + escuela + " ha sido modificado correctamente...!",
                        backdrop: true
                    });
                });
            } else {
                bootbox.alert({
                    message: "No se modificó la escuela " + escuela + "!",
                    size: 'small'
                });
                limpiar();
            }

        }
    });


    $("#myModal").modal('hide');

}
