/**
 * MUTHOO RAMAN — OFFICIAL ACTOR PORTFOLIO
 * High-performance Interactive Logic & Media Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeroLookSwitcher();
  initCreditsFilter();
  initGalleryLightbox();
  initMediaRoom();
  initArticleReader();
  initCompCardModal();
  initContactForm();
  initScrollAnimations();
});

/* ==========================================================================
   1. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerClose = document.querySelector('.mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-drawer .nav-link');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  // Sticky header on scroll
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Drawer Toggle
  const openDrawer = () => {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Active section link highlighting
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   2. HERO LOOK SWITCHER
   ========================================================================== */
function initHeroLookSwitcher() {
  const heroImg = document.getElementById('heroActorImage');
  const lookPills = document.querySelectorAll('.look-pill');
  const heroLookTitle = document.getElementById('heroLookTitle');
  const heroLookSub = document.getElementById('heroLookSub');

  if (!heroImg || !lookPills.length) return;

  const looks = {
    dramatic: {
      src: 'assets/photo_1.jpg',
      title: 'Maître D — Jack Ryan: Ghost Wars',
      sub: 'Theatrical & Cinematic Dramatic Persona'
    },
    corporate: {
      src: 'assets/photo_2.jpg',
      title: 'Father (Lead) — Americana Foods',
      sub: 'Corporate Executive & Warm Patriarch Look'
    },
    casual: {
      src: 'assets/photo_3.jpg',
      title: 'Relatable & Athletic Lead',
      sub: 'Contemporary Screen & Commercial Profile'
    }
  };

  lookPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const lookKey = pill.getAttribute('data-look');
      if (!looks[lookKey]) return;

      lookPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      heroImg.style.opacity = '0.3';
      setTimeout(() => {
        heroImg.src = looks[lookKey].src;
        if (heroLookTitle) heroLookTitle.textContent = looks[lookKey].title;
        if (heroLookSub) heroLookSub.textContent = looks[lookKey].sub;
        heroImg.style.opacity = '1';
      }, 150);
    });
  });
}

/* ==========================================================================
   3. CREDITS & FILMOGRAPHY FILTERING + SEARCH
   ========================================================================== */
function initCreditsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('creditSearchInput');
  const tableRows = document.querySelectorAll('#creditsTableBody tr');

  if (!tableRows.length) return;

  let activeCategory = 'all';
  let searchTerm = '';

  const filterTable = () => {
    tableRows.forEach(row => {
      const rowCat = row.getAttribute('data-category') || '';
      const rowText = row.innerText.toLowerCase();

      const matchesCat = (activeCategory === 'all' || rowCat === activeCategory);
      const matchesSearch = (!searchTerm || rowText.includes(searchTerm));

      if (matchesCat && matchesSearch) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category') || 'all';
      filterTable();
    });
  });

  searchInput?.addEventListener('input', (e) => {
    searchTerm = e.target.value.toLowerCase().trim();
    filterTable();
  });
}

/* ==========================================================================
   4. PHOTO & HEADSHOT GALLERY LIGHTBOX
   ========================================================================== */
const galleryData = [
  {
    id: 1,
    src: 'assets/photo_1.jpg',
    category: 'dramatic',
    title: 'Cinematic Theatrical Portrait',
    desc: 'Navy tailored blazer, intense introspective focus. Ideal for executive, syndicate, or diplomatic leads.'
  },
  {
    id: 2,
    src: 'assets/photo_1_headshot.jpg',
    category: 'dramatic',
    title: 'Dramatic Tight Headshot',
    desc: 'Direct camera gaze, sharp salt & pepper grooming, strong facial structure.'
  },
  {
    id: 3,
    src: 'assets/photo_1_bw.jpg',
    category: 'bw',
    title: 'Black & White Theatrical Cast Card',
    desc: 'High-contrast monochrome treatment highlighting texture and cinematic intensity.'
  },
  {
    id: 4,
    src: 'assets/photo_2.jpg',
    category: 'corporate',
    title: 'Corporate Executive & Patriarch',
    desc: 'Warm, authentic smile with open body language. Featured in major GCC TV commercials.'
  },
  {
    id: 5,
    src: 'assets/photo_2_headshot.jpg',
    category: 'corporate',
    title: 'Commercial Executive Headshot',
    desc: 'Charismatic, trustworthy persona suited for high-profile commercials and corporate dramas.'
  },
  {
    id: 6,
    src: 'assets/photo_3.jpg',
    category: 'casual',
    title: 'Casual & Contemporary Lifestyle',
    desc: 'Athletic white tee and casual denim. Approachable, grounded modern male character.'
  },
  {
    id: 7,
    src: 'assets/photo_3_headshot.jpg',
    category: 'casual',
    title: 'Natural Screen Headshot',
    desc: 'Approachable, warm smile. Excellent for everyday protagonist, father, or modern storyteller.'
  },
  {
    id: 8,
    src: 'assets/photo_1_headshot_bw.jpg',
    category: 'bw',
    title: 'Monochrome Close-up Study',
    desc: 'Classic Hollywood studio lighting study for festival and indie feature castings.'
  }
];

