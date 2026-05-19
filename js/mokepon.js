// ════════════════════════════════════════════
//  MOKEPON — Lógica completa (sin servidor)
//  Mecánica: 3 rondas, gana quien gane 2
// ════════════════════════════════════════════

// ── DOM ──────────────────────────────────────
const pantallaInicio   = document.getElementById('pantalla-inicio');
const pantallaM        = document.getElementById('pantalla-mapa');
const pantallaBatalla  = document.getElementById('pantalla-batalla');

const contenedorTarjetas  = document.getElementById('contenedorTarjetas');
const botonMascota        = document.getElementById('boton-mascota');
const botonReiniciar      = document.getElementById('boton-reiniciar');

const spritejugador    = document.getElementById('sprite-jugador');
const spriteEnemigo    = document.getElementById('sprite-enemigo');
const spanNombreJug    = document.getElementById('mascota-jugador');
const spanNombreEne    = document.getElementById('mascota-enemigo');
const spanVidasJug     = document.getElementById('vidas-jugador');
const spanVidasEne     = document.getElementById('vidas-enemigo');

const cajaResultado    = document.getElementById('resultado');
const histAtqJug       = document.getElementById('ataque-del-jugador');
const histAtqEne       = document.getElementById('ataque-del-enemigo');
const contenedorAtaques= document.getElementById('contenedorAtaques');
const resultadoFinal   = document.getElementById('resultado-final');
const secReiniciar     = document.getElementById('reiniciar');

const canvasMapa       = document.getElementById('mapa');
const lienzo           = canvasMapa.getContext('2d');

// ── Canvas tamaño ────────────────────────────
const MAX_ANCHO = 450;
const anchoMapa = Math.min(window.innerWidth - 24, MAX_ANCHO);
canvasMapa.width  = anchoMapa;
canvasMapa.height = Math.round(anchoMapa * 600 / 800);

const imgMapa = new Image();
imgMapa.src = './assets/mokemap.png';

// ── Tabla de victorias ───────────────────────
// clave ATACA vence a cada elemento del array
const VENCE = {
    FUEGO:  ['TIERRA'],
    AGUA:   ['FUEGO', 'TIERRA'],
    TIERRA: ['AGUA', 'TRUENO'],
    TRUENO: ['FUEGO', 'AGUA'],
};

// ── Datos visuales de ataques ────────────────
const ATAQUES_INFO = {
    FUEGO:  { emoji: '🔥', label: 'Fuego'  },
    AGUA:   { emoji: '💧', label: 'Agua'   },
    TIERRA: { emoji: '🌼', label: 'Tierra' },
    TRUENO: { emoji: '⚡', label: 'Trueno' },
};

// ── Definición de los 4 mokepones ────────────
const MOKEPONES_DEF = [
    {
        nombre:   'Hipodoge',
        foto:     './assets/hipodoge.png',
        fotoMapa: './assets/hipodoge-mapa.png',
        ataques:  ['AGUA', 'AGUA', 'AGUA', 'FUEGO', 'TIERRA'],
    },
    {
        nombre:   'Capipepo',
        foto:     './assets/capipepo.png',
        fotoMapa: './assets/capipepo-mapa.png',
        ataques:  ['TIERRA', 'TIERRA', 'TIERRA', 'FUEGO', 'AGUA'],
    },
    {
        nombre:   'Ratigueya',
        foto:     './assets/ratigueya.png',
        fotoMapa: './assets/ratigueya-mapa.png',
        ataques:  ['FUEGO', 'FUEGO', 'FUEGO', 'AGUA', 'TIERRA'],
    },
    {
        nombre:   'Langostino',
        foto:     './assets/langostino.png',
        fotoMapa: './assets/langostino-mapa.png',
        ataques:  ['TRUENO', 'TRUENO', 'TRUENO', 'AGUA', 'FUEGO'],
    },
];

