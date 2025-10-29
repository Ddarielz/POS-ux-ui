var totalVenta = 0.0;
var ultimoProducto = null; // para almacenar el último producto agregado

const productos = [
  [101, "Chocolates Ferrero Rocher 24 piezas", 299.99],
  [102, "Gomitas Haribo Ositos 1kg", 189.99],
  [103, "M&M's Chocolate con Cacahuate 400g", 129.99],
  [104, "Paletas Chupa Chups Surtidas 50 piezas", 249.99],
  [105, "Snickers Barra de Chocolate 52g", 119.99],
  [106, "Kit Kat Wafer con Chocolate 45g", 118.99],
  [107, "Skittles Frutas Tropicales 200g", 149.99],
  [108, "Twix Galleta con Caramelo 50g", 119.99],
  [109, "Milky Way Barra de Chocolate 52g", 119.99],
  [110, "Hershey's Barra de Chocolate con Leche 43g", 122.99],
  [111, "Reese's Mantequilla de Cacahuate 42g", 124.99],
  [112, "Toblerone Chocolate con Miel 100g", 169.99],
  [113, "Kinder Bueno Barras de Chocolate 43g", 129.99],
  [114, "Lindt Lindor Trufas Surtidas 200g", 199.99],
  [115, "Godiva Bombones de Chocolate 250g", 449.99],
  [116, "Nutella Go Avellanas con Chocolate 52g", 134.99],
  [117, "Mentos Menta Fresca Rollo 38g", 112.99],
  [118, "Tic Tac Menta 16g", 114.99],
  [119, "Trident Chicles sin Azúcar 14 piezas", 119.99],
  [120, "Halls Mentol Extra Fuerte 28g", 116.99],
  [121, "Vero Mango Paletas Picosas 40 piezas", 189.99],
  [122, "Mazapán de la Rosa 30 piezas", 179.99],
  [123, "Pulparindo Tamarindo Picante 20 piezas", 159.99],
  [124, "Lucas Muecas Chamoy 10 piezas", 149.99],
  [125, "Pelon Pelo Rico Tamarindo 12 piezas", 169.99],
  [126, "Duvalin Crema de Avellana 18 piezas", 189.99],
  [127, "Glorias Quemadas Cajeta 20 piezas", 229.99],
  [128, "Rockaleta Lollipop Picante 24 piezas", 199.99],
  [129, "Skwinkles Rellenos Sandia 12 piezas", 154.99],
  [130, "Bubbaloo Chicle con Líquido 50 piezas", 179.99],
  [131, "Motitas Chocolate Aereo 110g", 139.99],
  [132, "Ricolino Bubu Lubu 25 piezas", 249.99],
  [133, "Carlos V Chocolate 20 piezas", 229.99],
  [134, "Milky Way Simply Caramel 35 piezas", 399.99],
  [135, "Panditas Bimbo Gomitas 100g", 129.99],
  [136, "Lunetas Chocolate 45g", 117.99],
  [137, "Chocoretas Mini Chocolate 30 piezas", 219.99],
  [138, "Tutsi Pop Paleta con Chicle 20 piezas", 189.99],
  [139, "Pico Diana Sal y Limón 20 piezas", 169.99],
  [140, "Salsagheti Tamarindo Picante 12 piezas", 159.99],
  [141, "Gansito Marinela 8 piezas", 199.99],
  [142, "Principe Galletas de Chocolate 12 piezas", 189.99],
  [143, "Pingüinos Marinela 8 piezas", 199.99],
  [144, "Rocío Chocolate con Malvavisco 10 piezas", 179.99],
  [145, "Submarinos Galletas Chocolate 6 piezas", 159.99],
  [146, "Barritas Nutri-Grain Fresa 6 piezas", 189.99],
  [147, "Nature Valley Granola Avena 12 barras", 249.99],
  [148, "Quaker Chewy Chocolate Chip 8 barras", 199.99],
  [149, "Kranky Chocolate Crujiente 27g", 116.99],
  [150, "Crunch Nestlé Chocolate con Arroz 40g", 119.99],
  [151, "Aero Chocolate Aerado 36g", 118.99],
  [152, "Rolo Caramelo con Chocolate 52g", 124.99],
  [153, "Smarties Chocolate con Gragea 45g", 127.99],
  [154, "Maltesers Chocolate Maltado 100g", 159.99],
  [155, "Bounty Coco con Chocolate 57g", 124.99],
  [156, "Twizzlers Regaliz Fresa 198g", 169.99],
  [157, "Jolly Rancher Caramelos Duros 198g", 179.99],
  [158, "Warheads Dulces Súper Ácidos 28g", 124.99],
  [159, "Sour Patch Kids Dulces Ácidos 141g", 149.99],
  [160, "Trolli Gusanos Ácidos 100g", 144.99],
  [161, "Starburst Caramelos Masticables 191g", 159.99],
  [162, "Laffy Taffy Caramelo Estirado 145g", 154.99],
  [163, "Airheads Dulce Masticable 16g", 109.99],
  [164, "Now and Later Caramelos 26g", 114.99],
  [165, "Swedish Fish Gomitas de Pescado 141g", 149.99],
  [166, "Mike and Ike Dulces de Frutas 141g", 149.99],
  [167, "Hot Tamales Canela Picante 141g", 149.99],
  [168, "Dots Gomitas de Frutas 184g", 154.99],
  [169, "Jujyfruits Gomitas Surtidas 184g", 154.99],
  [170, "Nerds Rope Gomita con Nerds 26g", 119.99],
  [171, "Nerds Rainbow Dulces Crujientes 142g", 159.99],
  [172, "SweeTarts Dulces Agridulces 141g", 149.99],
  [173, "Pixy Stix Polvo Azucarado 12 tubos", 134.99],
  [174, "Fun Dip Polvo con Paleta 42g", 124.99],
  [175, "Pop Rocks Dulces Explosivos 9.5g", 114.99],
  [176, "Ring Pop Paleta con Anillo 14g", 119.99],
  [177, "Push Pop Paleta Deslizable 15g", 122.99],
  [178, "Baby Ruth Cacahuate y Chocolate 60g", 124.99],
  [179, "Butterfinger Chocolate Crujiente 54g", 124.99],
  [180, "100 Grand Caramelo y Chocolate 42.5g", 119.99],
  [181, "Payday Cacahuate y Caramelo 52g", 122.99],
  [182, "Almond Joy Coco y Almendra 45g", 122.99],
  [183, "Mounds Coco con Chocolate 49g", 122.99],
  [184, "York Peppermint Menta 39g", 121.99],
  [185, "Junior Mints Menta con Chocolate 106g", 144.99],
  [186, "Tootsie Roll Chocolate Masticable 64g", 134.99],
  [187, "Charleston Chew Vainilla Nougat 53g", 124.99],
  [188, "Whoppers Maltadas con Chocolate 141g", 154.99],
  [189, "Good & Plenty Regaliz 170g", 154.99],
  [190, "Red Vines Regaliz Rojo 141g", 149.99],
  [191, "Cow Tales Caramelo con Crema 28g", 116.99],
  [192, "Bit-O-Honey Miel con Almendra 113g", 144.99],
  [193, "Mary Jane Cacahuate y Melaza 113g", 144.99],
  [194, "Necco Wafers Obleas Surtidas 57g", 129.99],
  [195, "Atomic Fireball Canela Picante 150g", 149.99],
  [196, "Lemonheads Limón Ácido 142g", 149.99],
  [197, "Jawbreakers Bolas Duras Gigantes 5 piezas", 139.99],
  [198, "Candy Corn Maíz de Caramelo 283g", 169.99],
  [199, "Circus Peanuts Cacahuates Dulces 170g", 154.99],
  [200, "Peeps Malvaviscos de Colores 10 piezas", 149.99],
];
// Declaración de funciones
function agregarFila(producto, cantidad) {
  var tabla = document.getElementById("tblListaBody");
  var filas = tabla.rows.length;

  // Revisar si el último producto es el mismo de la última fila
  if (filas > 0) {
    var ultimaFila = tabla.rows[filas - 1];
    var nombreProducto = ultimaFila.cells[1].innerText;

    if (nombreProducto === producto[1]) {
      // Si es el mismo producto, actualizar cantidad y total
      var cantidadActual = parseInt(ultimaFila.cells[0].innerText, 10);
      var nuevaCantidad = cantidadActual + cantidad;
      ultimaFila.cells[0].innerText = nuevaCantidad;
      ultimaFila.cells[3].innerText = (producto[2] * nuevaCantidad).toFixed(2);

      // Actualizar totalVenta
      totalVenta += producto[2] * cantidad;
      document.getElementById("total").innerText = totalVenta.toFixed(2);

      // Guardar último producto
      ultimoProducto = { producto, cantidad };
      return;
    }
  }

  // Si no existe en la última fila, insertar nueva
  var renglon = tabla.insertRow();
  var celda1 = renglon.insertCell(0);
  var celda2 = renglon.insertCell(1);
  var celda3 = renglon.insertCell(2);
  var celda4 = renglon.insertCell(3);

  celda1.setAttribute("style", "text-align: center;");
  celda1.innerHTML = cantidad;

  celda2.innerHTML = producto[1];
  celda2.setAttribute("style", "text-align: center;");

  celda3.innerHTML = producto[2].toFixed(2);
  celda3.setAttribute("style", "text-align: right;");

  celda4.innerHTML = (producto[2] * cantidad).toFixed(2);
  celda4.setAttribute("style", "text-align: right;");

  // Sumar al total
  totalVenta += producto[2] * cantidad;
  document.getElementById("total").innerText = totalVenta.toFixed(2);

  // Guardar último producto
  ultimoProducto = { producto, cantidad };
}

