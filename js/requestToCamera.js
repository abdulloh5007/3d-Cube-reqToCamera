const cameraButton = document.getElementById('camera-button');
const downloadButton = document.getElementById('download-button');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const preview = document.getElementById('preview');

cameraButton.addEventListener('click', function () {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (error) {
            console.log('Ошибка:', error);
        });
});

downloadButton.addEventListener('click', function () {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL();
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = 'photo.png';
    downloadLink.click();

    // добавляем фото на страницу
    preview.src = dataUrl;
});