// ── Clase Mokepon ─────────────────────────────
class Mokepon {
    constructor(def) {
        this.nombre   = def.nombre;
        this.foto     = def.foto;
        this.ataques  = def.ataques;
        this.ancho    = 40;
        this.alto     = 40;
        this.x        = aleatorio(8, canvasMapa.width  - 48);
        this.y        = aleatorio(8, canvasMapa.height - 48);
        this.velocidadX = 0;
        this.velocidadY = 0;
        this.img      = new Image();
        this.img.src  = def.fotoMapa;
    }

    pintar() {
        lienzo.drawImage(this.img, this.x, this.y, this.ancho, this.alto);
    }

    mover() {
        this.x = Math.max(0, Math.min(canvasMapa.width  - this.ancho, this.x + this.velocidadX));
        this.y = Math.max(0, Math.min(canvasMapa.height - this.alto,  this.y + this.velocidadY));
    }
}

// ── Estado global ─────────────────────────────
let mokepones        = [];   // instancias jugables
let enemigosEnMapa   = [];   // instancias enemigas
let miMokepon        = null; // mokepon del jugador
let enemigoActual    = null; // enemigo con quien se está batallando

let ronda            = 0;    // rondas jugadas (0-2)
let victoriasjugador = 0;
let victoriasEnemigo = 0;

let intervaloMapa    = null;
let enColision       = false;

// ════════════════════════════════════════════
//  PANTALLA 1 — INICIO
// ════════════════════════════════════════════
function iniciarJuego() {
    // Crear tarjetas de selección
    MOKEPONES_DEF.forEach((def) => {
        const m = new Mokepon(def);
        mokepones.push(m);

        contenedorTarjetas.innerHTML += `
            <input type="radio" name="mascota" id="${def.nombre}">
            <label class="tarjeta-de-mokepon" for="${def.nombre}">
                <img src="${def.foto}" alt="${def.nombre}">
                <p>${def.nombre}</p>
            </label>`;
    });

    botonMascota.addEventListener('click', elegirMascota);
    botonReiniciar.addEventListener('click', () => location.reload());
}

function elegirMascota() {
    const radio = document.querySelector('input[name="mascota"]:checked');
    if (!radio) { alert('¡Elige un Mokepon primero! 🐾'); return; }

    miMokepon = mokepones.find(m => m.nombre === radio.id);

    // Crear enemigos en el mapa (todos menos el jugador)
    enemigosEnMapa = MOKEPONES_DEF
        .filter(d => d.nombre !== miMokepon.nombre)
        .map(d => new Mokepon(d));

    mostrarPantalla('mapa');
    iniciarMapa();
}

// ════════════════════════════════════════════
//  PANTALLA 2 — MAPA
// ════════════════════════════════════════════
function iniciarMapa() {
    enColision = false;
    intervaloMapa = setInterval(tickMapa, 1000 / 60);
    window.addEventListener('keydown', teclaPulsada);
    window.addEventListener('keyup',   teclaLiberada);
}

function tickMapa() {
    miMokepon.mover();
    lienzo.clearRect(0, 0, canvasMapa.width, canvasMapa.height);
    lienzo.drawImage(imgMapa, 0, 0, canvasMapa.width, canvasMapa.height);
    miMokepon.pintar();
    enemigosEnMapa.forEach(e => {
        e.pintar();
        verificarColision(e);
    });
}

function verificarColision(enemigo) {
    if (enColision) return; // evita doble-trigger

    const chocaX = miMokepon.x < enemigo.x + enemigo.ancho
                && miMokepon.x + miMokepon.ancho > enemigo.x;
    const chocaY = miMokepon.y < enemigo.y + enemigo.alto
                && miMokepon.y + miMokepon.alto  > enemigo.y;

    if (chocaX && chocaY) {
        enColision = true;
        miMokepon.velocidadX = 0;
        miMokepon.velocidadY = 0;
        clearInterval(intervaloMapa);
        window.removeEventListener('keydown', teclaPulsada);
        window.removeEventListener('keyup',   teclaLiberada);
        iniciarBatalla(enemigo);
    }
}

