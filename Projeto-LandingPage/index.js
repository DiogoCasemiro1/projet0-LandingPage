document.addEventListener('DOMContentLoaded', () => {
  const carrossel = document.querySelector('[data-carrossel]');
  if (!carrossel) return;

  const trilho = carrossel.querySelector('[data-trilho]');
  const slides = Array.from(trilho.children);
  const botaoAnterior = carrossel.querySelector('[data-anterior]');
  const botaoProximo = carrossel.querySelector('[data-proximo]');
  const areaMarcadores = carrossel.querySelector('[data-marcadores]');

  let indiceAtual = 0;

  // Cria um marcador (dot) por slide
  slides.forEach((_, indice) => {
    const marcador = document.createElement('button');
    marcador.type = 'button';
    marcador.className = 'marcador';
    marcador.setAttribute('role', 'tab');
    marcador.setAttribute('aria-label', `Ir para depoimento ${indice + 1}`);
    marcador.addEventListener('click', () => irParaSlide(indice));
    areaMarcadores.appendChild(marcador);
  });

  const marcadores = Array.from(areaMarcadores.children);

  function atualizarEstado() {
    trilho.style.transform = `translateX(-${indiceAtual * 100}%)`;

    marcadores.forEach((marcador, indice) => {
      const ativo = indice === indiceAtual;
      marcador.setAttribute('aria-current', ativo ? 'true' : 'false');
    });
  }

  function irParaSlide(indice) {
    indiceAtual = (indice + slides.length) % slides.length;
    atualizarEstado();
  }

  botaoProximo.addEventListener('click', () => irParaSlide(indiceAtual + 1));
  botaoAnterior.addEventListener('click', () => irParaSlide(indiceAtual - 1));

  carrossel.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowRight') irParaSlide(indiceAtual + 1);
    if (evento.key === 'ArrowLeft') irParaSlide(indiceAtual - 1);
  });

  atualizarEstado();
});