// Buscar producto al presionar ENTER
function buscarProducto(evento) {
  if (evento.key === "Enter") {
    var codigo = document.getElementById("txtCode").value.trim();
    if (codigo.length > 0) {
      var cantidad = 1;
      if (codigo.includes("*")) {
        cantidad = parseInt(codigo.split("*")[0], 10);
        codigo = codigo.split("*")[1];
      }

      for (let i = 0; i < productos.length; i++) {
        if (productos[i][0] == codigo) {
          agregarFila(productos[i], cantidad);
          document.getElementById("txtCode").value = "";
          break;
        }
      }
    }
  }
}

// --- Prompt de transferencia ---
function promptTransferencia() {
  let numeroTarjeta = prompt("💳 Ingresa el número de tarjeta del cliente:");
  if (numeroTarjeta === null) return;
  if (numeroTarjeta.trim() === "") {
    alert("⚠️ Número de tarjeta no válido.");
    return;
  }

  let monto = prompt("💰 Ingresa el monto a transferir:");
  if (monto === null) return;
  monto = parseFloat(monto);
  if (isNaN(monto) || monto <= 0) {
    alert("⚠️ Monto inválido.");
    return;
  }

  let confirmacion = confirm(
    `Confirmar transferencia de $${monto.toFixed(2)} a la tarjeta ${numeroTarjeta}?`
  );
  if (confirmacion) {
    transferir(numeroTarjeta, monto);
  }
}

