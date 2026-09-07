function dibujarFlorOriginal() {
  const container = document.getElementById('hortensia-container');
  if (!container) return;
  container.innerHTML = ''; 

  // 1. Tallo
  const tallo = document.createElement('div');
  tallo.className = 'tallo';
  container.appendChild(tallo);

  // 2. Hojas
  const hojasData = [
    { pos: '90px', tipo: 'izq', rot: '-22deg', delay: '0.8s' },
    { pos: '140px', tipo: 'der', rot: '22deg', delay: '1.1s' },
    { pos: '190px', tipo: 'izq', rot: '-16deg', delay: '1.4s' }
  ];

  hojasData.forEach(h => {
    const hoja = document.createElement('div');
    hoja.className = `hoja ${h.tipo}`;
    hoja.style.bottom = h.pos;
    hoja.style.setProperty('--rotacion', h.rot);
    hoja.style.animationDelay = h.delay;
    tallo.appendChild(hoja);
  });

  // 3. Cluster / Racimo
  const cluster = document.createElement('div');
  cluster.className = 'cluster';
  container.appendChild(cluster);

  // Paleta con degradados: Tonos claros/brillantes al centro, tonos más oscuros hacia la sombra exterior
  const coloresCentro = [
    'radial-gradient(circle, #b9e1d7 10%, #4a90e2 65%, #184e77 100%)',
    'radial-gradient(circle, #a3d8f4 10%, #2b6cb0 65%, #1a365d 100%)'
  ];
  const coloresBorde = [
    'radial-gradient(circle, #74b4e0 10%, #2a6f97 65%, #0d2b45 100%)',
    'radial-gradient(circle, #5390d9 10%, #1e6091 65%, #012a4a 100%)'
  ];

  const totalFlores = 115;
  const radioMax = 95;

  for (let i = 0; i < totalFlores; i++) {
    const flor = document.createElement('div');
    flor.className = 'florecita';

    // Distribución esférica en espiral (Fermat)
    const phi = i * 137.5 * (Math.PI / 180);
    const r = Math.sqrt(i / totalFlores) * radioMax;
    
    const offsetX = (Math.random() - 0.5) * 10;
    const offsetY = (Math.random() - 0.5) * 10;

    const x = r * Math.cos(phi) + offsetX;
    const y = r * Math.sin(phi) * 0.85 + offsetY;

    // Proporción del centro a la orilla (0 = centro exacto, 1 = orilla exterior)
    const ratioRadio = r / radioMax;

    // Seleccionar color según la profundidad
    const listaColores = ratioRadio < 0.5 ? coloresCentro : coloresBorde;
    const colorAleatorio = listaColores[Math.floor(Math.random() * listaColores.length)];
    
    const rotacion = Math.floor(Math.random() * 360) + 'deg';
    
    // Animación: Florece del centro hacia afuera
    const delay = 1.6 + ratioRadio * 1.4 + (Math.random() * 0.2);

    // PERSPECTIVA 3D: Flores centrales levemente más grandes, flores de orilla más pequeñas
    const escala3D = 1.15 - (ratioRadio * 0.35); // Va de ~1.15x (centro) a ~0.8x (borde)
    const zIndexDepth = Math.floor(100 - ratioRadio * 50); // Z-index más alto al centro

    flor.style.left = `${x}px`;
    flor.style.top = `${y}px`;
    flor.style.background = colorAleatorio;
    flor.style.setProperty('--rot-petalo', rotacion);
    flor.style.animationDelay = `${delay}s`;
    flor.style.zIndex = zIndexDepth;
    flor.style.transform = `scale(${escala3D})`;

    // Agregamos con prepend para que el DOM mantenga la jerarquía de capas correcta
    cluster.prepend(flor);
  }
}