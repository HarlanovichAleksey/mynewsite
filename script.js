document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('switch');
    const body = document.body;
    const loveHeart = document.querySelector('.love-heart');

    const saveTheme = (theme) => {
        localStorage.setItem('theme', theme);
    }
    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light-theme') {
            body.classList.add('light-theme');
            themeSwitch.checked = true;
            loveHeart.classList.add('active');
        }
    }
    loadTheme();
    themeSwitch.addEventListener('change', () => {
        body.classList.toggle('light-theme');
        loveHeart.classList.toggle('active');
        if (body.classList.contains('light-theme')) {
            saveTheme('light-theme');
        } else {
            saveTheme('dark-theme');
        }
    });
  const carousels = document.querySelectorAll('.carousel');
  let modalShown = false;
  const modal = document.getElementById('modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCloseButton = modal.querySelector('.modal__close-button');
  let currentAudio = null;
    let isModalEventAdded = false;
  carousels.forEach(carousel => {
      const items = carousel.querySelector('.carousel-items');
      const prevButton = carousel.querySelector('.carousel-button.prev');
      const nextButton = carousel.querySelector('.carousel-button.next');
      const carouselItems = Array.from(items.children);
      let currentIndex = 0;
      let isAnimating = false;
      let itemWidth;
      function calculateItemWidth() {
          itemWidth = carouselItems[0].offsetWidth;
      }
      calculateItemWidth();
      function updateCarousel() {
          if (isAnimating) return;
          isAnimating = true;
          items.style.transform = `translateX(calc(-50% - ${currentIndex * itemWidth}px))`;
          carouselItems.forEach((item, index) => {
              item.classList.toggle('active', index === currentIndex);
          });
          setTimeout(() => {
              isAnimating = false;
          }, 500);
          setupAudioPlayers();
      }
      function nextItem() {
          currentIndex = (currentIndex + 1) % carouselItems.length;
          updateCarousel();
      }
      function prevItem() {
          currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
          updateCarousel();
      }
      function setupAudioPlayers() {
          const audioPlayers = carousel.querySelectorAll('.audio-player');
          audioPlayers.forEach(player => {
              const audio = player.querySelector('.audio');
              const playButton = player.querySelector('.play-button');
              const trackBar = player.querySelector('.track-bar');
              const progressBar = player.querySelector('.progress-bar');
              const progressDot = player.querySelector('.progress-dot');
              let isPlaying = false;
              function updateProgress() {
                  const progress = (audio.currentTime / audio.duration) * 100;
                  progressBar.style.width = `${progress}%`;
                  progressDot.style.left = `${progress}%`;
                  if (audio.ended) {
                      playButton.innerHTML = '<i class="fas fa-play"></i>';
                      isPlaying = false;
                      currentAudio = null;
                  }
              }
              audio.addEventListener('timeupdate', updateProgress);
              audio.addEventListener('loadedmetadata', updateProgress);
                playButton.addEventListener('click', (event) => {
                    event.preventDefault();
                  if (!modalShown) {
                     modalOverlay.classList.add('active');
                      modal.style.display = 'flex';
                      modalShown = true;
                      if (!isModalEventAdded) {
                           modalCloseButton.addEventListener('click', () => {
                              modalOverlay.classList.remove('active');
                              modal.style.display = 'none';
                           });
                           modal.querySelector('.modal__play-button').addEventListener('click', () => {
                              if (currentAudio && currentAudio !== audio && isPlaying) {
                                 currentAudio.pause();
                                  currentAudio.parentElement.querySelector('.play-button').innerHTML = '<i class="fas fa-play"></i>';
                                }
                                  if (isPlaying) {
                                    audio.pause();
                                    playButton.innerHTML = '<i class="fas fa-play"></i>';
                                    modalOverlay.classList.remove('active');
                                    modal.style.display = 'none';
                                    isPlaying = false;
                                  } else {
                                       audio.play();
                                        playButton.innerHTML = '<i class="fas fa-pause"></i>';
                                      modalOverlay.classList.remove('active');
                                      modal.style.display = 'none';
                                       isPlaying = true;
                                      currentAudio = audio;
                                  }
                              });
                         isModalEventAdded = true;
                       }
                   } else {
                       if (currentAudio && currentAudio !== audio && isPlaying) {
                          currentAudio.pause();
                           currentAudio.parentElement.querySelector('.play-button').innerHTML = '<i class="fas fa-play"></i>';
                             }
                              if (isPlaying) {
                                  audio.pause();
                                  playButton.innerHTML = '<i class="fas fa-play"></i>';
                                  isPlaying = false;
                              } else {
                                 audio.play();
                                  playButton.innerHTML = '<i class="fas fa-pause"></i>';
                                  isPlaying = true;
                                 currentAudio = audio;
                             }
                   }
                    if (isPlaying) {
                     playButton.innerHTML = '<i class="fas fa-pause"></i>'
                     } else {
                     playButton.innerHTML = '<i class="fas fa-play"></i>';
                  }
                });
              trackBar.addEventListener('click', (e) => {
                  const rect = trackBar.getBoundingClientRect();
                  const clickPosition = e.clientX - rect.left;
                  const seekTime = (clickPosition / rect.width) * audio.duration;
                  audio.currentTime = seekTime;
                  updateProgress();
              });
          });
      }
      updateCarousel();
      nextButton.addEventListener('click', nextItem);
      prevButton.addEventListener('click', prevItem);
      window.addEventListener('resize', () => {
          calculateItemWidth();
          updateCarousel();
      });
  });
});