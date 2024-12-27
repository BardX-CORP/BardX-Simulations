document.getElementById('simular').addEventListener('click', function() {
    const comprimento = parseFloat(document.getElementById('comprimento').value);
    const diametro = parseFloat(document.getElementById('diametro').value);
    const pressao = parseFloat(document.getElementById('pressao').value);
    const volume = parseFloat(document.getElementById('volume').value);
    const angulacao = parseFloat(document.getElementById('angulacao').value);

    if (isNaN(comprimento) || isNaN(diametro) || isNaN(pressao) || isNaN(volume) || isNaN(angulacao)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Cálculos da simulação
    const areaBase = Math.PI * Math.pow(diametro / 2, 2);
    const forca = pressao * areaBase;
    const massaAgua = volume / 1000; // Convertendo para kg
    const velocidadeInicial = Math.sqrt((2 * forca) / massaAgua);
    const alcance = (Math.pow(velocidadeInicial, 2) * Math.sin(2 * angulacao * (Math.PI / 180))) / 9.8;
    const alturaMaxima = (Math.pow(velocidadeInicial * Math.sin(angulacao * (Math.PI / 180)), 2)) / (2 * 9.8);

    // Exibindo resultados
    const detalhesResultados = document.getElementById('detalhes-resultados');
    detalhesResultados.innerHTML = `
        <p><strong>Velocidade Inicial:</strong> ${velocidadeInicial.toFixed(2)} m/s</p>
        <p><strong>Alcance:</strong> ${alcance.toFixed(2)} m</p>
        <p><strong>Altura Máxima:</strong> ${alturaMaxima.toFixed(2)} m</p>
    `;

    // Gerando o gráfico
    const ctx = document.getElementById('grafico').getContext('2d');
    const tempoSubida = velocidadeInicial * Math.sin(angulacao * (Math.PI / 180)) / 9.8;
    const tempoTotal = tempoSubida * 2;
    const intervalo = 0.1;
    const dadosX = [];
    const dadosY = [];

    for (let t = 0; t <= tempoTotal; t += intervalo) {
        const x = velocidadeInicial * Math.cos(angulacao * (Math.PI / 180)) * t;
        const y = velocidadeInicial * Math.sin(angulacao * (Math.PI / 180)) * t - 0.5 * 9.8 * Math.pow(t, 2);
        if (y >= 0) {
            dadosX.push(x);
            dadosY.push(y);
        }
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dadosX.map(v => v.toFixed(2)),
            datasets: [{
                label: 'Trajetória do Foguete',
                data: dadosY,
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Distância Horizontal (m)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Altura (m)'
                    }
                }
            }
        }
    });
});
