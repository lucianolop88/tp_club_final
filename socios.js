window.onload=inicio;

var inputNombre = document.getElementById("nombreSocio");
var inputApellido = document.getElementById("apellidoSocio");
var inputDireccion = document.getElementById("direccionSocio");
var inputDNI = document.getElementById("dniSocio");
var inputCategoria = document.getElementById("categoriaSocio");
var outPutCodSocio = document.getElementById("codSocio");
var inputCodBuscado = document.getElementById("codBuscado");
var inputDNIBuscado = document.getElementById("dniBuscado");



var btnAnterior = document.getElementById("socioAnterior");
var btnGuardarSocio = document.getElementById("guardarSocio");
var btnModificar= document.getElementById("modificarSocio");
var btnBorrarSocio = document.getElementById("borrarSocio");
var btnSiguiente = document.getElementById("socioSiguiente");
var radioCodSocio = document.getElementById("radioCodSocio");
var radioDNI = document.getElementById("radioDNI");
var cuadroBusquedaCod = document.getElementById("busquedaPorCodSocio");
var cuadroBusquedaDNI = document.getElementById("busquedaPorDNI");
var btnBuscarCodSocio = document.getElementById("buscarCodSocio");
var btnBuscarDNI = document.getElementById("buscarDNI");
var cuadroErrores = document.getElementById("mensajeError");

var socio = {};
var socios = [];
 var indice = -1;


function inicio(){

    btnAnterior.addEventListener("click", socioAnterior);
    btnGuardarSocio.addEventListener("click", guardarSocio);
    btnModificar.addEventListener("click", modificarSocio);
    btnBorrarSocio.addEventListener("click", borrarSocio);
    btnSiguiente.addEventListener("click", socioSiguiente);
    radioCodSocio.addEventListener("click",cambiarABarraCodSocio);
    radioDNI.addEventListener("click",cambiarABarraDNI);
    btnBuscarCodSocio.addEventListener("click",buscarPorCodSocio);
    btnBuscarDNI.addEventListener("click",buscarPorDNI);
    globalThis.socios = JSON.parse(localStorage.getItem("listaSocios"));
    cuadroErrores.innerHTML="";
    actualizarBotones();
    cambiarABarraCodSocio();
    //  inputCategoria.innerHTML += `<option>Nueva2</option>`;
  //  inputCategoria.innerHTML += `<option>Nueva3</option>`;
   // inputCategoria.options[inputCategoria.options.length] = new Option('Text 1', 'Value1');
 //   inputCategoria.options[inputCategoria.options.length] = new Option('Text 2', 'Value2');
   // inputCategoria.options[inputCategoria.options.length] = new Option('Text 3');

};

function buscarPorCodSocio(){

    
    cuadroErrores.innerHTML="";
    var socioEncontrado = globalThis.socios.find((socio)=>{
        if (socio.codSocio==inputCodBuscado.value){
            return 1
        }
    });
    if (socioEncontrado!=null){
        indice = globalThis.socios.findIndex(function(socio) {
            
            return socio.codSocio==inputCodBuscado.value;
        
        });
      
        imprimirDatosSocio(socioEncontrado);
        actualizarBotones();
        
        
    }else{
        cuadroErrores.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </symbol>
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
        </svg>
        <div class="alert alert-warning d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:" ><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>
          Socio no encontrado
        </div>
      </div>`;
    };
};


function buscarPorDNI(){

    cuadroErrores.innerHTML="";

   
    var socioEncontrado = globalThis.socios.find((socio)=>{
        if (socio.dni==inputDNIBuscado.value){
            return 1
            
        }
    });
    if (socioEncontrado!=null){
        indice = globalThis.socios.findIndex(function(socio) {
            return socio.dni==inputDNIBuscado.value;
        });
        imprimirDatosSocio(socioEncontrado);
        actualizarBotones();
       
    }else{
        cuadroErrores.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </symbol>
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
        </svg>
        <div class="alert alert-warning d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:" ><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>
          Socio no encontrado
        </div>
      </div>`;
    };

};



