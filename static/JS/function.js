// =============================
// function.js - POS (compatible con Flask)
// =============================

// VARIABLES GLOBALES (tuyas intactas)
var totalVenta = 0.0;
var ultimoProducto = null; // para almacenar el último producto agregado

const productos = [
  [101, "Chocolates Ferrero Rocher 24 piezas", 299.99],
  [102, "Gomitas Haribo Ositos 1kg", 189.99],
  [103, "M&M's Chocolate con Cacahuate 400g", 129.99],
  /* ... (dejé tu array completo tal cual) ... */
  [200, "Peeps Malvaviscos de Colores 10 piezas", 149.99],
];

// helper: obtener tbody compatible con tus dos posibles ids
function getTbody() {
  return document.getElementById("tblListaBody") || document.getElementById("tabla-productos");
}

// =============================
// AGREGAR FILA (mantengo tu comportamiento original)
// producto = [codigo, nombre, precio]
// =============================
function agregarFila(producto, cantidad) {
  const tabla = getTbody();
  if (!tabla) {
    console.error("No se encontró el cuerpo de la tabla (tblListaBody ó tabla-productos).");
    return;
  }

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

// =============================
// BUSCAR PRODUCTO AL PRESIONAR ENTER (usa Flask /api/producto/:codigo)
// =============================
async function buscarProducto(event) {
  if (event.key !== "Enter") return;

  const codigoRaw = document.getElementById("txtCode").value.trim();
  if (codigoRaw === "") return;

  // Si tu código permite multiplicador "2*100", podrías parsearlo aquí
  // (mantengo simple como en tu solicitud)
  const codigo = codigoRaw;

  try {
    const res = await fetch(`/api/producto/${encodeURIComponent(codigo)}`);
    if (!res.ok) {
      // si tu endpoint responde 404 o similar
      alert("❌ Producto no encontrado.");
      document.getElementById("txtCode").value = "";
      return;
    }

    const data = await res.json();

    // Tu backend responde { success: true, producto: {code_product, name_product, price_product} }
    if (!data.success || !data.producto) {
      alert("❌ Producto no encontrado.");
      document.getElementById("txtCode").value = "";
      return;
    }

    const p = data.producto;

    // Formato que tu función actual necesita
    const producto = [
      p.code_product,
      p.name_product,
      parseFloat(p.price_product)
    ];

    agregarFila(producto, 1);
    document.getElementById("txtCode").value = "";

  } catch (err) {
    console.error("Error fetch producto:", err);
    alert("Error al conectar a la API");
    document.getElementById("txtCode").value = "";
  }
}

// =============================
// TRANSFERENCIA -> agregar como producto
// =============================
function promptTransferencia() {
  let numeroTarjeta = prompt("💳 Ingresa el número de tarjeta del cliente:");
  if (numeroTarjeta === null) return;
  if (numeroTarjeta.trim() === "") {
    alert("⚠️ Número de tarjeta no válido.");
    return;
  }

  let monto = prompt("💰 Ingresa el monto de la transferencia:");
  if (monto === null) return;
  monto = parseFloat(monto);
  if (isNaN(monto) || monto <= 0) {
    alert("⚠️ Monto inválido.");
    return;
  }

  let confirmacion = confirm(
    `Agregar al ticket una transferencia de $${monto.toFixed(2)}?\n(Tarjeta: ${numeroTarjeta})`
  );

  if (confirmacion) {
    agregarTransferenciaComoProducto(numeroTarjeta, monto);
  }
}

function agregarTransferenciaComoProducto(numeroTarjeta, monto) {
  // Crear un "producto" falso como los demás y usar agregarFila para mantener todo consistente
  const productoTransfer = [
    999999, // código ficticio
    `Transferencia ${numeroTarjeta}`,
    parseFloat(monto)
  ];

  agregarFila(productoTransfer, 1);
  alert(`💳 Transferencia agregada como producto por $${monto.toFixed(2)}.`);
}

// =============================
// EVENTOS GLOBALES: ESC, TAB, P, C
// =============================
document.addEventListener("keydown", function (evento) {
  // Eliminar último producto con ESC
  if (evento.key === "Escape") {
    const tabla = getTbody();
    if (!tabla) return;
    const filas = tabla.rows.length;
    if (filas > 0) {
      const ultimaFila = tabla.rows[filas - 1];
      const monto = parseFloat(ultimaFila.cells[3].innerText);

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

  // --- Cierre de venta con tecla P ---
  if (evento.key.toUpperCase() === "P") {
    cerrarVenta();
  }

  // Mostrar modal de contraseña con tecla C
  if (evento.key.toLowerCase() === "c") {
    const modal = document.getElementById("modalClave");
    const input = document.getElementById("inputClaveModal");
    if (!modal || !input) return;
    modal.style.display = "flex";
    input.value = "";
    input.focus();

    const btnAceptar = document.getElementById("btnAceptarClave");
    const btnCancelar = document.getElementById("btnCancelarClave");

    btnAceptar.onclick = () => {
      const clave = input.value.trim();
      if (clave === "12345") {
        if (confirm("¿Seguro que deseas cancelar la venta?")) {
          const tabla = getTbody();
          if (tabla) tabla.innerHTML = "";
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

// =============================
// CERRAR VENTA (tecla P) - usa prompt, no persiste en backend (opción A)
// =============================
function cerrarVenta() {
  if (totalVenta <= 0) {
    alert("No hay productos en la venta.");
    return;
  }

  const monto = parseFloat(prompt(`Total: $${totalVenta.toFixed(2)}\nIngrese el monto recibido:`));

  if (isNaN(monto)) {
    alert("Monto inválido.");
    return;
  }

  if (monto < totalVenta) {
    const faltante = (totalVenta - monto).toFixed(2);
    alert(`❌ El monto es insuficiente. Faltan $${faltante}.`);
    return;
  }

  const cambio = (monto - totalVenta).toFixed(2);

  alert(`✔ Venta realizada.\nCambio: $${cambio}`);

  // --- Reiniciar venta ---
  const tabla = getTbody();
  if (tabla) tabla.innerHTML = "";
  totalVenta = 0;
  document.getElementById("total").innerText = "0.00";
  ultimoProducto = null;
}

// =============================
// Asociar listeners DOMContentLoaded (botones, modal, comida, servicios)
// =============================
document.addEventListener("DOMContentLoaded", function () {
  // Asociar input txtCode para buscar al presionar Enter (por si también usas onkeypress en HTML)
  const txt = document.getElementById("txtCode");
  if (txt) txt.addEventListener("keypress", buscarProducto);

  // --- Asociar botón de transferencia (btn1) ---
  const btn1 = document.getElementById("btn1");
  if (btn1) {
    btn1.addEventListener("click", promptTransferencia);
  }

  // --- ABRIR menú de comida rápida con BTN2 ---
  const btn2 = document.getElementById("btn2");
  if (btn2) {
    btn2.addEventListener("click", () => {
      const modal = document.getElementById("modalComidaRapida");
      if (modal) modal.style.display = "flex";
    });
  }

  // Botón cancelar dentro del modal de comida rápida
  const btnCancelarComida = document.getElementById("btnCancelarComida");
  if (btnCancelarComida) {
    btnCancelarComida.onclick = () => {
      const modal = document.getElementById("modalComidaRapida");
      if (modal) modal.style.display = "none";
    };
  }

  // Botón agregar comida dentro del modal
  const btnAgregarComida = document.getElementById("btnAgregarComida");
  if (btnAgregarComida) {
    btnAgregarComida.onclick = () => {
      const select = document.getElementById("selectComidaRapida");
      if (!select) return;
      const value = select.value;
      if (value === "") {
        alert("⚠️ Selecciona un producto.");
        return;
      }

      const [codigo, nombre, precio] = value.split("|");

      // Crear un array como los productos reales
      const productoComida = [
        parseInt(codigo),
        nombre,
        parseFloat(precio)
      ];

      // Agregar usando TU lógica normal
      agregarFila(productoComida, 1);

      const modal = document.getElementById("modalComidaRapida");
      if (modal) modal.style.display = "none";

      alert(`🍔 ${nombre} agregado al ticket.`);
    };
  }

  // --- BOTONES 3,4,5: servicios ---
  const btn3 = document.getElementById("btn3");
  if (btn3) {
    btn3.addEventListener("click", () => {
      agregarPagoServicio("Pago de Luz", 2001);
    });
  }

  const btn4 = document.getElementById("btn4");
  if (btn4) {
    btn4.addEventListener("click", () => {
      agregarPagoServicio("Pago de Agua", 2002);
    });
  }

  const btn5 = document.getElementById("btn5");
  if (btn5) {
    btn5.addEventListener("click", () => {
      agregarPagoServicio("Pago de Internet", 2003);
    });
  }
});

// =============================
// PAGOS DE SERVICIOS
// =============================
function agregarPagoServicio(nombreServicio, codigoServicio) {
  let numero = prompt(`🔢 Ingresa el número de servicio para ${nombreServicio}:`);
  if (numero === null) return;
  if (numero.trim() === "") {
    alert("⚠️ Número de servicio inválido.");
    return;
  }

  let monto = prompt(`💰 Ingresa el monto a pagar de ${nombreServicio}:`);
  if (monto === null) return;

  monto = parseFloat(monto);
  if (isNaN(monto) || monto <= 0) {
    alert("⚠️ Monto inválido.");
    return;
  }

  // Crear un "producto" igual que los demás
  const producto = [
    codigoServicio,                           // código
    `${nombreServicio} ${numero}`,            // descripción
    monto                                     // precio
  ];

  agregarFila(producto, 1);

  alert(`✅ ${nombreServicio} agregado al ticket por $${monto.toFixed(2)}.`);
}
