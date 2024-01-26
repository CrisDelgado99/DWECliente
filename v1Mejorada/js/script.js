'use strict'

//VARIABLES DOM____________________________________________________________________________________________
const divBotones = document.querySelector('#divBotones');
const divResultado = document.querySelector('#divResultado');

//ADDEVENTLISTENER___________________________________________________________________________________________________

divBotones.addEventListener('click', e =>{
let elemento = e.target;
let idElemento = elemento.id;

let link;

switch(idElemento){
    case 'boton1':
        obtenerDesdeTxt();
        break;
    case 'boton2':
        link = './apis/empleado.json'
        cargarJson(link);
        break;
    case 'boton3':
        link = './apis/empleados.json'
        cargarJson(link);
        break;
    case 'boton4':
        link = 'https://picsum.photos/list';
        cargarJson(link);
}
});

//FUNCIONES__________________________________________________________________________________________________________
//ObtenerDesdeTxt()---------------------------------------------------------------
function obtenerDesdeTxt(){
    const linkTxt = './apis/datos.txt';

    fetch(linkTxt)
        .then(res => res.text())
        .then(data => {
            divResultado.innerHTML = '';

            const nuevoP = document.createElement('p');
            nuevoP.innerHTML = data;
            divResultado.appendChild(nuevoP);
        })
        .catch(console.log('No se ha obtenido el archivo txt.'));
}

//CargarJson()-----------------------------------------------------------------
function cargarJson(link){
    fetch(link)
        .then(res => res.json())
        .then(data =>{
            divResultado.innerHTML = '';
            if(Array.isArray(data)){
                impArray(data);
            } else {
                impObjeto(data);
            }
            });

}
//impArray()------------------------------------------------------------------------
function impArray(data){
    data.forEach(objeto => {
        impObjeto(objeto);
    });
}
//impObjeto()--------------------------------------------------------------------------
function impObjeto(data){
    let nuevoElemento;
    let mensaje;
    const divObjeto = document.createElement('div');
    divResultado.appendChild(divObjeto);

    Object.entries(data).forEach(([key, value])=>{
        if(key.trim() === 'author_url'){
            mensaje = 'Ver imagen.';
            nuevoElemento = document.createElement('a');
            nuevoElemento.href = value;
            nuevoElemento.target = '_blank';

        } else {
            mensaje = key + ': ' + value;
            nuevoElemento = document.createElement('p');
        }
        nuevoElemento.innerHTML = mensaje;
        divObjeto.appendChild(nuevoElemento);
    });
}


