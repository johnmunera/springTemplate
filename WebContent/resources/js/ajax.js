// Documento JavaScript
// Esta funci�n cargar� las paginas


$(document).ready(function() {
        //datepicker
        $('.datepicker').datepicker({
                dateFormat: "yy-mm-dd",
                changeMonth:true,
                changeYear:true,
            onClose: function (dateText, inst) {
                $(this).attr("disabled", false);
            },
            beforeShow: function (input, inst) {
                $(this).attr("disabled", true);
            }
        });
        
	 $.datepicker.regional['es'] = {clearText: 'Effacer', clearStatus: '',
			    closeText: 'Cerrar', closeStatus: 'Cerrar calendario',
			    prevText: '<', prevStatus: 'Mes anterior',
			    nextText: '>', nextStatus: 'Proximo mes',
			    currentText: 'Calendario', currentStatus: 'Mes actual',
			    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
			    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
			    'Jul','Aog','Sep','Oct','Nov','Dic'],
			    monthStatus: 'Mes', yearStatus: 'Año',
			    weekHeader: 'Sm', weekStatus: '',
			    dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
			    dayNamesShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
			    dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
			    dayStatus: 'Utiliza domingo como primer día de la semana', dateStatus: 'Escoja  dd, MM yyyy',
			    dateFormat: 'dd/mm/yy', firstDay: 0, 
			    initStatus: 'Escoja una fecha', isRTL: false};
	 
        $.datepicker.setDefaults($.datepicker.regional['es']);
});
function llamarasincrono (url, id_contenedor)
{
	var pagina_requerida = false;
//---------------------------------------------------------------------------------------
	if (window.XMLHttpRequest)
	{
		// Si es Mozilla, Safari etc
		pagina_requerida = new XMLHttpRequest ();
	}
	else if (window.ActiveXObject)
	{
		// pero si es IE
		try
		{
			pagina_requerida = new ActiveXObject ("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			// en caso que sea una versi�n antigua
			try
			{
				pagina_requerida = new ActiveXObject ("Microsoft.XMLHTTP");
			}
			catch (e)
			{
			}
		}
	}
	else
		return false;
		pagina_requerida.onreadystatechange = function ()
		{
			// funci�n de respuesta
			cargarpagina (pagina_requerida, id_contenedor);
		}
		pagina_requerida.open ('GET', url, true);
		// asignamos los m�todos open y send
		pagina_requerida.send (null);
}
// todo es correcto y ha llegado el momento de poner la informaci�n requerida
// en su sitio en la pagina xhtml
function cargarpagina (pagina_requerida, id_contenedor)
{
	if (pagina_requerida.readyState == 4 && (pagina_requerida.status == 200 || window.location.href.indexOf ("http") == - 1))
	document.getElementById (id_contenedor).innerHTML = pagina_requerida.responseText;
}
//------------FUNCION PARA CREAR UN NUEVO AJAX----------------------------------
var contdiv=0;
function nuevoajax(url,divPadre,parametros)
{
	contdiv++;
    url=url+"?j="+contdiv+parametros;
	// Div donde se agregara la nueva linea
	var content = document.getElementById(divPadre);
	content.style.display="";
	// Se crea un nuevo "DIV" que se agregara a content
	var divIdName = 'DivHija' + contdiv;
	var newDiv = document.createElement('div');
	//Ponemos atributos a la div
	newDiv.setAttribute('id', divIdName);
	content.appendChild(newDiv);
	llamarasincrono(url,divIdName,parametros);
}
//##############################################################################
//----------FUNCIONES ADICIONALES DE JAVASCRIPT---------------------------------
//##############################################################################
//-----------FUNCION PARA MOSTRAR LAS TABLAS INVISIBLES-------------------------
function mostrar(nombre)
{
	obj = document.getElementById(nombre);
	obj.style.display='';
}
//--------METODO PARA QUITAR LAS DIV--------------------------------------------
function quitardivs(nombrediv)
{
    if(document.getElementById(nombrediv))
    {
    	obj=document.getElementById(nombrediv);
    	obj.innerHTML="";
    	obj.style.display="none";
    }
	//alert(obj)
	//var padre=obj.parentNode;
	//padre.removeChild(obj);
}
//--------METODO PARA QUITAR LAS DIV--------------------------------------------
function limpiardiv(nombrediv)
{
    if(document.getElementById(nombrediv))
    {
    	obj=document.getElementById(nombrediv);
    	obj.innerHTML="";
    }
	//alert(obj)
	//var padre=obj.parentNode;
	//padre.removeChild(obj);
}
//----------FUNCION PARA OCULTAR OBJETOS----------------------------------------
function ocultar(Nombre)
{
	obj=document.getElementById(Nombre);
	obj.style.display="none";
}


function enviarFormulario(opcion)
{
    //agrego el elemento opcion al formulario
    $("#opcion").val(opcion);
    var url = "/CinePHP/control/procesos.php";

    validar(opcion);
     
    if($("#ppal").valid()){
    $.ajax({
           type: "POST",
           url: url,
           data: $("#ppal").serialize(), 
           success: function(data)
           {
            try {
                 var error = jQuery.parseJSON(data);
                 alert(error.error);
            }catch(err) {
                 console.log(err);
                 document.getElementById ("contenedor").innerHTML = data;
            }

           },
           error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
              }

         });
     }
     }        
