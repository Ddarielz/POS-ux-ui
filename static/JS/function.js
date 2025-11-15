var totalVenta = 0.0;
var ultimoProducto = null;

// =============================
// VARIABLES GLOBALES
// =============================
let ultimaBusqueda = "";

// =============================
// BUSCAR PRODUCTO DESDE FLASK
// =============================
async function buscarProducto(event) {
    if (event.key !== "Enter") return;

    const input = document.getElementById("txtCode");
    const codigo = input.value.trim();
    ultimaBusqueda = codigo;

    if (!codigo) return;

    try {
        const response = await fetch(`/api/producto/${codigo}`);
        const data = await response.json();

        if (data.success) {
            const p = data.producto;
            agregarFila(p.code_product, p.name_product, parseFloat(p.price_product));
        } else {
            alert("Producto no encontrado");
        }
    } catch (error) {
        alert("Error al conectar a la API");
    }

    input.value = "";
}

// =============================
// AGREGAR PRODUCTO A TABLA
// =============================
function agregarFila(codigo, nombre, precio) {
    const cuerpo = document.getElementById("tabla-productos");

    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>1</td>
        <td>${nombre}</td>
        <td>${precio.toFixed(2)}</td>
        <td>${precio.toFixed(2)}</td>
    `;

    cuerpo.appendChild(fila);
    actualizarTotal();
}

// =============================
// ACTUALIZAR TOTAL
// =============================
function actualizarTotal() {
    const filas = document.querySelectorAll("#tabla-productos tr");
    let total = 0;

    filas.forEach(f => {
        total += parseFloat(f.children[3].textContent);
    });

    document.getElementById("total").textContent = total.toFixed(2);
}

// =============================
// EVENTOS DE BOTONES Y MODAL
// =============================
document.addEventListener("DOMContentLoaded", () => {

    // ---- AGREGADO IMPORTANTE ----
    document.getElementById("txtCode").addEventListener("keypress", buscarProducto);
    // -----------------------------

    // BTN1 = Transferencia
    document.getElementById("btn1").onclick = () => {
        let ref = prompt("Referencia:");
        if (ref)
            agregarFila(ref, "TRANSFERENCIA", 0);
    };

    // BTN2 = abrir modal comida rápida
    document.getElementById("btn2").onclick = () => {
        document.getElementById("modalComidaRapida").style.display = "flex";
    };

    // BTN3 = Luz
    document.getElementById("btn3").onclick = () =>
        agregarFila("SLZ", "Pago de Luz", 300);

    // BTN4 = Agua
    document.getElementById("btn4").onclick = () =>
        agregarFila("SAG", "Pago de Agua", 200);

    // BTN5 = Internet
    document.getElementById("btn5").onclick = () =>
        agregarFila("INT", "Pago de Internet", 450);

    // =============================
    // MODAL — Comida Rápida
    // =============================
    document.getElementById("btnCancelarComida").onclick = () => {
        document.getElementById("modalComidaRapida").style.display = "none";
    };

    document.getElementById("btnAgregarComida").onclick = () => {
        let opcion = document.getElementById("selectComidaRapida").value;

        if (!opcion) {
            alert("Selecciona un producto");
            return;
        }

        const [codigo, nombre, precio] = opcion.split("|");
        agregarFila(codigo, nombre, parseFloat(precio));

        document.getElementById("modalComidaRapida").style.display = "none";
    };
});

// =============================
// TECLA P = Cobro
// =============================
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "p") {
        let total = parseFloat(document.getElementById("total").textContent);
        let pago = prompt(`Total: $${total}\nMonto recibido:`);

        pago = parseFloat(pago);
        if (pago < total) return alert("Monto insuficiente");

        alert("Cambio: $" + (pago - total).toFixed(2));

        document.getElementById("tabla-productos").innerHTML = "";
        actualizarTotal();
    }
});

// =============================
// TECLA TAB = repetir código
// =============================
document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
        e.preventDefault();
        if (ultimaBusqueda)
            document.getElementById("txtCode").value = ultimaBusqueda;
    }
});

// =============================
// TECLA ESC = borrar venta
// =============================
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.getElementById("tabla-productos").innerHTML = "";
        actualizarTotal();
    }
});