function cambiarABarraCodSocio(){
    cuadroBusquedaCod.style="visibility:show;"
    cuadroBusquedaDNI.style="visibility:hidden;"
    inputDNIBuscado.value= "";
    
}

function cambiarABarraDNI(){
    cuadroBusquedaDNI.style="visibility:show;"
    cuadroBusquedaCod.style="visibility:hidden;"
    inputCodBuscado.value = "" ;
    
}

function actualizarBotones(){

    if (globalThis.socios.length==0){
        btnSiguiente.disabled=true;
        btnAnterior.disabled=true;
    }else{

        if (indice <=0 ){
            btnAnterior.disabled=true;
        }
        if (indice >= socios.length-1){
            btnSiguiente.disabled=true;
        }
        if (indice>0){
            btnAnterior.disabled=false;
        }
        if (indice<socios.length-1){
            btnSiguiente.disabled=false;
        }

    };   
    if (globalThis.socios.length==0 || indice < 0){
        btnBorrarSocio.disabled = true;
    }else{
        btnBorrarSocio.disabled = false;
    }
    
};

function socioAnterior(){

    indice--;
    globalThis.socio = globalThis.socios[indice];
    imprimirDatosSocio(globalThis.socio);
    actualizarBotones();
    cuadroErrores.innerHTML="";

};

function guardarSocio(){
    

    globalThis.socio = {};
    if (globalThis.socios.length==0){
        globalThis.socio.codSocio = 1;
    }else{
        globalThis.socio.codSocio = parseFloat(globalThis.socios[globalThis.socios.length-1].codSocio) + 1;
    }
    globalThis.socio.nombre = inputNombre.value;
    globalThis.socio.apellido = inputApellido.value;
    globalThis.socio.direccion = inputDireccion.value;
    globalThis.socio.dni = inputDNI.value;
    globalThis.socio.categoria = inputCategoria.value;
    globalThis.socio.cuotaAlDia = false;

    limpiarFormulario();

    globalThis.socios.push(globalThis.socio);

    localStorage.setItem("listaSocios", JSON.stringify(globalThis.socios));
    actualizarBotones();
    cuadroErrores.innerHTML="";

};

function modificarSocio(){

    globalThis.socio = {};
    globalThis.socio.nombre = inputNombre.value;
    globalThis.socio.apellido = inputApellido.value;
    globalThis.socio.direccion = inputDireccion.value;
    globalThis.socio.dni = inputDNI.value;
    globalThis.socio.categoria = inputCategoria.value;
    globalThis.socio.codSocio = outPutCodSocio.value;
    globalThis.socio.cuotaAlDia = socios[indice].cuotaAlDia;

    globalThis.socios.splice(indice,1,globalThis.socio);

    localStorage.setItem("listaSocios", JSON.stringify(globalThis.socios));
    actualizarBotones();
    cuadroErrores.innerHTML="";
    
};

function borrarSocio(){

    globalThis.socios.splice(indice,1);
    localStorage.setItem("listaSocios", JSON.stringify(globalThis.socios));
    
    if (globalThis.socios.length>0){
        if (indice == 0){
            indice++;
        };
        socioAnterior();
    }else{
        indice--;
        limpiarFormulario();
        actualizarBotones();
    };
    cuadroErrores.innerHTML="";
    
};

function socioSiguiente(){

    indice++;
    globalThis.socio = globalThis.socios[indice];
    imprimirDatosSocio(globalThis.socio);
    actualizarBotones();
    cuadroErrores.innerHTML="";
};

function limpiarFormulario(){

    inputNombre.value = "";
    inputApellido.value = "";
    inputDireccion.value = "";
    inputDNI.value = "";
    inputCategoria.value = "";
    inputCategoria.value = "Elige..."
    outPutCodSocio.value = "";

};

function imprimirDatosSocio(socio){
    inputNombre.value = socio.nombre;
    inputApellido.value = socio.apellido;
    inputDireccion.value = socio.direccion;
    inputDNI.value = socio.dni;
    inputCategoria.value = socio.categoria;
    outPutCodSocio.value = socio.codSocio;
};