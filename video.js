document.addEventListener("DOMContentLoaded", function(e) { 

    // Get our elements
    const player = document.querySelector('.player');
    const video = player.querySelector('.viewer');
    const progress = player.querySelector('.progress');
    const progressBar = player.querySelector('.progress__filled');
    const toggle = player.querySelector('.toggle');
    const skipButtons = player.querySelectorAll('[data-skip]');
    const ranges = player.querySelectorAll('.player__slider');
    progressBar.style.flexBasis = 0;

    // Functions 

    function togglePlay() {
        // paused is property on video
        if (video.paused) {
            video.play();
            video.muted = false;
        } else {
            video.pause();
            video.muted = false;
        }
    }

    function updateButton() {
        // 'this' because it's bound to the video itself
        const icon = this.paused ? '►' : '❚ ❚' 
        console.log(icon)
        toggle.textContent = icon;
        console.log('Button updated!');
    }

    function skip() {
        console.log('Skipping!')
        console.log(this.dataset);
        console.log(this.dataset.skip);
        // sets current time on video to whatever it's at + skip amount parsed into number (from a string)
        video.currentTime += parseFloat(this.dataset.skip);
    }

    function handleRangeUpdate() {
        video[this.name] = this.value;
        console.log(this.name);
        console.log(this.value);
    }

    function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`
    }

    function scrub(e) {
        // e.offsetX is where we clicked, progress.offsetWidth is width of whole bar
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
        console.log(e);
    }

    // Event Listeners

    video.addEventListener('click', togglePlay);
    toggle.addEventListener('click', togglePlay);

    // Whenever it's paused, show pause button icon
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
    ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
    ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

    video.addEventListener('timeupdate', handleProgress);

    progress.addEventListener('click', scrub);
    let mousedown = false;
    progress.addEventListener('mousedown', () => mousedown = true);

    // only scrubs if mousedown = true, have to pass in (e) since scrub(e) needs it
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mouseup', () => mousedown = false);

});