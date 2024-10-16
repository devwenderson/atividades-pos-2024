async function fetchMarcasData() {
    try {
        const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        const data = await response.json();

        tableBodyMarcas = document.getElementById("table-body-marcas");
        data.forEach(marca => {
            tableMarcasItem = document.createElement('tr');
            tableMarcasItem.innerHTML = `
                <th>${marca.codigo}</th>
                <td>${marca.nome}</td>
                <td>
                    <button onclick=fetchModelosDaMarca(${marca.codigo})>Modelos</button>
                </td>
            `;
            tableBodyMarcas.appendChild(tableMarcasItem);
        });
    } catch (error) {

    }
};

async function fetchModelosDaMarca(id_marca) {
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${id_marca}/modelos`);
        const data = await response.json();
        // context = {
        //     marca: ""
        // }
        localStorage.setItem('modelos', JSON.stringify(data.modelos))
        window.location.href = 'modelos.html'
        
    } catch (error) {

    }
}

window.onload = () => {
    fetchMarcasData();
    // fetchCarrosdata(59);
}

