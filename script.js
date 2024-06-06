/**
 * 1. Render song
 * 2. Scroll top
 * 3. Play, pause, seek
 * 4. CD rotate
 * 5. Next, prev
 * 6. Random
 * 7. Next, repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const playList = $('.playlist');
const cd = $('.cd');
const cdWidth = cd.offsetWidth;

const heading = $('header h2');
const author = $('header h4');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const btnRandom = $('.btn-random');
const btnRepeat = $('.btn-repeat');

const progress = $('#progress');

const btnPlay = $('.btn-toggle-play');
const minutes = $('.countdownTime .minutes');
const seconds = $('.countdownTime .seconds');
const minutesAll = $('.endTime .minutes');
const secondsAll = $('.endTime .seconds');

// api music
const app = {
    curIndex: 0,
    isPlaying: false,
    isRandom: false,

    songs: [
        {
            name: 'Một triệu like',
            single: 'Đen Vâu',
            path: './assets/music/Một triệu like - Đen Vâu.mp3',
            image: './assets/image/Mộ triệu like - Đen Vâu.jpg'
        },
        {
            name: 'Dush till dawn',
            single: 'Zayn ft Sia',
            path: './assets/music/Dusk Till Dawn - ZAYN.mp3',
            image: './assets/image/Dush till dawn - Zayn ft Sia.jpg'
        },
        {
            name: 'Darkside, Faded, Alone',
            single: 'Alan Walker',
            path: './assets/music/Darkside - Alan Walker.mp3',
            image: './assets/image/Darkside - Alan Walker.jpg'
        },
        {
            name: 'Ngẫu hứng',
            single: 'HoaProx',
            path: './assets/music/WITH YOU NGẪU HỨNG - HOAPROX.mp3',
            image: './assets/image/Ngẫu Hứng - HoaProx.jpg'
        },
        {
            name: 'That girl',
            single: 'Olly Murs',
            path: './assets/music/That girl - Olly Murs.mp3',
            image: './assets/image/That girl - Olly Murs.jpg'
        },
        {
            name: 'Unstopable',
            single: 'Sia',
            path: './assets/music/Unstoppable - Sia.mp3',
            image: './assets/image/Unstopable - Sia.jpg'
        },
        {
            name: 'Một triệu like',
            single: 'Đen Vâu',
            path: './assets/music/Một triệu like - Đen Vâu.mp3',
            image: './assets/image/Mộ triệu like - Đen Vâu.jpg'
        },
        {
            name: 'Dush till dawn',
            single: 'Zayn ft Sia',
            path: './assets/music/Dusk Till Dawn - ZAYN.mp3',
            image: './assets/image/Dush till dawn - Zayn ft Sia.jpg'
        },
        {
            name: 'Darkside, Faded, Alone',
            single: 'Alan Walker',
            path: './assets/music/Darkside - Alan Walker.mp3',
            image: './assets/image/Darkside - Alan Walker.jpg'
        },
        {
            name: 'Ngẫu hứng',
            single: 'HoaProx',
            path: './assets/music/WITH YOU NGẪU HỨNG - HOAPROX.mp3',
            image: './assets/image/Ngẫu Hứng - HoaProx.jpg'
        },
        {
            name: 'That girl',
            single: 'Olly Murs',
            path: './assets/music/That girl - Olly Murs.mp3',
            image: './assets/image/That girl - Olly Murs.jpg'
        },
        {
            name: 'Unstopable',
            single: 'Sia',
            path: './assets/music/Unstoppable - Sia.mp3',
            image: './assets/image/Unstopable - Sia.jpg'
        }
    ],

    // render song 
    render: function () {
        const htmls = this.songs.map(song => {
            return `<div class="song">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.single}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        })
        $('.playlist').innerHTML = htmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this, 'curSong', {
            get: function () {
                return this.songs[this.curIndex];
            }
        })
    },

    handleRvent: function () {
        const _this = this;
        // xử lý cd quay và dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity,
        })
        cdThumbAnimate.pause();

        // xử lý phóng to thu nhỏ ảnh 
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            // new width
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;

            // new opacity
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // xử lý khi click play
        btnPlay.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // khi song được play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        // khi song pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            const curTime = audio.currentTime;
            if (audio.duration) {
                const progressPercent = curTime / audio.duration * 100;
                progress.value = progressPercent;

                // hiện thời lượng bài hát
                let minuteAll = Math.floor(audio.duration / 60);
                minutesAll.innerText = minuteAll < 10 ? '0' + minuteAll : minuteAll;
                const secondAll = Math.floor(audio.duration % 60);
                console.log(Math.floor(audio.duration % 60))
                secondsAll.innerText = secondAll < 10 ? '0' + secondAll : secondAll;
            }

            // hiện tgian hiện tại bài hát
            let minute = Math.floor(curTime / 60);
            minutes.innerText = minute < 10 ? '0' + minute : minute;
            let second = Math.floor(curTime % 60);
            seconds.innerText = second < 10 ? '0' + second : second;
        }

        // xử lý khi tua khi tua 
        progress.onchange = function (e) {
            const curPercent = audio.duration / 100 * e.target.value;
            audio.currentTime = curPercent;
        }

        // khi next
        btnNext.onclick = function () {
            if (_this.isRandom)
                _this.randomSong()
            else
                _this.nextSong();
            audio.play();
        }
        // khi prev
        btnPrev.onclick = function () {
            if (_this.isRandom)
                _this.randomSong()
            else
                _this.prevSong();
            audio.play()
        }

        // khi random
        btnRandom.onclick = function (e) {
            _this.isRandom = !_this.isRandom;
            btnRandom.classList.toggle('active');
        }

        // next khi ended
        audio.onended = function () {
            btnNext.click();
        }
    },

    // next song
    nextSong: function () {
        this.curIndex++;
        if (this.curIndex > this.songs.length - 1)
            this.curIndex = 0;
        this.loadCurSong()
    },

    // prev song
    prevSong: function () {
        this.curIndex--;
        if (this.curIndex < 0)
            this.curIndex = this.songs.length - 1;
        this.loadCurSong()
    },

    // random
    randomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.curIndex);
        this.curIndex = newIndex;
        this.loadCurSong();
        console.log(newIndex);
    },

    // repeat
    repeatSong: function () {

    },

    loadCurSong: function () {
        heading.textContent = this.curSong.name;
        author.textContent = this.curSong.single;
        cdThumb.style.background = `url('${this.curSong.image}')`
        audio.src = this.curSong.path;



        console.log(heading, cdThumb, audio);
    },

    start: function () {
        // định nghĩa thuộc tính cho object
        this.defineProperties();

        // lắng nghe / xử lý sự kiện
        this.handleRvent();

        // load bài hát hiện tại
        this.loadCurSong();

        // render danh sách
        this.render();
    }
}

app.start();