function initGalleryLightbox() {
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCount = document.getElementById('lightboxCount');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxDownload = document.getElementById('lightboxDownload');

  if (!galleryGrid) return;

  let currentCategory = 'all';
  let filteredItems = [...galleryData];
  let currentIndex = 0;

  // Render gallery cards
  const renderGallery = () => {
    galleryGrid.innerHTML = '';
    filteredItems.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.setAttribute('data-category', item.category);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View ${item.title}`);
      
      card.innerHTML = `
        <img src="${item.src}" alt="${item.title}" class="gallery-thumb" loading="lazy" />
        <div class="gallery-item-overlay">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      `;

      card.addEventListener('click', () => openLightbox(index));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });

      galleryGrid.appendChild(card);
    });
  };

  // Filter gallery
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-gallery-filter') || 'all';

      if (currentCategory === 'all') {
        filteredItems = [...galleryData];
      } else {
        filteredItems = galleryData.filter(item => item.category === currentCategory);
      }
      renderGallery();
    });
  });

  // Open Lightbox
  const openLightbox = (index) => {
    currentIndex = index;
    updateLightboxContent();
    lightboxModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Update Lightbox Display
  const updateLightboxContent = () => {
    const item = filteredItems[currentIndex];
    if (!item) return;

    if (lightboxImg) lightboxImg.src = item.src;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxDesc) lightboxDesc.textContent = item.desc;
    if (lightboxCount) lightboxCount.textContent = `${currentIndex + 1} / ${filteredItems.length}`;
    if (lightboxDownload) lightboxDownload.setAttribute('href', item.src);
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % filteredItems.length;
    updateLightboxContent();
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightboxContent();
  };

  const closeLightbox = () => {
    lightboxModal?.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
  });

  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-container')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxModal?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxModal?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) showNext();
    if (touchEndX > touchStartX + 50) showPrev();
  }, { passive: true });

  renderGallery();
}

/* ==========================================================================
   5. MEDIA ROOM: VIDEO REEL & AUDIO SAMPLER
   ========================================================================== */
function initMediaRoom() {
  const playPulseBtn = document.querySelector('.play-pulse-btn');
  const videoModal = document.getElementById('videoModal');
  const videoModalClose = document.getElementById('videoModalClose');
  const videoPlayerContainer = document.getElementById('videoPlayerFrame');
  const inlinePlayer = document.getElementById('inlineVideoPlayer');
  const reelTabBtns = document.querySelectorAll('.reel-tab-btn');
  const currentReelTitle = document.getElementById('currentReelTitle');
  const currentReelDesc = document.getElementById('currentReelDesc');
  const currentReelLink = document.getElementById('currentReelLink');

  const reelClips = {
    actor: {
      id: 'ZgyddL5Gk0I',
      title: 'Muthoo Raman — Official Actor Showreel',
      youtubeUrl: 'https://youtu.be/ZgyddL5Gk0I?si=_11SakhG6EdEg0DX',
      embedUrl: 'https://www.youtube.com/embed/ZgyddL5Gk0I',
      desc: 'Selected performances showcasing dramatic range, high-stakes dialogue, and command on camera across feature films and international productions.'
    },
    commercial: {
      id: 'CISrAbBwA4Q',
      title: 'Muthoo Raman — Commercial Showreel',
      youtubeUrl: 'https://youtu.be/CISrAbBwA4Q?si=3YPakW3RpCsMZn0v',
      embedUrl: 'https://www.youtube.com/embed/CISrAbBwA4Q',
      desc: 'Marquee commercial spots and high-profile television campaigns including Americana Foods (Main Lead Father), Ikea UAE, and Noon broadcast across the GCC.'
    },
    combat: {
      id: 'ZgyddL5Gk0I',
      title: 'Screen Combat & Stunt Reel (Jay Naygee Stunts)',
      youtubeUrl: 'https://youtu.be/ZgyddL5Gk0I?si=_11SakhG6EdEg0DX',
      embedUrl: 'https://www.youtube.com/embed/ZgyddL5Gk0I',
      desc: 'Stage fighting, weapon handling, tactical combat movement, reaction timing, and physical action sequences.'
    },
    theatre: {
      id: 'ZgyddL5Gk0I',
      title: 'Stage Monologues & Festival Work (The Junction & Short+Sweet)',
      youtubeUrl: 'https://youtu.be/ZgyddL5Gk0I?si=_11SakhG6EdEg0DX',
      embedUrl: 'https://www.youtube.com/embed/ZgyddL5Gk0I',
      desc: 'Compelling live performances from "This Is Not A Tango" (Lead, The Junction Xfest) and "The Wedding Table" (Short & Sweet Festival).'
    }
  };

  let activeReelKey = 'actor';

  const switchInlineReel = (reelKey) => {
    const reel = reelClips[reelKey] || reelClips.actor;
    activeReelKey = reelKey;

    if (currentReelTitle) currentReelTitle.textContent = reel.title;
    if (currentReelDesc) currentReelDesc.textContent = reel.desc;
    if (currentReelLink) {
      currentReelLink.href = reel.youtubeUrl;
      currentReelLink.textContent = `Watch on YouTube ↗`;
    }

    if (inlinePlayer) {
      inlinePlayer.innerHTML = `
        <iframe src="${reel.embedUrl}?autoplay=1&rel=0" title="${reel.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width:100%; height:100%; border:none;"></iframe>
      `;
    }
  };

  const openVideoModal = (reelKey = activeReelKey) => {
    const reel = reelClips[reelKey] || reelClips.actor;
    if (videoPlayerContainer) {
      videoPlayerContainer.innerHTML = `
        <div style="aspect-ratio:16/9; width:100%; background:#000; border-radius:12px; overflow:hidden; margin-bottom:1.25rem;">
          <iframe src="${reel.embedUrl}?autoplay=1&rel=0" title="${reel.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width:100%; height:100%; border:none;"></iframe>
        </div>
        <div style="padding:0.5rem 0.25rem;">
          <h3 style="font-family:var(--font-serif); font-size:1.35rem; color:#fff; margin-bottom:0.5rem;">${reel.title}</h3>
          <p style="color:#94a3b8; font-size:0.95rem; margin-bottom:1.25rem;">${reel.desc}</p>
          <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
            <a href="${reel.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Watch on YouTube ↗</a>
            <a href="https://www.imdb.com/find/?q=Ramanmuthoo" target="_blank" rel="noopener noreferrer" class="btn btn-outline-gold btn-sm">IMDb Profile</a>
            <a href="https://instagram.com/Muthoo_theactor" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Instagram (@Muthoo_theactor)</a>
          </div>
        </div>
      `;
    }
    videoModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  playPulseBtn?.addEventListener('click', () => {
    switchInlineReel(activeReelKey);
  });

  reelTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      reelTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const reelKey = btn.getAttribute('data-reel') || 'actor';
      switchInlineReel(reelKey);
    });
  });

  videoModalClose?.addEventListener('click', () => {
    if (videoPlayerContainer) videoPlayerContainer.innerHTML = '';
    videoModal?.classList.remove('active');
    document.body.style.overflow = '';
  });

  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      if (videoPlayerContainer) videoPlayerContainer.innerHTML = '';
      videoModal?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Audio Voiceover Synth & Sampler
  initAudioSampler();
}

function initAudioSampler() {
  const audioTracks = document.querySelectorAll('.audio-track-item');
  let currentAudioCtx = null;
  let currentOscillator = null;
  let currentGain = null;
  let activeTrackElement = null;

  audioTracks.forEach(track => {
    const playBtn = track.querySelector('.audio-play-toggle');
    const trackType = track.getAttribute('data-voice-type') || 'commercial';

    playBtn?.addEventListener('click', () => {
      if (track.classList.contains('playing')) {
        stopAudio(track);
      } else {
        audioTracks.forEach(t => stopAudio(t));
        startAudioSimulation(track, trackType);
      }
    });
  });

  function startAudioSimulation(trackEl, type) {
    trackEl.classList.add('playing');
    const icon = trackEl.querySelector('.audio-play-toggle span');
    if (icon) icon.textContent = '⏸';
    activeTrackElement = trackEl;

    // Use Web Audio API for an atmospheric, pleasant low-frequency cinema tone
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        currentAudioCtx = new AudioContext();
        currentOscillator = currentAudioCtx.createOscillator();
        currentGain = currentAudioCtx.createGain();

        // Tune sound profile based on voice archetype
        if (type === 'commercial') {
          currentOscillator.type = 'triangle';
          currentOscillator.frequency.setValueAtTime(160, currentAudioCtx.currentTime);
        } else if (type === 'narration') {
          currentOscillator.type = 'sine';
          currentOscillator.frequency.setValueAtTime(120, currentAudioCtx.currentTime);
        } else {
          currentOscillator.type = 'sine';
          currentOscillator.frequency.setValueAtTime(140, currentAudioCtx.currentTime);
        }

        currentGain.gain.setValueAtTime(0.001, currentAudioCtx.currentTime);
        currentGain.gain.exponentialRampToValueAtTime(0.08, currentAudioCtx.currentTime + 0.3);

        currentOscillator.connect(currentGain);
        currentGain.connect(currentAudioCtx.destination);
        currentOscillator.start();
      }
    } catch (err) {
      console.warn('Audio Context not allowed or initialized', err);
    }

    setTimeout(() => {
      if (trackEl.classList.contains('playing')) {
        stopAudio(trackEl);
      }
    }, 8000);
  }

  function stopAudio(trackEl) {
    if (!trackEl) return;
    trackEl.classList.remove('playing');
    const icon = trackEl.querySelector('.audio-play-toggle span');
    if (icon) icon.textContent = '▶';

    if (currentOscillator) {
      try {
        currentGain?.gain.exponentialRampToValueAtTime(0.0001, currentAudioCtx.currentTime + 0.2);
        setTimeout(() => {
          currentOscillator?.stop();
          currentOscillator?.disconnect();
          currentAudioCtx?.close();
        }, 200);
      } catch (e) {}
    }
  }
}

/* ==========================================================================
   6. ARTICLE & PRESS READER MODAL
   ========================================================================== */
const articlesData = {
  uaeStories: {
    title: 'Muthoo Raman Proves It Is Never Too Late to Chase Dreams',
    category: 'Featured Press Story • UAE Stories',
    author: 'By Jasmeet Singh • UAE Stories (Sep 9, 2026)',
    readTime: '6 min read',
    sourceUrl: 'https://uaestories.com/muthoo-raman-proves-it-is-never-too-late/',
    content: `
      <p class="lead" style="font-size:1.15rem; color:var(--gold-light); margin-bottom:1.5rem; font-style:italic;">
        "At an age when many professionals are thinking about stability, Muthoo Raman was preparing to step into uncertainty. After building a 17-year career across some of the leading names in the paint and construction chemicals industry, he found himself exploring a passion he had carried since childhood: acting."
      </p>

      <div style="background:rgba(212,175,55,0.08); border-left:4px solid var(--gold-primary); padding:1rem 1.25rem; margin-bottom:1.5rem; border-radius:0 8px 8px 0;">
        <strong>Published by UAE Stories:</strong> <a href="https://uaestories.com/muthoo-raman-proves-it-is-never-too-late/" target="_blank" rel="noopener noreferrer" style="color:var(--gold-primary); text-decoration:underline;">Read original article on UAE Stories ↗</a>
      </div>

      <h3 style="font-family:var(--font-serif); font-size:1.3rem; color:#fff; margin-bottom:0.75rem;">From Dubai Salesman to Corporate Leader</h3>
      <p style="margin-bottom:1.25rem;">
        Raman's professional story began in Dubai at 23, initially working in customer service and sales within the banking sector. A breakthrough opportunity changed his trajectory when he joined Jotun Paints. What followed was a rewarding 17-year journey through the paint and construction chemicals sector, developing his expertise in sales, leadership, and management.
      </p>
      <p style="margin-bottom:1.25rem;">
        Starting a career in a new country demanded resilience. Raman had to learn quickly, build professional relationships and prove himself in competitive environments. Behind the corporate success, however, acting had always been somewhere in the background.
      </p>

      <h3 style="font-family:var(--font-serif); font-size:1.3rem; color:#fff; margin-bottom:0.75rem;">The Audition That Changed Everything</h3>
      <p style="margin-bottom:1.25rem;">
        At 40, during a period of professional uncertainty while working at Laticrete Middle East, came the pivotal question: why not finally try acting? He registered profiles with casting agencies. An audition opportunity arrived. Raman walked into it with no industry connections, but with nearly two decades of communication, emotional intelligence, and relationship-building skills.
      </p>
      <blockquote style="border-left:3px solid var(--gold-primary); padding-left:1.25rem; margin:1.5rem 0; font-family:var(--font-serif); font-size:1.15rem; color:#fff;">
        "He gave the audition everything he had. And he was selected for his first commercial. Performing felt natural. Something clicked."
      </blockquote>

      <h3 style="font-family:var(--font-serif); font-size:1.3rem; color:#fff; margin-bottom:0.75rem;">Major Feature Films & Lead Castings</h3>
      <p style="margin-bottom:1.25rem;">
        Rapid momentum followed. Muthoo went on to work on major international productions including <em>Now You See Me Part 3</em>, Warner Bros.' <em>F1</em>, and Paramount Pictures' <em>Jack Ryan: Ghost Wars</em>, where he appeared as the featured Maître D. His range expanded into regional entertainment through the Arabic television series <em>Dara</em> and the Hindi vertical drama <em>The Final Race</em> as the Auction Manager.
      </p>
      <p style="margin-bottom:1.25rem;">
        Then arrived a major career defining milestone: Muthoo Raman was selected for the <strong>lead role</strong> in the upcoming tri-language international feature film <em>The Man Who Counted the Stars</em>, directed by Francis L J Gacer (Kiko Man Films in English, Hindi, and Tagalog).
      </p>
      <p style="margin-bottom:1.25rem;">
        Another milestone in his growing portfolio is the upcoming Malayalam film <em>HVAC</em>, directed by Vijay Basco (scheduled for release October 2026), demonstrating his versatility across cultures, dialects, and cinema genres.
      </p>
      <p style="color:var(--text-muted);">
        Muthoo Raman's journey from corporate boardroom to international blockbuster sets proves with resounding clarity: it is never too late to chase your dreams.
      </p>
    `
  },
  gulfNews: {
    title: 'Look: Musicians out of the dark in UAE',
    category: 'Featured Press Story • Gulf News',
    author: 'Pictures by Antonin Kelian Kallouche (AFP) • Compiled by Dona Cherian (Gulf News)',
    readTime: '3 min read',
    sourceUrl: 'https://gulfnews.com/photos/lifestyle-photos/look-musicians-out-of-the-dark-in-uae-1.1606293920116',
    content: `
      <p class="lead" style="font-size:1.15rem; color:var(--gold-light); margin-bottom:1.5rem; font-style:italic;">
        "Carving out time from a hectic schedule and sustaining an identity as a musician and creative performer in the UAE."
      </p>

      <div style="background:rgba(212,175,55,0.08); border-left:4px solid var(--gold-primary); padding:1rem 1.25rem; margin-bottom:1.5rem; border-radius:0 8px 8px 0;">
        <strong>Published by Gulf News:</strong> <a href="https://gulfnews.com/photos/lifestyle-photos/look-musicians-out-of-the-dark-in-uae-1.1606293920116" target="_blank" rel="noopener noreferrer" style="color:var(--gold-primary); text-decoration:underline;">Read photo story on GulfNews.com ↗</a>
      </div>

      <h3 style="font-family:var(--font-serif); font-size:1.3rem; color:#fff; margin-bottom:0.75rem;">Sustaining the Artistic Soul in Dubai</h3>
      <p style="margin-bottom:1.25rem;">
        In this celebrated photographic profile captured by Agence France-Presse (AFP) staff photographer Antonin Kelian Kallouche and published by Gulf News, the spotlight shines on dedicated artists in the United Arab Emirates who balance intense professional careers with their passion for music and live performance.
      </p>
      <p style="margin-bottom:1.25rem;">
        Among the featured artists is <strong>Muthu Raman</strong>, celebrated for his dedication as an acoustic guitarist and rhythm instrumentalist. For Muthoo, music and guitar have always been deeply intertwined with his screen presence and emotional range as an actor.
      </p>
      <blockquote style="border-left:3px solid var(--gold-primary); padding-left:1.25rem; margin:1.5rem 0; font-family:var(--font-serif); font-size:1.15rem; color:#fff;">
        "Music trains your ear to listen to pauses, rhythm, and unspoken emotion. When you step on a film set or theatrical stage, that musical sense gives your performance authenticity."
      </blockquote>
      <p style="margin-bottom:1.25rem;">
        The photo essay captures the disciplined routine of practicing late into the evening, refining chords, and performing live on stage—qualities that today make Muthoo Raman one of the most expressive and grounded screen actors in the region.
      </p>
    `
  },
  article2: {
    title: 'Mastering the Corporate & Authority Archetype on Screen',
    category: 'Actor Journal • September 2026',
    author: 'By Muthoo Raman',
    readTime: '3 min read',
    content: `
      <p class="lead" style="font-size:1.15rem; color:var(--gold-light); margin-bottom:1.5rem; font-style:italic;">
        "Authority on screen is never about shouting or aggressive gestures. It lives in the stillness of your posture, the pacing of your breath, and the weight behind your eyes."
      </p>
      <p style="margin-bottom:1.25rem;">
        In my scene work across commercials, series, and feature films, casting directors repeatedly seek characters who carry institutional weight — senior corporate managers, hotel directors, legal counsel, and tactical command personnel.
      </p>
      <p style="margin-bottom:1.25rem;">
        During my training under Miranda Davidson Studio and the Alex Broun Company, we deconstructed the four methods of psychological preparation. In high-stakes corporate roles, the character often carries the entire financial or ethical burden of the room. Your eye contact must be unwavering, yet your listening must be intensely active.
      </p>
      <p style="margin-bottom:1.25rem;">
        Similarly, in commercial campaigns like <em>Americana Foods</em> and <em>Ikea UAE</em>, the father archetype demands warmth coupled with quiet leadership. The camera detects any falseness immediately. You cannot play an 'idea' of a father or an executive; you must inhabit his genuine responsibilities.
      </p>
    `
  },
  article3: {
    title: 'Screen Combat & Stunt Craft: Physicality in Modern Casting',
    category: 'Craft & Technique • August 2026',
    author: 'Stunt & Screen Performance Focus',
    readTime: '3 min read',
    content: `
      <p class="lead" style="font-size:1.15rem; color:var(--gold-light); margin-bottom:1.5rem; font-style:italic;">
        "A convincing fight scene is not a display of brute force; it is an intricate, choreographed dialogue between actors who trust each other completely."
      </p>
      <p style="margin-bottom:1.25rem;">
        Under the rigorous mentorship of Jay Naygee Stunts in 2025, Muthoo Raman underwent specialized training in screen combat, stage fighting, weapon retention, and reaction timing. 
      </p>
      <p style="margin-bottom:1.25rem;">
        Unlike competitive combat, screen combat requires an acute awareness of camera angles, lens focal lengths, and maintaining maximum energy while ensuring absolute safety for cast and crew. 
      </p>
      <p>
        Combined with his background in boxing and fitness, this physical training allows Muthoo to seamlessly transition from boardrooms and dramatic sets to demanding tactical sequences, SWAT roles, and dynamic action choreography.
      </p>
    `
  }
};

function initArticleReader() {
  const readBtns = document.querySelectorAll('.article-read-btn');
  const articleModal = document.getElementById('articleModal');
  const articleModalClose = document.getElementById('articleModalClose');
  const modalTitle = document.getElementById('articleModalTitle');
  const modalCategory = document.getElementById('articleModalCategory');
  const modalAuthor = document.getElementById('articleModalAuthor');
  const modalReadTime = document.getElementById('articleModalReadTime');
  const modalBody = document.getElementById('articleModalBody');

  if (!articleModal) return;

  readBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const artId = btn.getAttribute('data-article-id');
      const data = articlesData[artId];
      if (!data) return;

      if (modalTitle) modalTitle.textContent = data.title;
      if (modalCategory) modalCategory.textContent = data.category;
      if (modalAuthor) modalAuthor.textContent = data.author;
      if (modalReadTime) modalReadTime.textContent = data.readTime;
      if (modalBody) modalBody.innerHTML = data.content;

      articleModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeArticle = () => {
    articleModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  articleModalClose?.addEventListener('click', closeArticle);
  articleModal.addEventListener('click', (e) => {
    if (e.target === articleModal) closeArticle();
  });
}

/* ==========================================================================
   7. CASTING COMP CARD MODAL & RESUME PRINT
   ========================================================================== */
function initCompCardModal() {
  const openCompCardBtns = document.querySelectorAll('.open-comp-card-btn');
  const compCardModal = document.getElementById('compCardModal');
  const compCardModalClose = document.getElementById('compCardModalClose');
  const printCompCardBtn = document.getElementById('printCompCardBtn');

  openCompCardBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      compCardModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeCompCard = () => {
    compCardModal?.classList.remove('active');
    document.body.style.overflow = '';
  };

  compCardModalClose?.addEventListener('click', closeCompCard);
  compCardModal?.addEventListener('click', (e) => {
    if (e.target === compCardModal) closeCompCard();
  });

  printCompCardBtn?.addEventListener('click', () => {
    window.print();
  });
}

/* ==========================================================================
   8. CASTING INQUIRY & CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('castingInquiryForm');
  const toast = document.getElementById('toastNotification');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName')?.value || '';
    const company = document.getElementById('formCompany')?.value || '';
    const email = document.getElementById('formEmail')?.value || '';
    const projectType = document.getElementById('formProjectType')?.value || 'Feature Film';
    const dates = document.getElementById('formDates')?.value || 'TBD';
    const message = document.getElementById('formMessage')?.value || '';

    // Show instant success notification
    showToast(`Thank you, ${name}! Your casting inquiry has been prepared.`);

    // Build formatted WhatsApp message & Email fallback
    const waText = encodeURIComponent(
      `Hello Muthoo Raman,\n\nI am contacting you regarding a casting opportunity.\n\n` +
      `*Name / CD:* ${name}\n` +
      `*Company / Agency:* ${company}\n` +
      `*Project Type:* ${projectType}\n` +
      `*Production Dates:* ${dates}\n` +
      `*Details:* ${message}\n\n` +
      `*Contact Email:* ${email}`
    );

    const waUrl = `https://wa.me/971589131001?text=${waText}`;

    // Prompt user with direct WhatsApp or Email routing
    setTimeout(() => {
      const confirmOpen = confirm(`Would you like to send this inquiry directly to Muthoo Raman via WhatsApp now?`);
      if (confirmOpen) {
        window.open(waUrl, '_blank');
      } else {
        const mailUrl = `mailto:muthuraman7788@gmail.com?subject=Casting%20Inquiry%3A%20${encodeURIComponent(projectType)}%20-%20${encodeURIComponent(name)}&body=${waText}`;
        window.location.href = mailUrl;
      }
      form.reset();
    }, 600);
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}

/* ==========================================================================
   9. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.credit-card, .archetype-card, .tvc-card, .stage-card, .article-card, .vital-stat-box'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
