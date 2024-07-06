document.getElementById('send-button').addEventListener('click', sendMessage);
document.body.addEventListener('click', handleBodyClick);

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message === '') return;

    displayMessage('ユーザー', message);
    input.value = '';

    // サーバーへのメッセージ送信
    fetch('192.168.11.21', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        displayMessage('サーバー', data.reply);
    })
    .catch(error => {
        console.error('エラー:', error);
    });
}

function displayMessage(sender, message) {
    const chatBody = document.getElementById('chat-body');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function handleBodyClick() {
    const chatContainer = document.getElementById('chat-container');
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        chatContainer.requestFullscreen().catch(err => {
            console.error(`エラー: ${err.message}`);
        });
    }

    const audio = document.getElementById('audio-player');
    if (audio.paused) {
        audio.play().catch(err => {
            console.error(`オーディオ再生エラー: ${err.message}`);
        });
    } else {
        audio.pause();
        audio.currentTime = 0;
    }
}
