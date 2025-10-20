// Gallery data and image-related functionality
const galleryItems = [
    {
        id: 1,
        title: "Food",
        description: "Samgy?",
        image: "./stuff/images/samgy.jpg",
        type: 'image',
        section: 'my-gallery'
    },
    {
        id: 2,
        title: "Based Baguio",
        description: "Based baguio first meet",
        image: "./stuff/images/based-baguio.jpg",
        type: 'image',
        section: 'my-gallery'
    },
    {
        id: 3,
        title: "Ulap Hike",
        description: "Ulap Hike adventure",
        video: "./stuff/videos/ulap1.mp4",
        type: 'video',
        section: 'my-gallery'
    },
    {
        id: 4,
        title: "City Assesors Office SPES",
        description: "Clip - Day in the life at CASSO",
        video: "./stuff/videos/casso1.mp4",
        type: 'video',
        section: 'my-gallery'
    }
];

// Twitter uploads with local files
const twitterUploads = [
    {
        id: 5,
        title: "Galactica Character",
        description: "My Galactican character design #Galactica",
        image: "./stuff/images/char1.jfif",
        type: 'image',
        section: 'twitter-uploads',
        twitterData: {
            likes: 69,
            retweets: 69,
            date: ''
        }
    },
    {
        id: 6,
        title: "---",
        description: "---r",
        image: "---",
        type: 'image',
        section: 'twitter-uploads',
        likes: 0,
        retweets: 0,
        date: ''
    },
    {
        id: 7,
        title: "Character Movement Video",
        description: "Quick 5 second clip of my character in motion #Animation",
        video: "./stuff/videos/char1m.mp4",
        type: 'video',
        section: 'twitter-uploads',
        twitterData: {
            likes: 69,
            retweets: 69,
            date: ''
        }
    },
    {
        id: 8,
        title: "Community Engagement and Motivation Animation",
        description: "A clip on community engagement and motivation #Community #Motivation",
        video: "./stuff/videos/community.mp4",
        type: 'video',
        section: 'twitter-uploads',
        twitterData: {
            likes: 0,
            retweets: 0,
            date: ''
        }
    }
];

// Music uploads
const musicUploads = [
    {
        id: 9,
        title: "Futures Entwined",
        description: "Chill summer beat",
        audio: "./stuff/moosik/Futures Entwined.mp3",
        type: 'audio',
        section: 'music-uploads',
        plays: 0,
        likes: 0,
        date: '2025-04-22'
    },
    {
        id: 10,
        title: "Ocean Waves",
        description: "Chill beach vibes #chill #beach",
        audio: "./stuff/moosik/Ocean Waves.mp3",
        type: 'audio',
        section: 'music-uploads',
        plays: 0,
        likes: 0,
        date: '2025-01-18'
    },
    {
        id: 11,
        title: "Moonlight in Motion",
        description: "Groovy night tune #groovy",
        audio: "./stuff/moosik/Moonlight in Motion.mp3",
        type: 'audio',
        section: 'music-uploads',
        plays: 0,
        likes: 0,
        date: '2025-02-15'
    },
    {
        id: 12,
        title: "----",
        description: "-----",
        audio: "------",
        type: 'audio',
        section: 'music-uploads',
        plays: 0,
        likes: 0,
        date: '----'
    }
];

// Gallery functionality
class GalleryManager {
    constructor() {
        this.myGalleryItems = galleryItems;
        this.twitterUploads = twitterUploads;
        this.musicUploads = musicUploads;
        this.currentAudio = null;
        this.currentAudioElement = null;
    }

    // Generate all gallery sections
    generateAllSections() {
        this.generateMyGallery();
        this.generateTwitterUploads();
        this.generateMusicUploads();
        this.updateSectionCounts();
    }

