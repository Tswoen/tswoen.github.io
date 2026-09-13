// ===================== 模拟数据（图片包含名称） =====================
        const albums = [{
            id: 1,
            title: "宜昌三峡·大坝与峡江",
            date: "2026-01-01",
            description: "元旦沿 G348 三峡公路一路向西，大坝横江、峡江碧水与往来货轮尽收眼底。",
            images: [
                { url: "../assets/img/photos/yichang-three-gorges-dam.jpg", name: "三峡大坝" },
                { url: "../assets/img/photos/sanxia-g348-road.jpg", name: "G348 三峡公路" },
                { url: "../assets/img/photos/xiling-gorge-ship.jpg", name: "西陵峡货轮" },
                { url: "../assets/img/photos/xiajiang-cliff.jpg", name: "峡江峭壁" }
            ]
        }, {
            id: 2,
            title: "雪落天门山",
            date: "2026-01-02",
            description: "冬雪初霁的张家界，峰林挂霜，山谷里一汪碧水静得能照见天光。",
            images: [
                { url: "../assets/img/photos/tianmen-mountain-snow.jpg", name: "雪落天门山" },
                { url: "../assets/img/photos/tianmen-emerald-pool.jpg", name: "幽谷碧水" }
            ]
        }, {
            id: 3,
            title: "金陵访古·明孝陵",
            date: "2026-01-03",
            description: "南京明孝陵半日，券门、碑殿与方城明楼，六百年的光阴落在青石板上。",
            images: [
                { url: "../assets/img/photos/mingxiaoling-arch.jpg", name: "券门远眺" },
                { url: "../assets/img/photos/mingxiaoling-stele.jpg", name: "治隆唐宋碑" },
                { url: "../assets/img/photos/mingxiaoling-minglou.jpg", name: "方城明楼" }
            ]
        }, {
            id: 4,
            title: "暮色江城·武汉",
            date: "2026-05-04",
            description: "五一假期的黄昏登上蛇山，长江大桥、黄鹤楼与江城天际线一起被落日染成金色。",
            images: [
                { url: "../assets/img/photos/wuhan-yangtze-bridge.jpg", name: "长江大桥暮色" },
                { url: "../assets/img/photos/wuhan-river-dusk.jpg", name: "江城夕照" }
            ]
        }, {
            id: 5,
            title: "人间烟火·吃食记",
            date: "2025-12-31",
            description: "从跨年夜的土钵热汤、生日家宴，到面包房的黄油香气与一块奥利奥提拉米苏。",
            images: [
                { url: "../assets/img/photos/clay-pot-soup.jpg", name: "土钵热汤" },
                { url: "../assets/img/photos/birthday-feast.jpg", name: "生日家宴" },
                { url: "../assets/img/photos/gangou-dish.jpg", name: "干锅小炒" },
                { url: "../assets/img/photos/bakery-bread.jpg", name: "面包房的香气" },
                { url: "../assets/img/photos/oreo-tiramisu.jpg", name: "奥利奥提拉米苏" }
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
