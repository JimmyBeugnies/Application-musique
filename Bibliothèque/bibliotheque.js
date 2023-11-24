document.getElementById('addVideo').addEventListener('click', function() {
    const url = document.getElementById('youtubeUrl').value;
    if (url) {
        // Simple validation check for YouTube URL
        const matchUrl = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))((\w|-){11})/);
        if (matchUrl) {
            // Getting the video ID which is the capturing group in the regex
            const videoId = matchUrl[1];
            addVideoToLocalStorage(videoId);
            document.getElementById('youtubeUrl').value = ''; // Clear input field
        } else {
            alert("Veuillez entrer une URL YouTube valide.");
        }
    }
});

function addVideoToLocalStorage(videoId) {
    // Assuming we store videos by an array of IDs
    let videos = JSON.parse(localStorage.getItem('youtubeVideos')) || [];
    if (videos.indexOf(videoId) === -1) { // Avoid duplicate videoIds
        videos.push(videoId);
        localStorage.setItem('youtubeVideos', JSON.stringify(videos));
        renderVideos();
    }
}

function renderVideos() {
    const videos = JSON.parse(localStorage.getItem('youtubeVideos')) || [];
    const container = document.getElementById('playlistContainer');
    container.innerHTML = ''; // Clear previous contents
    videos.forEach(videoId => {
        const link = document.createElement('a');
        link.href = `player.html?videoId=${videoId}`;
        link.target = '_blank';
        link.innerText = `Play Video ${videoId}`;
        container.appendChild(link);
        container.appendChild(document.createElement('br')); // Line break for readability
    });
}

// On page load, render the videos if any
window.addEventListener('DOMContentLoaded', renderVideos);