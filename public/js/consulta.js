
const quill = new Quill("#editor", {
    theme: "snow",
});


//submit finalizar consulta
document.addEventListener("DOMContentLoaded", () => {

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