    // Generate My Gallery section
    generateMyGallery() {
        const grid = document.querySelector('#my-gallery .gallery-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.myGalleryItems.forEach(item => {
            const galleryItem = this.createGalleryItem(item, 'my-gallery');
            grid.appendChild(galleryItem);
        });
    }

    // Generate Twitter Uploads section
    generateTwitterUploads() {
        const grid = document.querySelector('#twitter-uploads .gallery-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.twitterUploads.forEach(item => {
            const galleryItem = this.createGalleryItem(item, 'twitter-uploads');
            grid.appendChild(galleryItem);
        });
    }

    // Generate Music Uploads section
    generateMusicUploads() {
        const grid = document.querySelector('#music-uploads .gallery-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.musicUploads.forEach(item => {
            const galleryItem = this.createGalleryItem(item, 'music-uploads');
            grid.appendChild(galleryItem);
        });
    }

    // Create individual gallery item
    createGalleryItem(item, section) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        if (this.currentAudio === item.id) {
            galleryItem.classList.add('current-playing');
        }
        galleryItem.setAttribute('data-id', item.id);
        galleryItem.setAttribute('data-section', section);
        galleryItem.setAttribute('data-type', item.type);
        
        const isTwitter = section === 'twitter-uploads';
        const isMusic = section === 'music-uploads';
        
        const twitterBadge = isTwitter ? '<div class="twitter-badge"><i class="fab fa-twitter"></i></div>' : '';
        const musicBadge = isMusic ? '<div class="music-badge"><i class="fas fa-music"></i></div>' : '';
        
        const twitterStats = isTwitter ? this.createTwitterStats(item) : '';
        const musicStats = isMusic ? this.createMusicStats(item) : '';
        
        const mediaContent = this.createMediaContent(item);
        
        galleryItem.innerHTML = `
            ${twitterBadge}
            ${musicBadge}
            ${mediaContent}
            <div class="gallery-info">
                <h3>${item.title || 'Audio Track'}</h3>
                <p>${item.description}</p>
                ${twitterStats}
                ${musicStats}
            </div>
        `;
        
        if (isMusic && item.audio) {
            this.setupAudioEvents(galleryItem, item);
        } else if (item.image || item.video) {
            galleryItem.addEventListener('click', () => this.openModal(item));
        } else {
            galleryItem.style.cursor = 'default';
        }
        
        return galleryItem;
    }

    // Create media content based on type
    createMediaContent(item) {
        if (item.type === 'audio' && item.audio) {
            return this.createAudioPlayer(item);
        } else if (item.type === 'audio' && !item.audio) {
            return `
                <div class="empty-audio">
                    <i class="fas fa-music"></i>
                    <span>No Audio</span>
                </div>
            `;
        } else if (item.type === 'video' && item.video) {
            return `
                <div class="video-container">
                    <video class="gallery-video" preload="metadata">
                        <source src="${item.video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="video-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
        } else if (item.type === 'video' && !item.video) {
            return `
                <div class="empty-video">
                    <i class="fas fa-video"></i>
                    <span>No Video</span>
                </div>
            `;
        } else if (item.type === 'image' && item.image) {
            return `<img src="${item.image}" alt="${item.title}" class="gallery-img">`;
        } else {
            return `
                <div class="empty-image">
                    <i class="fas fa-image"></i>
                    <span>No Image</span>
                </div>
            `;
        }
    }

    // Create audio player
    createAudioPlayer(item) {
        return `
            <div class="audio-container">
                <i class="fas fa-music audio-icon"></i>
                <div class="audio-controls">
                    <button class="play-pause-btn" data-id="${item.id}">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="stop-btn" data-id="${item.id}">
                        <i class="fas fa-stop"></i>
                    </button>
                </div>
                <div class="audio-progress">
                    <div class="audio-progress-bar" data-id="${item.id}"></div>
                </div>
            </div>
        `;
    }

    // Simple Twitter stats
    createTwitterStats(item) {
        return `
            <div class="twitter-stats">
                <span>❤️ ${item.likes || 0}</span>
                <span>🔄 ${item.retweets || 0}</span>
                <span>📅 ${new Date(item.date).toLocaleDateString()}</span>
            </div>
        `;
    }

    // Music stats
    createMusicStats(item) {
        return `
            <div class="music-stats">
                <span>▶️ ${item.plays || 0} plays</span>
                <span>❤️ ${item.likes || 0}</span>
                <span>📅 ${new Date(item.date).toLocaleDateString()}</span>
            </div>
        `;
    }

    // Setup audio events
    setupAudioEvents(galleryItem, item) {
        const playPauseBtn = galleryItem.querySelector('.play-pause-btn');
        const stopBtn = galleryItem.querySelector('.stop-btn');
        const progressBar = galleryItem.querySelector('.audio-progress-bar');
        
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleAudio(item.id);
        });
        
        stopBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.stopAudio();
        });
        
        galleryItem.querySelector('.audio-controls').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Audio control methods
    toggleAudio(itemId) {
        if (this.currentAudio === itemId && this.currentAudioElement) {
            if (this.currentAudioElement.paused) {
                this.currentAudioElement.play();
                this.updatePlayButton(itemId, true);
            } else {
                this.currentAudioElement.pause();
                this.updatePlayButton(itemId, false);
            }
        } else {
            this.stopAudio();
            this.playAudio(itemId);
        }
    }

    playAudio(itemId) {
        const item = this.musicUploads.find(track => track.id === itemId);
        if (!item || !item.audio) return;
        
        this.currentAudio = itemId;
        this.currentAudioElement = new Audio(item.audio);
        
        this.currentAudioElement.addEventListener('play', () => {
            this.updatePlayButton(itemId, true);
            this.highlightCurrentTrack(itemId);
        });
        
        this.currentAudioElement.addEventListener('pause', () => {
            this.updatePlayButton(itemId, false);
        });
        
        this.currentAudioElement.addEventListener('ended', () => {
            this.stopAudio();
            item.plays = (item.plays || 0) + 1;
            this.generateMusicUploads();
        });
        
        this.currentAudioElement.addEventListener('timeupdate', () => {
            this.updateProgressBar(itemId);
        });
        
        this.currentAudioElement.play();
    }

    stopAudio() {
        if (this.currentAudioElement) {
            this.currentAudioElement.pause();
            this.currentAudioElement.currentTime = 0;
            this.currentAudioElement = null;
        }
        if (this.currentAudio) {
            this.updatePlayButton(this.currentAudio, false);
            this.highlightCurrentTrack(null);
            this.currentAudio = null;
        }
    }

    updatePlayButton(itemId, isPlaying) {
        const btn = document.querySelector(`.play-pause-btn[data-id="${itemId}"]`);
        if (btn) {
            btn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        }
    }

    updateProgressBar(itemId) {
        if (!this.currentAudioElement) return;
        
        const progress = (this.currentAudioElement.currentTime / this.currentAudioElement.duration) * 100;
        const progressBar = document.querySelector(`.audio-progress-bar[data-id="${itemId}"]`);
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    highlightCurrentTrack(itemId) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.classList.remove('current-playing');
        });
        
        if (itemId) {
            const currentTrack = document.querySelector(`.gallery-item[data-id="${itemId}"]`);
            if (currentTrack) {
                currentTrack.classList.add('current-playing');
            }
        }
    }

    // Filter gallery items based on search term
    filterGallery(searchTerm) {
        const filteredMyGallery = this.myGalleryItems.filter(item => 
            this.matchesSearch(item, searchTerm)
        );
        const filteredTwitter = this.twitterUploads.filter(item => 
            this.matchesSearch(item, searchTerm)
        );
        const filteredMusic = this.musicUploads.filter(item => 
            this.matchesSearch(item, searchTerm)
        );

        this.generateFilteredSection('my-gallery', filteredMyGallery);
        this.generateFilteredSection('twitter-uploads', filteredTwitter);
        this.generateFilteredSection('music-uploads', filteredMusic);
        this.updateSectionCounts();
    }

    // Generate filtered section
    generateFilteredSection(sectionId, items) {
        const grid = document.querySelector(`#${sectionId} .gallery-grid`);
        if (!grid) return;
        
        grid.innerHTML = '';
        
        items.forEach(item => {
            const galleryItem = this.createGalleryItem(item, sectionId);
            grid.appendChild(galleryItem);
        });
    }

    // Check if item matches search term
    matchesSearch(item, searchTerm) {
        if (!searchTerm) return true;
        
        const term = searchTerm.toLowerCase();
        return item.title?.toLowerCase().includes(term) || 
               item.description.toLowerCase().includes(term);
    }

    // Update section item counts
    updateSectionCounts() {
        const myGalleryCount = document.querySelector('#my-gallery .gallery-grid').children.length;
        const twitterCount = document.querySelector('#twitter-uploads .gallery-grid').children.length;
        const musicCount = document.querySelector('#music-uploads .gallery-grid').children.length;
        
        document.querySelector('#my-gallery .section-count').textContent = `${myGalleryCount} item${myGalleryCount !== 1 ? 's' : ''}`;
        document.querySelector('#twitter-uploads .section-count').textContent = `${twitterCount} item${twitterCount !== 1 ? 's' : ''}`;
        document.querySelector('#music-uploads .section-count').textContent = `${musicCount} item${musicCount !== 1 ? 's' : ''}`;
    }

    // Open modal with media
    openModal(item) {
        if (!item.image && !item.video) return;
        
        let modal = document.querySelector('.modal');
        if (!modal) {
            modal = this.createModal();
        }
        
        const modalContent = modal.querySelector('.modal-content');
        
        if (item.type === 'video' && item.video) {
            modalContent.innerHTML = `
                <video class="modal-video" controls autoplay>
                    <source src="${item.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else if (item.type === 'image' && item.image) {
            modalContent.innerHTML = `<img src="${item.image}" alt="${item.title}">`;
            modalContent.querySelector('img').className = 'modal-image';
        }
        
        modal.style.display = 'flex';
    }

    // Create modal element
    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <span class="modal-close">&times;</span>
            <div class="modal-content"></div>
        `;
        document.body.appendChild(modal);
        
        this.setupModalEvents(modal);
        return modal;
    }

    // Setup modal events
    setupModalEvents(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModal());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // Close modal
    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            const videos = modal.querySelectorAll('video');
            videos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
            modal.style.display = 'none';
        }
    }

    // Method to add new item with local file
    addLocalImage(title, description, imagePath, section = 'my-gallery') {
        const newItem = {
            id: Math.max(...this.myGalleryItems.map(i => i.id), ...this.twitterUploads.map(i => i.id), ...this.musicUploads.map(i => i.id)) + 1,
            title: title,
            description: description,
            image: imagePath,
            type: 'image',
            section: section
        };

        if (section === 'my-gallery') {
            this.myGalleryItems.push(newItem);
        } else if (section === 'twitter-uploads') {
            newItem.likes = 0;
            newItem.retweets = 0;
            newItem.date = new Date().toISOString().split('T')[0];
            this.twitterUploads.push(newItem);
        }

        this.generateAllSections();
        return newItem.id;
    }

    // Method to add new video with local file
    addLocalVideo(title, description, videoPath, section = 'my-gallery') {
        const newItem = {
            id: Math.max(...this.myGalleryItems.map(i => i.id), ...this.twitterUploads.map(i => i.id), ...this.musicUploads.map(i => i.id)) + 1,
            title: title,
            description: description,
            video: videoPath,
            type: 'video',
            section: section
        };

        if (section === 'my-gallery') {
            this.myGalleryItems.push(newItem);
        } else if (section === 'twitter-uploads') {
            newItem.likes = 0;
            newItem.retweets = 0;
            newItem.date = new Date().toISOString().split('T')[0];
            this.twitterUploads.push(newItem);
        }

        this.generateAllSections();
        return newItem.id;
    }

    // Method to add new audio with local file
    addLocalAudio(title, description, audioPath) {
        const newItem = {
            id: Math.max(...this.myGalleryItems.map(i => i.id), ...this.twitterUploads.map(i => i.id), ...this.musicUploads.map(i => i.id)) + 1,
            title: title,
            description: description,
            audio: audioPath,
            type: 'audio',
            section: 'music-uploads',
            plays: 0,
            likes: 0,
            date: new Date().toISOString().split('T')[0]
        };

        this.musicUploads.push(newItem);
        this.generateMusicUploads();
        return newItem.id;
    }

    // Method to check if file exists
    async checkFileExists(filePath) {
        try {
            const response = await fetch(filePath, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Get supported audio formats
    getSupportedAudioFormats() {
        return ['.mp3', '.wav', '.ogg', '.m4a'];
    }
}

// Create global gallery instance
const galleryManager = new GalleryManager();
    

    