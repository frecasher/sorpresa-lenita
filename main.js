// Función que dibujará TU hortensia original exactamente cuando la llamemos
function dibujarFlorOriginal() {
    const contenedor = document.getElementById("hortensia-container");
    contenedor.innerHTML = ''; // Limpiamos por si acaso

    // 1. Crear Tallo
    const tallo = document.createElement("div");
    tallo.classList.add("tallo");
    contenedor.appendChild(tallo);

    // 2. Crear Hojas
    const alturasHojas = [50, 120, 190]; 
    alturasHojas.forEach((altura, index) => {
        const hojaIzq = document.createElement("div");
        hojaIzq.classList.add("hoja", "izq");
        hojaIzq.style.bottom = `${altura}px`;
        hojaIzq.style.setProperty('--rotacion', '-30deg');
        hojaIzq.style.animationDelay = `${1 + (index * 0.3)}s`;
        tallo.appendChild(hojaIzq);

        const hojaDer = document.createElement("div");
        hojaDer.classList.add("hoja", "der");
        hojaDer.style.bottom = `${altura + 20}px`; 
        hojaDer.style.setProperty('--rotacion', '30deg');
        hojaDer.style.animationDelay = `${1.2 + (index * 0.3)}s`;
        tallo.appendChild(hojaDer);
    });

    // 3. Crear el racimo
    const cluster = document.createElement("div");
    cluster.classList.add("cluster");
    contenedor.appendChild(cluster);

    const numFlowers = 350; 
    const a = 150; 
    const b = 110; 
    const tonosAzul = ['#00296b', '#003f88', '#00509d'];

    // 4. Dibujar los pétalos matemáticamente
    for (let i = 0; i < numFlowers; i++) {
        const florecita = document.createElement("div");
        florecita.classList.add("florecita");

        const theta = Math.random() * 2 * Math.PI;
        const r = Math.sqrt(Math.random()); 
        
        const x = r * a * Math.cos(theta);
        const y = r * b * Math.sin(theta);

        florecita.style.left = `${x}px`;
        florecita.style.top = `${y}px`;

        const colorAleatorio = tonosAzul[Math.floor(Math.random() * tonosAzul.length)];
        florecita.style.backgroundColor = colorAleatorio;

        const delayBase = 2.5; 
        const delayAleatorio = Math.random() * 2.5;
        florecita.style.animationDelay = `${delayBase + delayAleatorio}s`;

        cluster.appendChild(florecita);
    }
}