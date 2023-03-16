const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const mouse = document.querySelector('.mouse')

console.log(window.innerWidth);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff, wireframe: true });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);


// Куб для заполнения внутренней области
const innerGeometry = new THREE.BoxGeometry(2, 2, 2);
const innerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const innerCube = new THREE.Mesh(innerGeometry, innerMaterial);
scene.add(innerCube);

// Куб для создания границ
const borderGeometry = new THREE.BoxGeometry(2.2, 2.2, 2.2);
const borderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
const borderCube = new THREE.Mesh(borderGeometry, borderMaterial);
scene.add(borderCube);

// Обработчики событий мыши
let isDragging = true;
let previousMousePosition = {
    x: 0,
    y: 0
};
// canvas.addEventListener('mousedown', event => {
//     isDragging = true;
// });
canvas.addEventListener('mousemove', event => {
    const { x, y } = event;
    if (isDragging) {
        const deltaMove = {
            x: x - previousMousePosition.x,
            y: y - previousMousePosition.y
        };

        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));

        borderCube.quaternion.multiplyQuaternions(deltaRotationQuaternion, borderCube.quaternion);
        innerCube.quaternion.multiplyQuaternions(deltaRotationQuaternion, innerCube.quaternion);

    }

    previousMousePosition = {
        x: x,
        y: y
    };
});
canvas.addEventListener('mouseup', event => {
    if (isDragging == true) {
        isDragging = false
        canvas.style.cursor = 'not-allowed'
    }
    else {
        isDragging = true
        canvas.style.cursor = 'all-scroll'
    }
});

// Помощник функция для конвертации градусов в радианы
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;я

    renderer.render(scene, camera);
}

animate();

const fullscreenButton = document.getElementById('fullscreen-button');

// Добавить обработчик событий на клик кнопки Fullscreen
fullscreenButton.addEventListener('click', () => {
    // Получить ссылку на элемент, который вы хотите отобразить в полноэкранном режиме
    const canvas = document.querySelector('canvas');

    // Проверить, поддерживает ли браузер полноэкранный режим
    if (document.fullscreenEnabled) {
        // Запустить полноэкранный режим для элемента
        canvas.requestFullscreen();
    }
});

const screenshotButton = document.querySelector('.screenshot-button');

screenshotButton.addEventListener('click', () => {
    // Получить ссылку на элемент, который вы хотите сделать скриншот
    const canvasContainer = document.getElementById('canvas');

    // Создать скриншот элемента с помощью html2canvas
    html2canvas(canvasContainer).then(function (canvas) {
        // Создать ссылку для загрузки скриншота
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'screenshot.png';
        a.click();
    });
});

