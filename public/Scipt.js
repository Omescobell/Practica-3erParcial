const API_URL = "http://localhost:3000/api/alumnos";

const form = document.getElementById("alumnoForm");
const tabla = document.querySelector("#tablaAlumnos tbody");

// Cargar alumnos al iniciar
document.addEventListener("DOMContentLoaded", obtenerAlumnos);


/* =====================================================
    CREAR ALUMNO (POST)
===================================================== */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const edad = document.getElementById("edad").value;
  const curso = document.getElementById("curso").value;

  if (!nombre || !edad) return alert("Nombre y edad son obligatorios.");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, edad, curso })
    });

    if (res.ok) {
      alert("Alumno agregado");
      form.reset();
      obtenerAlumnos();
    } else {
      alert("Error al agregar alumno");
    }

  } catch (err) {
    console.error(err);
  }
});


/* =====================================================
    ELIMINAR ALUMNO (DELETE)
===================================================== */
async function confirmarEliminar() {
  const id = document.getElementById("idEliminar").value;

  if (!id) return alert("Ingresa un ID válido");

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (res.ok) {
      alert("Alumno eliminado");
      obtenerAlumnos();
    } else {
      alert("Error al eliminar");
    }

  } catch (err) {
    console.error(err);
  }
}


/* =====================================================
    MODIFICAR ALUMNO (PUT)
===================================================== */
async function confirmarModificar() {
  const id = document.getElementById("idModificar").value;
  const nombre = document.getElementById("nombreModificar").value;
  const edad = document.getElementById("edadModificar").value;
  const curso = document.getElementById("cursoModificar").value;

  if (!id) return alert("Debes ingresar el ID a modificar");
  if (!nombre || !edad) return alert("El nombre y edad son obligatorios");

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, edad, curso })
    });

    if (res.ok) {
      alert("Alumno modificado");
      obtenerAlumnos();
    } else {
      alert("Error al modificar");
    }

  } catch (err) {
    console.error(err);
  }
}


/* =====================================================
    OBTENER ALUMNOS (GET)
===================================================== */
async function obtenerAlumnos() {
  try {
    const res = await fetch(API_URL);
    const alumnos = await res.json();

    tabla.innerHTML = "";

    alumnos.forEach(a => {
      tabla.innerHTML += `
        <tr>
          <td>${a.id}</td>
          <td>${a.nombre}</td>
          <td>${a.edad}</td>
          <td>${a.curso}</td>
        </tr>
      `;
    });

  } catch (err) {
    console.error(err);
  }
}
