function insertarCotizacion(){
    var d = new Date();
    var cotizacionId = d.getTime().toString();
    var cotizacionDate= d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
    var cotizacionCliente= $('#cotizacionCliente').val();
    var cotizacionEstado= "Pendiente";
    var cotizacionDescripcion = $("#cotizacionDescripcion").val();

    var data = {
        "cotizacion_id": cotizacionId,
        "cotizacion_date": cotizacionDate,
        "cotizacion_cliente": cotizacionCliente,
        "cotizacion_estado": cotizacionEstado,
        "cotizacion_descripcion": cotizacionDescripcion
    }

    var URL = 'https://irkbbp63b6.execute-api.us-east-1.amazonaws.com/test-stage/crearcotizacion';

    $.ajax({
        type: 'POST',
        crossDomain: true,
        url: URL,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (){
        },
        error: function () {
        showAlert("#client-error-alert")      
        }
    });
    alert("Cotización ingresada exitosamente!");
}

function popularCotizacion(){
    var URL = 'https://irkbbp63b6.execute-api.us-east-1.amazonaws.com/test-stage/obtenercotizaciones';
       //event.preventDefault();
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: URL,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            data.Items.forEach(function(items){
                $("#cotizaciones").append('<tr><td>'+Object.values(items.cotizacion_date)+'</td><td>'+Object.values(items.cotizacion_id)+'</td><td>'+Object.values(items.cotizacion_cliente)+'</td><td>'+Object.values(items.cotizacion_estado)+'</td></tr>')
            });
        },
        error: function () {
            // show an error message
        }
    });
}

function insertarCliente(){
    var d = new Date();
    var clienteId = d.getTime().toString();
    var clienteNombre= $('#clienteNombre').val();
    var clienteTelefono= $('#clienteTelefono').val();
    var clienteEmail= $('#clienteEmail').val();
    var clienteEncargado = $("#clienteEncargado").val();

    var data = {
        "cliente_id": clienteId,
        "cliente_nombre": clienteNombre,
        "cliente_telefono": clienteTelefono,
        "cliente_email": clienteEmail,
        "cliente_encargado": clienteEncargado
    }

    var URL = 'https://irkbbp63b6.execute-api.us-east-1.amazonaws.com/test-stage/crearcliente';

    $.ajax({
        type: 'POST',
        crossDomain: true,
        url: URL,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (){
        },
        error: function () {
        showAlert("#client-error-alert")      
        }
    });
    alert("Cliente ingresada exitosamente!");
}

function popularClientes(){
    var URL = 'https://irkbbp63b6.execute-api.us-east-1.amazonaws.com/test-stage/obtenerclientes';
       //event.preventDefault();
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: URL,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            data.Items.forEach(function(items){
                $("#clientes").append('<tr><td>'+Object.values(items.cliente_nombre)+'</td><td>'+Object.values(items.cliente_email)+'</td><td>'+Object.values(items.cliente_telefono)+'</td><td>'+Object.values(items.cliente_encargado)+'</td><td id ="opciones"><a href="#" class="btn btn-success btn-sm active" role="button" aria-pressed="true"><i class="fas fa-search"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="editarCliente.html#'+Object.values(items.cliente_id)+'" class="btn btn-primary btn-sm active" role="button" aria-pressed="true"><i class="far fa-edit"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" class="btn btn-danger btn-sm active" role="button" aria-pressed="true"><i class="far fa-trash-alt"></i></a></td></tr>')
            });
        },
        error: function () {
            // show an error message
        }
    });
}

function getCliente(){
    var URL = 'https://irkbbp63b6.execute-api.us-east-1.amazonaws.com/test-stage/obtenercliente';
    
    var clienteId = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
    var data = {
        "cliente_id": clienteId.toString()
    }

    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: URL,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (){
            data.Items.forEach(function(items){
                $("#clienteNombre").append('<input name="clienteNombre" type="text" class="form-control" placeholder="'+Object.values(items.cliente_nombre)+'" aria-required="true" aria-invalid="false"></input>')
                $("#clienteTelefono").append('<input name="clienteNombre" type="text" class="form-control" placeholder="'+Object.values(items.cliente_telefono)+'" aria-required="true" aria-invalid="false"></input>')
                $("#clienteEmail").append('<input name="clienteNombre" type="text" class="form-control" placeholder="'+Object.values(items.cliente_email)+'" aria-required="true" aria-invalid="false"></input>')
                $("#clienteEncargado").append('<input name="clienteNombre" type="text" class="form-control" placeholder="'+Object.values(items.cliente_encargado)+'" aria-required="true" aria-invalid="false"></input>')
            });
        },
        error: function () { 
        }
    });
}

function cotizacionesPendientes(){
    var URL = 'https://irkbbp63b6.execute-api.us-east-1.amazonaws.com/test-stage/obtenercotizacionespendientes';

    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: URL,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#contador-cotizaciones-pendientes").append('<h2>'+data+'</h2><span>Cotizaciones pendientes</span>')
        },
        error: function () {
            // show an error message
        }
    });

}

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }