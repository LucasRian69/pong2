// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

// velocidade da bolinha 
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raquetecomprimento = 10;
let raqueteAltura = 90;

// colisão
let colidiu = false;

// variáveis do Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// placar do jogo
let meusPontos = 0;
let pontosDoOPonente = 0

// sons do jogo
let trilha;
let raquetada;
let ponto;

// chance de erro do Oponente
let chanceDEErrar = 0;

// variável de pausa
let pausa = false;

function preload() {
trilha = loadSound("trilha.mp3");
  raquetada=loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  iniciarJogoComPausa(); // inicia o jogo com uma pausa
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
 movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
 verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
    if (!pausa) {
      xBolinha += velocidadeXBolinha;
      yBolinha += velocidadeYBolinha;
    }
}

function verificaColisaoBorda() {
   if (xBolinha + raio > width || xBolinha - raio < 0) {
      velocidadeXBolinha *= -1;
   }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
     velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMInhaRaquete() {
  if (keyIsDown(87) && yRaquete > 5) {
    yRaquete -= 10;
  }
  if (keyIsDown(83) && yRaquete < 305) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x,y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(UP_ARROW) && yRaqueteOponente > 5) {
    yRaqueteOponente -= 10;
  }
 if (keyIsDown(DOWN_ARROW) && yRaqueteOponente < 305) {
   yRaqueteOponente += 10;
 }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill('darkOrange');
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill('darkOrange');
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
   meusPontos += 1;
   ponto.play();
    iniciarJogoComPausa();
  }
  if (xBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
    inciarJogoComPausa();
  }
}

function iniciarJogoComPausa() {
   pausa = true;
  xBolinha = width / 2;
  yBolinha = height / 2;
  velocidadeXBolinha = 0;
  velocidadeYBolinha = 0;
  
  setTimeout(() => {
    pausa = false;
    velocidadeXBolinha = 6 * (Math.random() > 0.5 ? 1 : -1); // Direção aleatória
    velocidadeYBolinha = 6 * (Math.random() > 0.5 ? 1 : -1); // Direção aleatória
  }, 3000); // 3 segundos de pausa
}