// Movimiento teclado
function teclaPulsada(e) {
    const v = 4;
    if      (['ArrowUp',    'w', 'W'].includes(e.key)) miMokepon.velocidadY = -v;
    else if (['ArrowDown',  's', 'S'].includes(e.key)) miMokepon.velocidadY =  v;
    else if (['ArrowLeft',  'a', 'A'].includes(e.key)) miMokepon.velocidadX = -v;
    else if (['ArrowRight', 'd', 'D'].includes(e.key)) miMokepon.velocidadX =  v;
}
function teclaLiberada() {
    miMokepon.velocidadX = 0;
    miMokepon.velocidadY = 0;
}

// Botones D-pad (globales para los atributos inline del HTML)
function moverArriba()    { if (miMokepon) miMokepon.velocidadY = -4; }
function moverAbajo()     { if (miMokepon) miMokepon.velocidadY =  4; }
function moverIzquierda() { if (miMokepon) miMokepon.velocidadX = -4; }
function moverDerecha()   { if (miMokepon) miMokepon.velocidadX =  4; }
function detenerMovimiento() {
    if (miMokepon) { miMokepon.velocidadX = 0; miMokepon.velocidadY = 0; }
}

// ════════════════════════════════════════════
//  PANTALLA 3 — BATALLA
// ════════════════════════════════════════════
function iniciarBatalla(enemigo) {
    enemigoActual    = enemigo;
    ronda            = 0;
    victoriasjugador = 0;
    victoriasEnemigo = 0;

    // Sprites y nombres
    spritejugador.src     = miMokepon.foto;
    spriteEnemigo.src     = enemigoActual.foto;
    spanNombreJug.textContent = miMokepon.nombre;
    spanNombreEne.textContent = enemigoActual.nombre;

    // Resetear marcador e historial
    spanVidasJug.textContent = '0';
    spanVidasEne.textContent = '0';
    histAtqJug.innerHTML = '';
    histAtqEne.innerHTML = '';

    cajaResultado.className = 'resultado-ronda';
    cajaResultado.textContent = 'Elige tu ataque para la Ronda 1 ⚔️';

    resultadoFinal.className = 'resultado-final oculto';
    secReiniciar.classList.add('oculto');

    // Botones de ataque — solo tipos únicos del mokepon del jugador
    renderizarBotonesAtaque();

    mostrarPantalla('batalla');
}

function renderizarBotonesAtaque() {
    contenedorAtaques.innerHTML = '';
    const tiposUnicos = [...new Set(miMokepon.ataques)];

    tiposUnicos.forEach(tipo => {
        const info = ATAQUES_INFO[tipo];
        const btn  = document.createElement('button');
        btn.className = `boton-de-ataque btn-${tipo}`;
        btn.innerHTML = `${info.emoji}<span class="btn-label">${info.label}</span>`;
        btn.addEventListener('click', () => procesarRonda(tipo));
        contenedorAtaques.appendChild(btn);
    });
}

