// ===================== 模拟数据（图片包含名称） =====================
        const albums = [{
            id: 1,
            title: "二六年南昌五一摄影",
            date: "2026-05-07",
            description: "五一假期的南昌街头，记录下赣江的风与城市的烟火气。",
            images: [
                { url: "https://picsum.photos/id/1018/800/600", name: "八一广场" },
                { url: "https://picsum.photos/id/1015/800/600", name: "滕王阁远眺" },
                { url: "https://picsum.photos/id/1019/800/600", name: "赣江日落" },
                { url: "https://picsum.photos/id/1039/800/600", name: "街头随拍·一" },
                { url: "https://picsum.photos/id/1043/800/600", name: "街头随拍·二" },
                { url: "https://picsum.photos/id/1050/800/600", name: "地道美食" },
                { url: "https://picsum.photos/id/1059/800/600", name: "夜色南昌" },
                { url: "https://picsum.photos/id/1069/800/600", name: "江边晚风" }
            ]
        }, {
            id: 2,
            title: "城市夜景随拍",
            date: "2026-04-20",
            description: "夜色里的街头光影，霓虹与车流交织出的都市诗篇。",
            images: [
                { url: "https://picsum.photos/id/1070/800/600", name: "霓虹灯带" },
                { url: "https://picsum.photos/id/1071/800/600", name: "高楼掠影" },
                { url: "https://picsum.photos/id/1073/800/600", name: "车流光轨" },
                { url: "https://picsum.photos/id/1074/800/600", name: "深夜便利店" },
                { url: "https://picsum.photos/id/1076/800/600", name: "老街巷口" },
                { url: "https://picsum.photos/id/1078/800/600", name: "雨夜倒影" }
            ]
        }, {
            id: 3,
            title: "山野徒步记录",
            date: "2026-03-15",
            description: "周末进山吸氧，松林、溪流与远山的呼吸。",
            images: [
                { url: "https://picsum.photos/id/1036/800/600", name: "山间小径" },
                { url: "https://picsum.photos/id/1044/800/600", name: "远眺群山" },
                { url: "https://picsum.photos/id/1048/800/600", name: "松林晨光" },
                { url: "https://picsum.photos/id/1058/800/600", name: "溪流潺潺" },
                { url: "https://picsum.photos/id/1060/800/600", name: "山顶风光" }
            ]
        }, {
            id: 4,
            title: "春日花事",
            date: "2026-02-28",
            description: "樱花与二月兰盛开的季节，每一步都是春天的告白。",
            images: [
                { url: "https://picsum.photos/id/106/800/600", name: "樱花如雪" },
                { url: "https://picsum.photos/id/108/800/600", name: "二月兰花海" },
                { url: "https://picsum.photos/id/110/800/600", name: "玉兰花开" },
                { url: "https://picsum.photos/id/112/800/600", name: "桃花朵朵" },
                { url: "https://picsum.photos/id/114/800/600", name: "郁金香田" },
                { url: "https://picsum.photos/id/116/800/600", name: "油菜花田" },
                { url: "https://picsum.photos/id/118/800/600", name: "路边野花" }
            ]
        }];

        // ===================== DOM 元素 =====================
        const galleryHeader = document.getElementById('galleryHeader');
        const albumContainer = document.getElementById('albumContainer');
        const detailContainer = document.getElementById('detailContainer');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxClose = document.getElementById('lightboxClose');
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');

        // ===================== 渲染函数 =====================
        function renderAlbumList() {
            let html = '';
            albums.forEach((album, index) => {
                const previewImgs = album.images.slice(0, 3);
                html += `
                    <div class="album-card" data-index="${index}">
                        <div class="card-stack">
                            ${previewImgs.map(img => `<img src="${img.url}" alt="${album.title}" loading="lazy">`).join('')}
                        </div>
                        <div class="card-info">
                            <h3>${album.title}</h3>
                            <p class="date">${album.date}</p>
                            <p class="album-desc">${album.description}</p>
                        </div>
                    </div>
                `;
            });
            albumContainer.innerHTML = html;
        }

        function renderAlbumDetail(index) {
            const album = albums[index];
            const html = `
                <div class="detail-header">
                    <div class="back-btn" id="backBtn">
                        <span>←</span>
                        <span>返回画廊</span>
                    </div>
                    <div class="detail-date">${album.date}</div>
                </div>
                <h1 class="detail-title">${album.title}</h1>
                <p class="detail-desc">${album.description}</p>
                <div class="photo-grid">
                    ${album.images.map(img => `
                        <div class="photo-item">
                            <img src="${img.url}" alt="${img.name}" loading="lazy">
                            <div class="photo-caption">${img.name}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            detailContainer.innerHTML = html;
            document.getElementById('backBtn').addEventListener('click', showAlbumList);
            bindPhotoClickEvent();
        }

        function showAlbumDetail(index) {
            galleryHeader.style.display = 'none';
            albumContainer.style.display = 'none';
            detailContainer.style.display = 'block';
            renderAlbumDetail(index);
            window.scrollTo(0, 0);
        }

        function showAlbumList() {
            detailContainer.style.display = 'none';
            galleryHeader.style.display = 'block';
            albumContainer.style.display = 'grid';
        }

        // ===================== 灯箱功能 =====================
        function openLightbox(src) {
            lightboxImg.src = src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
            document.body.style.overflow = '';
        }

        function bindCardClickEvent() {
            albumContainer.addEventListener('click', (e) => {
                const card = e.target.closest('.album-card');
                if (card) {
                    const index = parseInt(card.dataset.index);
                    showAlbumDetail(index);
                }
            });
        }

        function bindPhotoClickEvent() {
            const grid = detailContainer.querySelector('.photo-grid');
            if (!grid) return;
            grid.addEventListener('click', (e) => {
                const item = e.target.closest('.photo-item');
                if (item) {
                    const imgSrc = item.querySelector('img').src;
                    openLightbox(imgSrc);
                }
            });
        }

        function bindLightboxEvent() {
            lightboxClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.style.display !== 'none') {
                    closeLightbox();
                }
            });
        }

        // ===================== 荧光粒子动画 =====================
        function initParticles() {
            let width, height;
            const particles = [];
            const PARTICLE_COUNT = 55;

            // 粒子颜色（蓝紫荧光）
            const colors = [
                'rgba(147, 197, 253, 0.7)',   // 浅蓝
                'rgba(167, 139, 250, 0.65)',  // 浅紫
                'rgba(96, 165, 250, 0.6)',
                'rgba(192, 132, 252, 0.55)',
                'rgba(56, 189, 248, 0.6)',
                'rgba(129, 140, 248, 0.65)'
            ];

            function resize() {
                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;
            }

            class Particle {
                constructor() {
                    this.reset(true);
                }

                reset(initial = false) {
                    this.x = Math.random() * width;
                    this.y = initial ? Math.random() * height : height + 10;
                    this.radius = Math.random() * 2.5 + 1.2;
                    this.speedX = (Math.random() - 0.5) * 0.25;
                    this.speedY = -(Math.random() * 0.4 + 0.15); // 向上漂浮
                    this.color = colors[Math.floor(Math.random() * colors.length)];
                    this.opacity = Math.random() * 0.5 + 0.3;
                    this.opacityDir = Math.random() > 0.5 ? 0.003 : -0.003;
                    // 光晕大小
                    this.glow = this.radius * 2.5 + Math.random() * 6;
                }

                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    // 透明度闪烁
                    this.opacity += this.opacityDir;
                    if (this.opacity >= 0.8 || this.opacity <= 0.2) {
                        this.opacityDir *= -1;
                    }

                    // 边界重置：飘出顶部或两侧太远就重新从底部出现
                    if (this.y < -10 || this.x < -20 || this.x > width + 20) {
                        this.reset();
                        this.y = height + 10;
                        this.opacity = Math.random() * 0.5 + 0.3;
                    }
                }

                draw(ctx) {
                    ctx.save();
                    // 绘制光晕（径向渐变）
                    const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.glow);
                    gradient.addColorStop(0, this.color);
                    gradient.addColorStop(1, 'rgba(0,0,0,0)');
                    ctx.globalAlpha = this.opacity;
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.glow, 0, Math.PI * 2);
                    ctx.fill();

                    // 绘制高亮核心
                    ctx.globalAlpha = this.opacity * 1.2;
                    ctx.fillStyle = 'rgba(255,255,255,0.9)';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }

            function createParticles() {
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    particles.push(new Particle());
                }
            }

            function animate() {
                ctx.clearRect(0, 0, width, height);
                particles.forEach(p => {
                    p.update();
                    p.draw(ctx);
                });
                requestAnimationFrame(animate);
            }

            window.addEventListener('resize', () => {
                resize();
            });

            resize();
            createParticles();
            animate();
        }

        // ===================== 初始化 =====================
        function init() {
            renderAlbumList();
            bindCardClickEvent();
            bindLightboxEvent();
            initParticles();
        }

        document.addEventListener('DOMContentLoaded', init);
