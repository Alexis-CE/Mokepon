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
            const sectionVerMapa = document.getElementById('vMapa')
            const mapa = document.getElementById('mapa')
            const btnArriba = document.getElementById('btnArriba')
            const btnIzquierda = document.getElementById('btnIzquierda')
            const btnAbajo = document.getElementById('btnAbajo')
            const btnDerecha = document.getElementById('btnDerecha')

            let jugadorId = null
            let enemigoId = null
            let mokepones = [];
            let mokeponesEnemigos = []
            let ataqueJugador = []
            let ataqueEnemigo = [];
            let opcionMokepon;
            let inputHipodoge;
            let inputCapipepo;
            let inputRatigueya;
            let inputLangostino;
            let mascotaJugador;
            let miMokepon
            let ataquesMokepon;
            let ataquesMokeponEnemigo;
            let botonFuego
            let botonAgua
            let botonTierra
            let botonTrueno
            let botones = [];
            let indexAtaqueJugador;
            let indexAtaqueEnemigo;
            let victoriasJugador = 0;
            let victoriasEnemigo = 0;
            let vidasJugador = 3;
            let vidasEnemigo = 3;
            let lienzo = mapa.getContext("2d")
            let intervalo
            let mapaBackground = new Image()
            mapaBackground.src = './assets/mokemap.png'
            let alturaBuscada
            let anchoMapa = window.innerWidth - 20  
            const anchoMaximoMapa = 350

            if (anchoMapa > anchoMaximoMapa) {
                anchoMapa = anchoMaximoMapa - 20
            }
            
            alturaBuscada = anchoMapa * 600 / 800

            mapa.width = anchoMapa
            mapa.height = alturaBuscada

            class Mokepon {
                constructor(nombre, foto, vida, fotoMapa, id = null) {
                    this.id = id
                    this.nombre = nombre;
                    this.foto = foto;
                    this.vida = vida;
                    this.ataques = [];
                    this.ancho = 40;
                    this.alto = 40; 
                    this.x = aleatorio(0, mapa.width - this.ancho)
                    this.y = aleatorio(0, mapa.height - this.alto)
                    this.mapaFoto = new Image ();
                    this.mapaFoto.src = fotoMapa
                    this.velocidadX = 0
                    this.velocidadY = 0
                }

                pintarMokepon() {
                    lienzo.drawImage( 
                        this.mapaFoto,
                        this.x,
                        this.y,
                        this.ancho,
                        this.alto       
                    )
                }
            }

            class Enemigo extends Mokepon {
                constructor(nombre, foto, vida, fotoMapa, id = null) {
                    super(nombre, foto, vida, fotoMapa, id);
                }
            }

            let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge.png', 5, './assets/hipodoge-mapa.png');
            let capipepo = new Mokepon('Capipepo', './assets/capipepo.png', 5, './assets/capipepo-mapa.png');
            let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya.png', 5, './assets/ratigueya-mapa.png');
            let langostino = new Mokepon('Langostino', './assets/langostino.png', 5, './assets/langostino-mapa.png');

            let enemigoHipodoge = new Enemigo('Hipodoge', './assets/hipodoge.png', 5, './assets/hipodoge-mapa.png');
            let enemigoRatigueya = new Enemigo('Ratigueya', './assets/ratigueya.png', 5, './assets/ratigueya-mapa.png');
            let enemigoCapipepo = new Enemigo('Capipepo', './assets/capipepo.png', 5, './assets/capipepo-mapa.png');
            let enemigoLangostino = new Enemigo('Langostino', './assets/langostino.png', 5, './assets/langostino-mapa.png');

            const HIPODOGE_ATAQUES = [
                {nombre: '💧', id: 'boton-agua' },
                {nombre: '💧', id: 'boton-agua'},
                {nombre: '💧', id: 'boton-agua'},
                {nombre: '🔥', id: 'boton-fuego'},
                {nombre: '🌼', id: 'boton-tierra'},
            ]

            hipodoge.ataques.push(...HIPODOGE_ATAQUES)   

            const CAPIPEPO_ATAQUES = [
                {nombre: '🌼', id: 'boton-tierra'},
                {nombre: '🌼', id: 'boton-tierra'},
                {nombre: '🌼', id: 'boton-tierra'},
                {nombre: '🔥', id: 'boton-fuego'},
                {nombre: '💧', id: 'boton-agua'},
            ]

            capipepo.ataques.push(...CAPIPEPO_ATAQUES); 

            const RATIGUEYA_ATAQUES = [
                {nombre: '🔥', id: 'boton-fuego'},
                {nombre: '🔥', id: 'boton-fuego'},
                {nombre: '🔥', id: 'boton-fuego'},
                {nombre: '💧', id: 'boton-agua'},
                {nombre: '🌼', id: 'boton-tierra'},
            ]

            ratigueya.ataques.push(...RATIGUEYA_ATAQUES);

            const LANGOSTINO_ATAQUES = [
                {nombre: '⚡', id: 'boton-trueno' },
                {nombre: '⚡', id: 'boton-trueno'},
                {nombre: '⚡', id: 'boton-trueno'},
                {nombre: '🌊', id: 'boton-agua'},
                {nombre: '🔥', id: 'boton-fuego'},
            ]
    
            langostino.ataques.push(...LANGOSTINO_ATAQUES);

            mokepones.push(hipodoge, capipepo, ratigueya, langostino);

            mokeponesEnemigos.push(enemigoHipodoge, enemigoRatigueya, enemigoCapipepo, enemigoLangostino);

            function iniciarJuego() {
                SeleccionarAtaque.style.display = 'none';
                sectionVerMapa.style.display = 'none';

                mokepones.forEach((mokepon) => {
                    opcionMokepon = `
                        <input type="radio" name="mascota" id=${mokepon.nombre} />
                        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                            <p>${mokepon.nombre}</p>
                            <img src=${mokepon.foto} alt=${mokepon.nombre}>
                        </label>
                    `;

                    contenedorTarjetas.innerHTML += opcionMokepon;
                    inputHipodoge=document.getElementById('Hipodoge')
                    inputCapipepo=document.getElementById('Capipepo')
                    inputRatigueya=document.getElementById('Ratigueya')
                    inputLangostino=document.getElementById('Langostino')
                });

                botonMascotaJugador.addEventListener('click', MascotaJugador);
                reiniciar.addEventListener('click', reiniciarJuego);

                unirseAlJuego()
            }

            function unirseAlJuego() {
                fetch("http://192.168.1.170:8080/unirse")
                    .then(function (res) {
                        if (res.ok) {
                            res.text ()
                                .then(function (respuesta) {
                                    console.log(respuesta)
                                    jugadorId = respuesta
                                })  
                        }
                    })
            }
            function MascotaJugador() {
                
            
                if (inputHipodoge.checked) {
                    spanMascotaJugador.innerHTML = inputHipodoge.id;
                    mascotaJugador = inputHipodoge.id;
                } else if (inputCapipepo.checked) {
                    spanMascotaJugador.innerHTML = inputCapipepo.id;
                    mascotaJugador = inputCapipepo.id;
                } else if (inputRatigueya.checked) {
                    spanMascotaJugador.innerHTML = inputRatigueya.id;
                    mascotaJugador = inputRatigueya.id;
                } else if (inputLangostino.checked) { 
                    spanMascotaJugador.innerHTML = inputLangostino.id;
                    mascotaJugador = inputLangostino.id;
                } else {
                    alert('Selecciona una mascota');
                    return  
                }

                SeleccionarMascota.style.display = 'none';
            
                seleccionarMokepon(mascotaJugador);
            
                extraerAtaques(mascotaJugador);
                sectionVerMapa.style.display = 'flex';
                iniciarMapa();
                MascotaEnemigo()
            }

            function seleccionarMokepon(mascotaJugador) {
                fetch(`http://192.168.1.170:8080/mokepon/${jugadorId}`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        mokepon: mascotaJugador
                    })
                })
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
                            } else if (e.target.textContent === '💧') {
                                ataqueJugador.push('AGUA');
                            } else if (e.target.textContent === '⚡') {
                                ataqueJugador.push('TRUENO');
                            } else {
                                ataqueJugador.push('TIERRA');
                            }
                            console.log(ataqueJugador);
                            boton.style.background = '#112f58';
                            boton.disabled = true;
                            ataqueAleatorioEnemigo();
                        }
                    });
                });
            }

            function enviarAtaques() {
                fetch(`http://192.168.1.170:8080/mokepon/${jugadorId}/ataques`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ataques: ataqueJugador
                    })
                });
            
                ataqueAleatorioEnemigo();
            
                intervalo = setInterval(obtenerAtaques, 50);
            }

            function obtenerAtaques() {
                fetch(`http://192.168.1.170:8080/mokepon/${enemigoId}/ataques`)
                .then(function (res) {
                    if (res.ok) {
                        res.json()
                            .then(function ({ ataques }) {
                                if (ataques.length === 5) {
                                    ataqueEnemigo = ataques
                                    combate()
                                }
                            })
                    }
                })
            }

            function MascotaEnemigo() {
                const mascotaAleatoria = aleatorio(0, mokepones.length - 1);
                spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
                ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
                secuenciaAtaque()
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

            function indexOponentes(jugador, enemigo) {
                indexAtaqueJugador = ataqueJugador[jugador];
                indexAtaqueEnemigo = ataqueEnemigo[enemigo];
            }
            

            function combate() {
                clearInterval(intervalo)
            
                for (let index = 0; index < ataqueJugador.length; index++) {
                    if (ataqueJugador[index] === ataqueEnemigo[index]) {
                        indexOponentes(index, index);
                        crearMensaje("EMPATE 😐");
                    } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
                        indexOponentes(index, index);
                        crearMensaje("GANASTE   🎉😎");
                        victoriasJugador++;
                        spanVidasJugador.innerHTML = victoriasJugador;
                    } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
                        indexOponentes(index, index);
                        crearMensaje("GANASTE   🎉😎");
                        victoriasJugador++;
                        spanVidasJugador.innerHTML = victoriasJugador;
                    } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
                        indexOponentes(index, index);
                        crearMensaje("GANASTE   🎉😎");
                        victoriasJugador++;
                        spanVidasJugador.innerHTML = victoriasJugador;
                    } else if (ataqueJugador[index] === 'TRUENO' && ataqueEnemigo[index] === 'AGUA') {
                        indexOponentes(index, index);
                        crearMensaje("GANASTE   🎉😎");
                        victoriasJugador++;
                        spanVidasJugador.innerHTML = victoriasJugador;
                    } else {
                        indexOponentes(index, index);
                        crearMensaje("PERDISTE 😞😭");
                        victoriasEnemigo++;
                        spanVidasEnemigo.innerHTML = victoriasEnemigo;
            
                    }
                }
                victorias()
            }

            function crearMensaje(resultado) {
                sectionMensajes.innerHTML = resultado;
            
                ataqueDelJugador.innerHTML = '';
                ataqueDelEnemigo.innerHTML = '';

                ataqueJugador.forEach((ataque) => {
                    let nuevoAtaque = document.createElement('p');
                    nuevoAtaque.innerHTML = `${emoji(ataque)} ${ataque}`;
                    ataqueDelJugador.appendChild(nuevoAtaque);
                });
            

                ataqueEnemigo.forEach((ataque) => {
                    let nuevoAtaque = document.createElement('p');
                    nuevoAtaque.innerHTML = `${emoji(ataque)} ${ataque}`;
                    ataqueDelEnemigo.appendChild(nuevoAtaque);
                });
                spanVidasJugador.innerHTML = victoriasJugador;
                sectionReiniciar.style.display = 'block';
            }
            
            function emoji(ataque) {
                switch (ataque) {
                    case 'FUEGO':
                        return '🔥';
                    case 'AGUA':
                        return '💧';
                    case 'TRUENO':
                        return '⚡';
                    case 'TIERRA':
                        return '🌼';
                }
                
            }
            
            function crearMensajeFinal(resultadoFinal) {
                let parrafo = document.createElement('p')
            
                sectionMensajes.innerHTML = resultadoFinal
            
                sectionReiniciar.style.display = 'block'
            }

            function reiniciarJuego() {
                location.reload();
            }

            function aleatorio(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            function victorias() {
                if (victoriasJugador === victoriasEnemigo) {
                    crearMensajeFinal('EMPATE 😐');
                } else if (victoriasJugador > victoriasEnemigo) {
                    crearMensajeFinal('FELICIDADES! Ganaste 😎');
                } else {
                    crearMensajeFinal('Lo siento, Has Perdido 😓');
                }
            }

            function pintarEnemigosOffline() {
                mokeponesEnemigos.forEach(enemigo => {
                    enemigo.pintarMokepon();
                });
            }

            
            function pintarCanvas() {
        miMokepon.x = miMokepon.x + miMokepon.velocidadX;
        miMokepon.y = miMokepon.y + miMokepon.velocidadY;
        lienzo.clearRect(0, 0, mapa.clientWidth, mapa.height);
        lienzo.drawImage(
            mapaBackground,
            0,
            0,
            mapa.width,
            mapa.height
        );
        miMokepon.pintarMokepon();
        enviarPosicion(miMokepon.x, miMokepon.y);
        pintarEnemigosOffline();
        mokeponesEnemigos.forEach(function (mokepon) {
            mokepon.pintarMokepon()
            colision(mokepon)
        })
    }

    function enviarPosicion(x, y) {
        fetch(`http://192.168.1.170:8080/mokepon/${jugadorId}/posicion`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                x,
                y
            })
        })
        .then(function (res)  {
            if (res.ok) {
                res.json()
                    .then(function ({ enemigos }) {
                        console.log(enemigos);
                        mokeponesEnemigos = enemigos.map(function (enemigo) {
                            let mokeponEnemigo = null;
                            if (enemigo.mokepon !== undefined) {
                                const mokeponNombre = enemigo.mokepon.nombre || "";
                                if (mokeponNombre === "Hipodoge") {
                                    mokeponEnemigo = new Mokepon('Hipodoge', './assets/hipodoge.png', 5, './assets/hipodoge-mapa.png', enemigo.id);
                                } else if (mokeponNombre === "Capipepo") {
                                    mokeponEnemigo = new Mokepon('Capipepo', './assets/capipepo.png', 5, './assets/capipepo-mapa.png', enemigo.id);
                                } else if (mokeponNombre === "Ratigueya") {
                                    mokeponEnemigo = new Mokepon('Ratigueya', './assets/ratigueya.png', 5, './assets/ratigueya-mapa.png', enemigo.id);
                                } else if (mokeponNombre === "Langostino") {
                                    mokeponEnemigo = new Mokepon('Langostino', './assets/langostino.png', 5, './assets/langostino-mapa.png', enemigo.id);
                                }

                                mokeponEnemigo.x = enemigo.x;
                                mokeponEnemigo.y = enemigo.y;

                                return mokeponEnemigo
                            }
                        });
                    });
            }
        });
    }

            function moverDerecha() {
                miMokepon.velocidadX = 5
                btnDerecha.style.backgroundColor = 'aliceblue'
            }
            function moverIzquierda() {
                miMokepon.velocidadX = - 5
                btnIzquierda.style.backgroundColor = 'aliceblue'
            }
            function moverAbajo() {
                miMokepon.velocidadY = 5
                btnAbajo.style.backgroundColor = 'aliceblue'
            }
            function moverArriba() {
                miMokepon.velocidadY = -5
                btnArriba.style.backgroundColor = 'aliceblue'
            }

            function detenerMovimiento() {
                miMokepon.velocidadX = 0
                miMokepon.velocidadY = 0  
                btnArriba.style.backgroundColor = '#dea73e'
                btnAbajo.style.backgroundColor = '#dea73e'
                btnIzquierda.style.backgroundColor = '#dea73e'
                btnDerecha.style.backgroundColor = '#dea73e'   
            }

            function sePresionoTecla(event) {

                switch (event.key) {
                    case 'ArrowUp':
                        moverArriba()
                        break;
                case 'ArrowDown' :
                    moverAbajo()
                    break
                    case 'ArrowLeft' :
                        moverIzquierda()
                        break;
                    case 'ArrowRight' :
                        moverDerecha()
                        break
                        case 'w':
                        moverArriba()
                        break
                case 's' :
                    moverAbajo()
                    break;
                    case 'a' :
                        moverIzquierda()
                        break
                    case 'd' :
                        moverDerecha()
                        break;
                    default:
                        break;
                }
            }

            function iniciarMapa() {
                    
                miMokepon = obtenerMascota(mascotaJugador)
                console.log(miMokepon, mascotaJugador);
                intervalo = setInterval(pintarCanvas, 50)

                window.addEventListener('keydown', sePresionoTecla)
                window.addEventListener('keyup', detenerMovimiento)
            }

            function obtenerMascota() {
                let mascotaSeleccionada = null;
            
                for (let i = 0; i < mokepones.length; i++) {
                    if (mascotaJugador === mokepones[i].nombre) {
                        mascotaSeleccionada = mokepones[i];
                        break;
                    }
                }
            
                if (!mascotaSeleccionada) {
                    console.error('No se pudo encontrar la mascota seleccionada');
                }
            
                return mascotaSeleccionada;
            }
            

            function colision(enemigo) {
                const arribaEnemigo = enemigo.y;
                const abajoEnemigo = enemigo.y + enemigo.alto;
                const derechaEnemigo = enemigo.x + enemigo.ancho;
                const izquierdaEnemigo = enemigo.x;
            
                const arribaMascota = miMokepon.y;
                const abajoMascota = miMokepon.y + miMokepon.alto;
                const derechaMascota = miMokepon.x + miMokepon.ancho;
                const izquierdaMascota = miMokepon.x;
            
                if (
                    abajoMascota < arribaEnemigo ||
                    arribaMascota > abajoEnemigo ||
                    derechaMascota < izquierdaEnemigo ||
                    izquierdaMascota > derechaEnemigo
                ) {
                    return;
                }

        detenerMovimiento();
        clearInterval(intervalo);
        console.log('Se detectó una Colisión');

        ataquesMokeponEnemigo = enemigo.ataques

        enemigoId = enemigo.id;
        SeleccionarAtaque.style.display = 'flex';
        sectionVerMapa.style.display = 'none';
        MascotaEnemigo(enemigo);
    }


            
            window.addEventListener('load', iniciarJuego);

            //< >//