function removeInput(form,nombre) {
    var form = document.forms[form];
    var input = document.getElementById(nombre);
    form.removeChild(input);
}
function addInput(f,nombre,valor) {
  //agrego el elemento opcion al formulario
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = nombre;
    input.id = nombre;
    input.value = valor;
    var form = document.forms[f];
    form.appendChild(input);
}

function adicionarDetallePelicula(codpelicula) {
    $("#codpelicula").val(codpelicula);
    enviarFormulario('30');
}

function modificarDetallePelicula(coddetalle) {
    $("#coddetalle").val(coddetalle);
    enviarFormulario('26');
}

function modificarActorPelicula(codpelicula,codactor) {
    $("#codactor").val(codactor);
    $("#codpelicula").val(codpelicula);
    enviarFormulario('31');
}

function borrarDetallePelicula(coddetalle) {
    $("#coddetalle").val(coddetalle);
    enviarFormulario('29');
}

function borrarActorPelicula(codpelicula,codactor) {
    $("#codactor").val(codactor);
    $("#codpelicula").val(codpelicula);
    enviarFormulario('33');
}

function validar(opcion){
     var validator = $( "#ppal" ).validate();
     if(parseInt(opcion)===1){
        validator.resetForm();
        validator.settings.rules = requeridos1;
     }else if(parseInt(opcion)>=2 & parseInt(opcion)<=4){
        validator.resetForm();
        validator.settings.rules = requeridos2;
    }else if(parseInt(opcion)===6){
        validator.resetForm();
        validator.settings.rules = requeridos6;
    }else if(parseInt(opcion)>=7 & parseInt(opcion)<=9){
        validator.resetForm();
        validator.settings.rules = requeridos7; 
    }else if(parseInt(opcion)===11){
        validator.resetForm();
        validator.settings.rules = requeridos11;
    }else if(parseInt(opcion)>=12 & parseInt(opcion)<=14){
        validator.resetForm();
        validator.settings.rules = requeridos12;  
    }else if(parseInt(opcion)===16){
        validator.resetForm();
        validator.settings.rules = requeridos16;
    }else if(parseInt(opcion)>=17 & parseInt(opcion)<=19){
        validator.resetForm();
        validator.settings.rules = requeridos17;    
    }else if(parseInt(opcion)=== 21){
        validator.resetForm();
        validator.settings.rules = requeridos21;
    }else if(parseInt(opcion)>=22 & parseInt(opcion)<=24){
        validator.resetForm();
        validator.settings.rules = requeridos22;    
    }else if(parseInt(opcion)=== 26){
        validator.resetForm();
        validator.settings.rules = requeridos21;
    }else if(parseInt(opcion)>=27 & parseInt(opcion)<=28){
        validator.resetForm();
        validator.settings.rules = requeridos22;   
    }else if(parseInt(opcion)===30){
        validator.resetForm();
        validator.settings.rules = requeridos30;     
    }else if(parseInt(opcion)>=31 & parseInt(opcion)<=34){
        validator.resetForm();
        validator.settings.rules = requeridos31;    
     }else{
       validator.resetForm();
        validator.settings.rules = {};
     }
}

var requeridos1 = {
     codactor: {
        required: true,
        number: true
     }  
};

var requeridos2 = {
    codactor: {
       required: true,
       number: true
    },  
    nombre: {
        required: true,
        minlength: 3
    } 
};
var requeridos6 = {
     codgenero: {
        required: true,
        number: true
     }  
};

var requeridos7 = {
    codgenero: {
       required: true,
       number: true
    },  
    nombre: {
        required: true,
        minlength: 3
    } 
};
var requeridos11     = {
     codclasificacion: {
        required: true,
        number: true
     }  
};

var requeridos12 = {
    codclasificacion: {
       required: true,
       number: true
    },  
    nombre: {
        required: true,
        minlength: 3
    } 
};

var requeridos16     = {
     codubicacion: {
        required: true,
        number: true
     }  
};

var requeridos17 = {
    codubicacion: {
       required: true,
       number: true
    },  
    nombre: {
        required: true,
        minlength: 3 
    },
    estado: {
        required: true,
        minlength: 3
    } 
};
var requeridos21     = {
     codpelicula: {
        required: true,
        number: true
     }  
};

var requeridos22 = {
    codpelicula: {
       required: true,
       number: true
    },nombre: {
        required: true,
        minlength: 3 
    }, duracion: {
        required: true,
        minlength: 8 
    }, fechapublicacion: {
        required: true,
        minlength: 10 
    },codubicacion: {
        required: true
    },codgenero: {
        required: true
    },codclasificacion: {
        required: true
    },codactor: {
        required: true
    },estado: {
        required: true,
        minlength: 3
    } 
};
 var requeridos26     = {
     codpelicula: {
        required: true,
        number: true
     },
     coddetalle: {
        required: true,
        number: true
     } 
     
};

var requeridos27 = {
    codpelicula: {
       required: true,
       number: true
    },coddetalle: {
        required: true,
        minlength: 1 
    }, codgenero: {
        required: true,
        minlength: 1 
    }, codclasificacion: {
        required: true,
        minlength: 1 
    },estado: {
        required: true,
        minlength: 3
    }    
};
var requeridos30     = {
     codpelicula: {
        required: true,
        number: true
     }   
};
var requeridos31     = {
     codpelicula: {
        required: true,
        number: true
     },codactor: {
        required: true,
        number: true
     }    
};