// ── Lógica de una ronda ───────────────────────
function procesarRonda(tipoJugador) {
    if (ronda >= 3) return; // seguridad extra

    // Enemigo elige al azar entre SUS propios ataques
    const tipoEnemigo = enemigoActual.ataques[
        aleatorio(0, enemigoActual.ataques.length - 1)
    ];

    ronda++;

    // Evaluar resultado
    const resultado = evaluar(tipoJugador, tipoEnemigo);

    if (resultado === 1) {
        victoriasjugador++;
        mostrarResultadoRonda('win',
            `Ronda ${ronda}: ${ATAQUES_INFO[tipoJugador].emoji} vs ${ATAQUES_INFO[tipoEnemigo].emoji} — ¡Ganaste esta ronda! 🎉`);
    } else if (resultado === -1) {
        victoriasEnemigo++;
        mostrarResultadoRonda('lose',
            `Ronda ${ronda}: ${ATAQUES_INFO[tipoJugador].emoji} vs ${ATAQUES_INFO[tipoEnemigo].emoji} — El rival ganó esta ronda 😞`);
    } else {
        mostrarResultadoRonda('tie',
            `Ronda ${ronda}: ${ATAQUES_INFO[tipoJugador].emoji} vs ${ATAQUES_INFO[tipoEnemigo].emoji} — ¡Empate! 🤝`);
    }

    // Actualizar marcador
    spanVidasJug.textContent = victoriasjugador;
    spanVidasEne.textContent = victoriasEnemigo;

    // Agregar al historial
    agregarHistorial(tipoJugador, tipoEnemigo);

    // ¿Ya terminó? (alguien llegó a 2 o se jugaron las 3 rondas)
    const batallaTerminada = victoriasjugador === 2
                          || victoriasEnemigo === 2
                          || ronda === 3;

    if (batallaTerminada) {
        bloquearBotones();
        setTimeout(mostrarResultadoFinal, 700);
    } else {
        cajaResultado.textContent += `  ·  Ronda ${ronda + 1} →`;
    }
}

// Devuelve 1 si jugador gana, -1 si pierde, 0 empate
function evaluar(atqJ, atqE) {
    if (atqJ === atqE) return 0;
    if (VENCE[atqJ] && VENCE[atqJ].includes(atqE)) return 1;
    return -1;
}

function mostrarResultadoRonda(clase, texto) {
    cajaResultado.className = `resultado-ronda ${clase}`;
    cajaResultado.textContent = texto;
}

function agregarHistorial(tipoJ, tipoE) {
    const infoJ = ATAQUES_INFO[tipoJ];
    const infoE = ATAQUES_INFO[tipoE];

    const pJ = document.createElement('p');
    pJ.textContent = `${infoJ.emoji} ${infoJ.label}`;
    pJ.style.color = colorTipo(tipoJ);
    histAtqJug.appendChild(pJ);

    const pE = document.createElement('p');
    pE.textContent = `${infoE.emoji} ${infoE.label}`;
    pE.style.color = colorTipo(tipoE);
    histAtqEne.appendChild(pE);
}

function colorTipo(tipo) {
    const colores = { FUEGO: '#ff6b35', AGUA: '#29b6f6', TIERRA: '#66bb6a', TRUENO: '#ffd740' };
    return colores[tipo] || '#fff';
}

function bloquearBotones() {
    document.querySelectorAll('.boton-de-ataque').forEach(b => b.disabled = true);
}

function mostrarResultadoFinal() {
    resultadoFinal.classList.remove('oculto');
    secReiniciar.classList.remove('oculto');

    if (victoriasjugador > victoriasEnemigo) {
        resultadoFinal.className = 'resultado-final victoria';
        resultadoFinal.textContent = '🏆 ¡FELICIDADES! ¡Ganaste la batalla! ✨';
    } else if (victoriasEnemigo > victoriasjugador) {
        resultadoFinal.className = 'resultado-final derrota';
        resultadoFinal.textContent = '💀 ¡Has perdido! El rival fue más fuerte... 😓';
    } else {
        resultadoFinal.className = 'resultado-final empate';
        resultadoFinal.textContent = '🤝 ¡Empate! Nadie ganó esta vez 😐';
    }
}

// ── Navegación entre pantallas ────────────────
function mostrarPantalla(cual) {
    pantallaInicio.classList.remove('activa');
    pantallaM.classList.remove('activa');
    pantallaBatalla.classList.remove('activa');

    if (cual === 'inicio')   pantallaInicio.classList.add('activa');
    if (cual === 'mapa')     pantallaM.classList.add('activa');
    if (cual === 'batalla')  pantallaBatalla.classList.add('activa');
}

// ── Utilidades ────────────────────────────────
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// ── Arrancar ──────────────────────────────────
window.addEventListener('load', iniciarJuego);
