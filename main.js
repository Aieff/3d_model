// Importe a biblioteca THREE.js
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

let model3d = 'guts_v.2';

// Crie uma cena Three.JS
const cena = new THREE.Scene();
// Crie uma nova câmera com posições e ângulos
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Mantenha o objeto 3D em uma variável global para que possamos acessá-lo depois
let objeto;

// OrbitControls permitem que a câmera se mova ao redor da cena
let controles;

// Define qual objeto renderizar
let objParaRenderizar = model3d;

// Instancie um carregador para o arquivo .gltf
const carregador = new GLTFLoader();

// Instancie um novo renderizador e defina seu tamanho
const renderizador = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true permite o fundo transparente
renderizador.setSize(window.innerWidth, window.innerHeight);

// Adicione o renderizador ao DOM
document.getElementById("container3D").appendChild(renderizador.domElement);

camera.position.set(-0.6680106979672842, 0.16260153608479015, -2.0663097082286035);

// Defina a rotação inicial da câmera
camera.rotation.set(-1.0124334250178135, -1.0335625892081497, -3.0304669056172098);

// Defina a distância da câmera para o modelo 3D
camera.scale.set(1, 1, 1);


// Adicione luzes à cena para que possamos realmente ver o modelo 3D
const luzSuperior = new THREE.DirectionalLight(0xffffff, 1); // (cor, intensidade)
luzSuperior.position.set(500, 500, 500); // no canto superior esquerdo
luzSuperior.castShadow = true;
cena.add(luzSuperior);

const intensidadeDaLuzAmbiente = 5; // Ajuste conforme necessário
const luzAmbiente = new THREE.AmbientLight(0x333333, intensidadeDaLuzAmbiente);
cena.add(luzAmbiente);

// Isso adiciona controles à câmera, para que possamos rotacioná-la / ampliá-la com o mouse
if (objParaRenderizar === model3d) {
  controles = new OrbitControls(camera, renderizador.domElement);
}

// Carregue o arquivo
carregador.load(
  `3d_model/${objParaRenderizar}/scene.gltf`,
  function (gltf) {
    // Se o arquivo for carregado, adicione-o à cena
    objeto = gltf.scene;

    // Adiciona animação ao modelo
    const mixer = new THREE.AnimationMixer(objeto);
    const action = mixer.clipAction(gltf.animations[0]); // Assumindo que há uma animação no índice 0
    action.play(); // Iniciar a animação

    cena.add(objeto);

    // Função de animação
    const animate = () => {
      requestAnimationFrame(animate);

      // Atualizar o mixer no loop de animação
      mixer.update(0.01);

      if (controles) {
        controles.update(); // Atualize os controles para o movimento da câmera
      }

      renderizador.render(cena, camera);
    };

    animate();
  },
  function (xhr) {
    // Enquanto estiver carregando, registre o progresso
    console.log((xhr.loaded / xhr.total * 100) + '% carregado');
  },
  function (erro) {
    // Se houver um erro, registre-o
    console.error(erro);
  }
);

// Renderize a cena
function animar() {
  requestAnimationFrame(animar);

  if (controles) {
    controles.update(); // Atualize os controles para o movimento da câmera
  }

  renderizador.render(cena, camera);
}

// Adicione um ouvinte para a janela, para que possamos redimensionar a janela e a câmera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderizador.setSize(window.innerWidth, window.innerHeight);
});

// Inicie a renderização 3D
animar();

document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("myAudio");

  audio.volume = 0.1;
  // Adicionar um ouvinte de evento para fazer algo quando a música for carregada
  audio.addEventListener("canplaythrough", function () {
    
  });

});


