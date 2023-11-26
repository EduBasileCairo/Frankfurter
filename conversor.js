//Todo el script dentro de "window.onload" a fin de que se cargue el script cuando esté armado el árbol DOM
window.onload = function () {
  //"select": contendrá una lista de todos los elementos "moneda"
  const select = document.querySelectorAll(".moneda");
  //"number": contendrá el elemento number
  const number = document.getElementById("number");
  //"output": contendrá el resultado de la busqueda de la moneda y la conversión realizada
  const output = document.getElementById("output");
  //"fetch": con esta función se solicitará a la URL la información deseada
  fetch(`https://api.frankfurter.app/currencies`)
    //Función flecha que toma la respuesta como parámetro y devuelve la promesa de convertir el cuerpo de la respuesta
    .then((response) => response.json())
    //Luego el .then toma el resultado de la promesa y los pasa como argumento a la función display.
    .then((data) => {
      display(data);
    });
  /*la función toma a "data", y la convierte en un array de arrays (entries), luego utiliza un bucle para agregar opciones al contenido HTML de dos elementos en el array select. Cada opción representa una propiedad y su valor.*/
  function display(data) {
    const entries = Object.entries(data);
    for (var i = 0; i < entries.length; i++) {
      select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]} : ${entries[i][1]}</option>`;
      select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]} : ${entries[i][1]}</option>`;
    }
  }
/*la función busca las monedas seleccionadas y su valor a convertir, verifica que las monedas sean diferentes, si lo son, llama a la función convert con esos parámetros. Si las monedas son iguales, muestra una alerta al usuario.*/
  function updatevalue() {
    let moneda1 = select[0].value;
    let moneda2 = select[1].value;

    let value = number.value;

    if (moneda1 !== moneda2) {
      convert(moneda1, moneda2, value);
    } else {
      alert("Debe elegir monedas diferentes");
    }
  }
/*la función "convert" realiza una solicitud a una API de tasas de cambio, obtiene las tasas convertidas y actualiza con el resultado de la conversión. */
  function convert(moneda1, moneda2, value) {
    const host = "api.frankfurter.app";

    fetch(
      `https://${host}/latest?amount=${value}&from=${moneda1}&to=${moneda2}`
    )
      .then((response) => response.json())
      .then((val) => {
        console.log(Object.values(val.rates)[0]);
        output.value = Object.values(val.rates)[0];
      });
  }

  /* Ante un cambio en el "select", debería ejecutar la  la función updatevalue y recalcular, pero no me funciona.*/
  select.forEach((dropdown) => {
    dropdown.addEventListener("change", updatevalue);
  });
};
