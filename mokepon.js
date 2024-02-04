    const SeleccionarAtaque = document.getElementById('seleccionar-ataque');
    const sectionReiniciar = document.getElementById('reiniciar');
    const botonMascotaJugador = document.getElementById('boton-mascota');
    const botonReiniciar = document.getElementById("boton-reiniciar");

    sectionReiniciar.style.display = 'none';

    const SeleccionarMascota = document.getElementById('seleccionar-mascota');
    const spanMascotaJugador = document.getElementById('mascota-jugador');
    const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
    const spanVidasJugador = document.getElementById('vidas-jugador');
    const spanVidasEnemigo = document.getElementById('vidas-enemigo');
    const sectionMensajes = document.getElementById('resultado');
    const ataqueDelJugador = document.getElementById('ataque-del-jugador');
    const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo');
    const contenedorTarjetas = document.getElementById('contenedorTarjetas');
    const contenedorAtaques = document.getElementById('contenedorAtaques');

    let mokepones = [];
    let ataqueEnemigo = [];
    let opcionMokepon;
    let inputHipodoge;
    let inputCapipepo;
    let inputRatigueya;
    let inputLangostino;
    let mascotaJugador;
    let ataquesMokepon;
    let ataquesMokeponEnemigo;
    let botones = [];
    let indexAtaqueJugador;
    let indexAtaqueEnemigo;
    let victoriasJugador = 0;
    let victoriasEnemigo = 0;
    let ataqueJugador = [];
    let vidasJugador = 3;
    let vidasEnemigo = 3;

    class Mokepon {
        constructor(nombre, foto, vida) {
            this.nombre = nombre;
            this.foto = foto;
            this.vida = vida;
            this.ataques = [];
        }
    }

    let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge.png', 5);
    let capipepo = new Mokepon('Capipepo', './assets/capipepo.png', 5);
    let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya.png', 5);
    let langostino = new Mokepon('Langostino', './assets/langostino.png', 5);

    hipodoge.ataques.push(
        {nombre: '💧', id: 'boton-agua' },
        {nombre: '💧', id: 'boton-agua'},
        {nombre: '💧', id: 'boton-agua'},
        {nombre: '🔥', id: 'boton-fuego'},
        {nombre: '🌼', id: 'boton-tierra'},
    );
    capipepo.ataques.push(
        {nombre: '🌼', id: 'boton-tierra'},
        {nombre: '🌼', id: 'boton-tierra'},
        {nombre: '🌼', id: 'boton-tierra'},
        {nombre: '🔥', id: 'boton-fuego'},
        {nombre: '💧', id: 'boton-agua'},
    );
    ratigueya.ataques.push(
        {nombre: '🔥', id: 'boton-fuego'},
        {nombre: '🔥', id: 'boton-fuego'},
        {nombre: '🔥', id: 'boton-fuego'},
        {nombre: '💧', id: 'boton-agua'},
        {nombre: '🌼', id: 'boton-tierra'},
    );
    langostino.ataques.push(
        {nombre: '⚡', id: 'boton-trueno' },
        {nombre: '⚡', id: 'boton-trueno'},
        {nombre: '⚡', id: 'boton-trueno'},
        {nombre: '🌊', id: 'boton-agua'},
        {nombre: '🔥', id: 'boton-fuego'},
    );

    mokepones.push(hipodoge, capipepo, ratigueya, langostino);

    function iniciarJuego() {
        SeleccionarAtaque.style.display = 'none';

        mokepones.forEach((mokepon) => {
            opcionMokepon = `
                <input type="radio" name="mascota" id=${mokepon.nombre} />
                <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} alt=${mokepon.nombre}>
                </label>
            `;

            contenedorTarjetas.innerHTML += opcionMokepon;
        });

        botonMascotaJugador.addEventListener('click', MascotaJugador);
        reiniciar.addEventListener('click', reiniciarJuego);
    }

    function MascotaJugador() {
        SeleccionarMascota.style.display = 'none';
        SeleccionarAtaque.style.display = 'flex';

        const selectedRadio = document.querySelector('input[name="mascota"]:checked');
        if (selectedRadio) {
            spanMascotaJugador.innerHTML = selectedRadio.id;
            mascotaJugador = selectedRadio.id;
        } else {
            alert('Selecciona una mascota PORFAVOR!');
            return;
        }

        extraerAtaques(mascotaJugador);
        MascotaEnemigo();
    }

    function extraerAtaques(mascotaJugador) {
        mokepones.forEach((mokepon) => {
            if (mokepon.nombre === mascotaJugador) {
                mostrarAtaques(mokepon.ataques);
            }
        });
    }

    function mostrarAtaques(ataques) {
        ataques.forEach((ataque) => {
            ataquesMokepon = `<button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`;
            contenedorAtaques.innerHTML += ataquesMokepon;
        });

        botones = document.querySelectorAll('.BAtaque');
        secuenciaAtaque();
    }

    function secuenciaAtaque() {
        botones.forEach((boton) => {
            boton.addEventListener('click', (e) => {
                if (!boton.disabled) {
                    if (e.target.textContent === '🔥') {
                        ataqueJugador.push('FUEGO');
                        console.log(ataqueJugador);
                        boton.style.background = '#112f58';
                        boton.disabled = true;
                    } else if (e.target.textContent === '💧') {
                        ataqueJugador.push('AGUA');
                        console.log(ataqueJugador);
                        boton.style.background = '#112f58';
                        boton.disabled = true;
                    } else if (e.target.textContent === '⚡') {
                        ataqueJugador.push('TRUENO');
                        console.log(ataqueJugador);
                        boton.style.background = '#112f58';
                        boton.disabled = true;
                    } else {
                        ataqueJugador.push('TIERRA');
                        console.log(ataqueJugador);
                        boton.style.background = '#112f58';
                        boton.disabled = true;
                    }
                    ataqueAleatorioEnemigo();
                }
            });
        });
    }



    function MascotaEnemigo() {
        const mascotaAleatoria = aleatorio(0, mokepones.length - 1);
        spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
        ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
    }

    function ataqueAleatorioEnemigo() {
        let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

        if (ataqueAleatorio === 0 || ataqueAleatorio === 1) {
            ataqueEnemigo.push('FUEGO');
        } else if (ataqueAleatorio === 3 || ataqueAleatorio === 4) {
            ataqueEnemigo.push('AGUA');
        } else if (ataqueAleatorio === 5) {
            ataqueEnemigo.push('TRUENO');
        } else {
            ataqueEnemigo.push('TIERRA');
        }

        console.log(ataqueEnemigo);

        iniciarPelea();
    }


    function iniciarPelea() {
        if (ataqueJugador.length === 5) {
            combate();
        }
    }

    function combate() {
        for (let index = 0; index < ataqueJugador.length; index++) {
            if (ataqueJugador[index] === ataqueEnemigo[index]) {
                crearMensaje("EMPATE 😐");
            } else {
                crearMensaje("PERDISTE 😞😭");
                break;
            }
        }
    }

    function crearMensaje(resultado) {
        sectionMensajes.innerHTML = resultado;
    
        ataqueDelJugador.innerHTML = '';
        ataqueDelEnemigo.innerHTML = '';

        ataqueJugador.forEach((ataque) => {
            let nuevoAtaque = document.createElement('p');
            nuevoAtaque.innerHTML = `${getEmoji(ataque)} ${ataque}`;
            ataqueDelJugador.appendChild(nuevoAtaque);
        });
    

        ataqueEnemigo.forEach((ataque) => {
            let nuevoAtaque = document.createElement('p');
            nuevoAtaque.innerHTML = `${getEmoji(ataque)} ${ataque}`;
            ataqueDelEnemigo.appendChild(nuevoAtaque);
        });
    
        sectionReiniciar.style.display = 'block';
    }
    
    function getEmoji(ataque) {
        switch (ataque) {
            case 'FUEGO':
                return '🔥';
            case 'AGUA':
                return '💧';
            case 'TRUENO':
                return '⚡';
            case 'TIERRA':
                return '🌼';
            default:
                return '';
        }
    }
    

    function reiniciarJuego() {
        location.reload();
    }

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    window.addEventListener('load', iniciarJuego);
