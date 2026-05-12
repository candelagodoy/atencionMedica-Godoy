let table = new DataTable('#miTabla');


async function buscarTurnos() {
    alert("Entra");

    try {
        const idMedicoEspecialidad = document.getElementById('medicoEspecialidad').value;
        const fecha = document.getElementById('fecha').value;

        console.log("Datos:", idMedicoEspecialidad, fecha);

        const response = await fetch(`/turno/buscar?idMedicoEspecialidad=${idMedicoEspecialidad}&fecha=${fecha}`);

        console.log("Response:", response);

        const turnos = await response.json();

        console.log("Turnos:", turnos);

        table.clear();

        turnos.forEach(turno => {
            table.row.add([
                turno.fechaTurno,
                turno.horaTurno,
                `${turno.paciente?.persona?.nombre || ''} ${turno.paciente?.persona?.apellido || ''}`.trim() || 'No asignado',
                turno.motivo || 'Sin motivo',
                turno.estadoturno?.descripcionEstado || 'No asignado',
                `<button class="btn btn-primary" onclick="window.location.href='/consulta/hcl/${turno.idPacienteFK}'">HCL</button>`,
                `<button class="btn btn-danger" onclick="window.location.href='/consulta?id=${turno.idTurno}'" ${turno.idEstadoFK === 3 ? 'disabled' : ''}>Consulta</button>`
            ]);
        });

        table.draw();

    } catch (error) {
        alert(error.message);
        console.error("ERROR:", error);
    }
}


/*async function buscarTurnos() {
    alert("Entra");
    const idMedicoEspecialidad = document.getElementById('medicoEspecialidad').value;
    const fecha = document.getElementById('fecha').value;

    const response = await fetch(`/turnos?idMedicoEspecialidad=${idMedicoEspecialidad}&fecha=${fecha}`);
    const turnos = await response.json();

    table.clear();

    turnos.forEach(turno => {
        table.row.add([
            turno.fechaTurno,
            turno.horaTurno,
            turno.paciente?.persona?.nombre || 'No asignado',
            turno.motivo || 'Sin motivo',
            turno.estadoturno?.descripcionEstado || 'No asignado',
            `<button class="btn btn-primary" onclick="window.location.href='/historiaClinica?idPacienteFK=${turno.idPacienteFK}'">HCL</button>`,
            `<button class="btn btn-danger" onclick="window.location.href='/consulta?id=${turno.idTurno}'" ${turno.idEstadoFK === 3 ? 'disabled' : ''}>Consulta</button>`
        ]);
    });

    table.draw();
}*/

window.buscarTurnos = buscarTurnos;