
const quill = new Quill("#editor", {
    theme: "snow",
});

document.addEventListener("DOMContentLoaded", () => {

    // carga la evolucion existente
    const evolucionExistente = document.getElementById('evolucionExistente');
    
    if (evolucionExistente && evolucionExistente.value) {
        quill.clipboard.dangerouslyPasteHTML(evolucionExistente.value);
    }

    // LOGS antes de redirect
    window.addEventListener('beforeunload', () => {
        console.log("--- PÁGINA ABANDONADA ---");
    });

    const form = document.querySelector("#formFinalizar");
    form.addEventListener("submit", function () {
        const editorContent = quill.root.innerHTML;
        document.getElementById("editorContent").value = editorContent;
        console.log("Contenido guardado:", editorContent);
    });

    // Cargar plantillas al abrir el modal
    document.getElementById('modalPlantillas').addEventListener('show.bs.modal', async () => {
        const res = await fetch('/plantillas/api');
        const plantillas = await res.json();

        const select = document.getElementById('selectPlantilla');
        select.innerHTML = '<option value="">Seleccione una plantilla</option>';

        plantillas.forEach(p => {
            const option = document.createElement('option');
            option.value = p.idPlantilla;
            option.dataset.contenido = encodeURIComponent(p.contenido);
            option.textContent = p.nombrePlantilla;
            select.appendChild(option);
        });
    });

    // Guardado automático al abrir cualquier modal
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(btn => {
        btn.addEventListener('click', async () => {
            const evolucion = quill.root.innerHTML;
            const idConsulta = window.location.pathname.split('/')[2];

            try {
                await fetch(`/consulta/${idConsulta}/guardarEvolucion`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ evolucion })
                });
                console.log("Evolución guardada automáticamente");
            } catch (error) {
                console.error("Error al guardar evolución:", error);
            }
        });
    });

    // Guardar evolución antes de submitear cualquier form de modal
    document.querySelectorAll('.modal form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const evolucion = quill.root.innerHTML;
            const idConsulta = window.location.pathname.split('/')[2];

            try {
                const response = await fetch(`/consulta/${idConsulta}/guardarEvolucion`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ evolucion })
                });
                const data = await response.json();
                
            } catch (error) {
                console.error("Error al guardar evolución antes de submit:", error);
            }

            form.submit();
        });
    });

});

function cargarPlantilla() {
    const select = document.getElementById('selectPlantilla');
    const option = select.selectedOptions[0];

    if (!option || !option.dataset.contenido) {
        alert('Seleccioná una plantilla');
        return;
    }

    const contenido = decodeURIComponent(option.dataset.contenido);
    quill.clipboard.dangerouslyPasteHTML(contenido);

    bootstrap.Modal.getInstance(document.getElementById('modalPlantillas')).hide();
}