// --- Transferir ---
function transferir(numeroTarjeta, monto) {
  alert(
    `✅ Transferencia de $${monto.toFixed(2)} a la tarjeta ${numeroTarjeta} realizada con éxito.`
  );
  cierreVenta(monto);
}

// --- Cierre de venta ---
function cierreVenta(pago) {
  if (pago >= totalVenta) {
    let cambio = pago - totalVenta;
    alert(
      `✅ Venta finalizada.\nTotal: $${totalVenta.toFixed(2)}\nPago: $${pago.toFixed(
        2
      )}\nCambio: $${cambio.toFixed(2)}`
    );

    document.getElementById("tblListaBody").innerHTML = "";
    totalVenta = 0.0;
    document.getElementById("total").innerText = totalVenta.toFixed(2);
    ultimoProducto = null;
  } else {
    alert("⚠️ Pago insuficiente.");
  }
}

// --- Eventos globales ---
document.addEventListener("keydown", function (evento) {
  // Eliminar último producto con ESC
  if (evento.key === "Escape") {
    var tabla = document.getElementById("tblListaBody");
    var filas = tabla.rows.length;
    if (filas > 0) {
      var ultimaFila = tabla.rows[filas - 1];
      var monto = parseFloat(ultimaFila.cells[3].innerText);

      totalVenta -= monto;
      if (totalVenta < 0) totalVenta = 0;
      document.getElementById("total").innerText = totalVenta.toFixed(2);
      tabla.deleteRow(filas - 1);
    }
  }

  // Repetir último producto con TAB
  if (evento.key === "Tab") {
    evento.preventDefault();
    if (ultimoProducto !== null) {
      agregarFila(ultimoProducto.producto, ultimoProducto.cantidad);
    }
  }

  // Mostrar modal de contraseña con tecla C
  if (evento.key.toLowerCase() === "c") {
    const modal = document.getElementById("modalClave");
    const input = document.getElementById("inputClaveModal");
    modal.style.display = "flex";
    input.value = "";
    input.focus();

    const btnAceptar = document.getElementById("btnAceptarClave");
    const btnCancelar = document.getElementById("btnCancelarClave");

    btnAceptar.onclick = () => {
      const clave = input.value.trim();
      if (clave === "12345") {
        if (confirm("¿Seguro que deseas cancelar la venta?")) {
          document.getElementById("tblListaBody").innerHTML = "";
          totalVenta = 0.0;
          document.getElementById("total").innerText = totalVenta.toFixed(2);
          ultimoProducto = null;
          alert("✅ Venta cancelada correctamente.");
        }
      } else {
        alert("❌ Clave incorrecta.");
      }
      modal.style.display = "none";
    };

    btnCancelar.onclick = () => {
      modal.style.display = "none";
    };
  }
});

// --- Asociar botón de transferencia ---
document.addEventListener("DOMContentLoaded", function () {
  const btn1 = document.getElementById("btn1");
  if (btn1) {
    btn1.addEventListener("click", promptTransferencia);
  }
});