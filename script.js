const projects = [
  { id: 'superdisco', src: 'assets/superdisco.png', video: 'assets/event-poster-animation.m4v', title: 'Superdisco', filter: 'campaign', filters: ['campaign', 'video'], category: 'Animated event poster', year: '2024' },
  { id: 'midnight-rider', src: 'assets/cowboy-rider.webp', video: 'assets/visual-identity-cowboy.m4v', title: 'Midnight Rider', filter: 'identity', filters: ['identity', 'video'], category: 'Visual identity', year: '2026' },
  { id: 'video-concept', src: 'assets/eat-play-love-helmich.jpeg', video: 'assets/video-cut-edit.m4v', title: 'Video Concept → Cut', filter: 'video', category: 'Concept / Production', year: '2025' },
  { id: 'berlin-rider', src: 'assets/berlin-rider.png', title: 'Berlin Rider', filter: 'identity', category: 'Visual concept', year: '2026' },
  { id: 'freiboitar', src: 'assets/freiboitar-epl.png', heroVideo: 'assets/freiboitar-artist-identity.m4v', title: 'Freiboitar', filter: 'identity', category: 'Artist identity', year: '2026' },
  { id: 'spicy-tofu', src: 'assets/spicy-tofu-minimal.jpg', title: 'Spicy Tofu Crunch', filter: 'identity', category: 'Food identity', year: '2026' },
  { id: 'epl-festival', src: 'assets/epl-festival.jpg', title: 'Eat Play Love Festival', filter: 'campaign', category: 'Campaign design', year: '2026' },
  { id: 'secret-lineup', src: 'assets/open-air-lineup.jpeg', title: 'Secret Lineup', filter: 'campaign', category: 'Campaign design', year: '2026' },
  { id: 'summergrooves', src: 'assets/superdisco-summergrooves.jpg', title: 'Superdisco Summergrooves', filter: 'campaign', category: 'Event poster', year: '2024' },
  { id: 'earth-n-days', src: 'assets/earth-n-days.png', title: 'Earth N Days Remix', filter: 'motion', category: 'Motion / Artwork', year: '2026' },
  { id: 'dejala-venir', src: 'assets/dejala-venir.png', title: 'Déjala Venir', filter: 'motion', category: 'Music artwork', year: '2026' },
  { id: 'traxsource', src: 'assets/traxsource-top10.png', title: 'Traxsource Top 10', filter: 'motion', category: 'Music / Motion', year: '2026' },
  { id: 'featured-video-01', video: 'assets/featured-video-01.m4v', title: 'Creative Film 01', filter: 'video', category: 'Video concept / Production', year: '2026' },
  { id: 'featured-video-02', video: 'assets/featured-video-02.m4v', title: 'Creative Film 02', filter: 'video', category: 'Creative direction / Film', year: '2026' },
  { id: 'featured-video-03', video: 'assets/featured-video-03.m4v', title: 'Creative Film 03', filter: 'video', category: 'Moving image / Production', year: '2026' },
  { id: 'featured-video-04', video: 'assets/featured-video-04.m4v', title: 'Superdisco — Claus Casper', filter: 'video', category: 'Animated event campaign', year: '2026' },
  { id: 'spotify-canvas-01', video: 'assets/spotify-canvas-01.m4v', title: 'Spotify Canvas 01', filter: 'video', category: 'Music visual / Spotify Canvas', year: '2026', work: false },
  { id: 'spotify-canvas-02', video: 'assets/spotify-canvas-02.m4v', title: 'Spotify Canvas 02', filter: 'video', category: 'Music visual / Spotify Canvas', year: '2026', work: false },
  { id: 'spotify-canvas-03', video: 'assets/spotify-canvas-03.m4v', title: 'Spotify Canvas 03', filter: 'video', category: 'Music visual / Spotify Canvas', year: '2026', work: false },
];

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const lightbox = document.querySelector('#lightbox');
const projectStack = document.querySelector('.project-stack');
const workProjects = projects.filter((project) => project.work !== false);

function getProjectFilters(project) {
  return project.filters || [project.filter];
}

function findProject(id) {
  return projects.find((project) => project.id === id);
}

function createProjectMedia(project) {
  if (project.video) {
    const video = document.createElement('video');
    video.src = project.video;
    video.poster = project.src;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-label', `${project.title} video preview`);
    return video;
  }

  const image = document.createElement('img');
  image.src = project.src;
  image.alt = project.title;
  image.loading = 'lazy';
  return image;
}

function buildWorkProjects() {
  const tones = ['pink', 'dark', 'blue', 'orange', 'cobalt'];
  const fragment = document.createDocumentFragment();

  workProjects.forEach((project, index) => {
    const article = document.createElement('article');
    article.className = `project project-poster project-${tones[index % tones.length]}`;
    article.dataset.category = getProjectFilters(project).join(' ');

    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.projectId = project.id;
    button.setAttribute('aria-label', `Open ${project.title} project`);
    button.append(createProjectMedia(project));

    const arrow = document.createElement('span');
    arrow.className = 'project-arrow';
    arrow.textContent = '→';
    button.append(arrow);

    const footer = document.createElement('footer');
    const number = document.createElement('b');
    const category = document.createElement('span');
    const year = document.createElement('span');
    number.textContent = `${String(index + 1).padStart(2, '0')} — ${project.title}`;
    category.textContent = project.category;
    year.textContent = project.year;
    footer.append(number, category, year);
    article.append(button, footer);
    fragment.append(article);
  });

  projectStack.replaceChildren(fragment);
}

buildWorkProjects();

document.querySelectorAll('[data-filter]').forEach((button) => {
  const filter = button.dataset.filter;
  const count = filter === 'all'
    ? workProjects.length
    : workProjects.filter((project) => getProjectFilters(project).includes(filter)).length;
  button.querySelector('span').textContent = filter === 'all' ? String(count) : String(count).padStart(2, '0');
});

function syncPosterMediaAspect(media) {
  const syncAspectRatio = () => {
    const isVideo = media.tagName === 'VIDEO';
    const width = isVideo ? media.videoWidth : media.naturalWidth;
    const height = isVideo ? media.videoHeight : media.naturalHeight;
    if (!width || !height) return;
    const poster = media.closest('.poster');
    if (poster) poster.style.aspectRatio = `${width} / ${height}`;
  };
  const event = media.tagName === 'VIDEO' ? 'loadedmetadata' : 'load';
  media.addEventListener(event, syncAspectRatio, { once: true });
  if ((media.tagName === 'VIDEO' && media.readyState >= 1) || (media.tagName === 'IMG' && media.complete)) syncAspectRatio();
}

function createHeroMedia(project) {
  const videoSource = project.heroVideo || project.video;
  if (videoSource) {
    const video = document.createElement('video');
    video.src = videoSource;
    if (project.src && !project.heroVideo) video.poster = project.src;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-label', `${project.title} video preview`);
    return video;
  }

  const image = document.createElement('img');
  image.src = project.src;
  image.alt = project.title;
  return image;
}

const heroSelections = {
  graphic: [
    { id: 'superdisco', label: 'Event<br>poster' },
    { id: 'featured-video-04', label: 'Event<br>motion design' },
    { id: 'epl-festival', label: 'Festival<br>campaign' },
  ],
  video: [
    { id: 'featured-video-01', label: 'Creative<br>film 01' },
    { id: 'featured-video-02', label: 'Creative<br>film 02' },
    { id: 'featured-video-03', label: 'Creative<br>film 03' },
  ],
  identity: [
    { id: 'midnight-rider', label: 'Visual<br>identity' },
    { id: 'berlin-rider', label: 'Visual<br>concept' },
    { id: 'freiboitar', label: 'Artist<br>identity' },
  ],
  canvas: [
    { id: 'spotify-canvas-01', label: 'Spotify<br>Canvas 01' },
    { id: 'spotify-canvas-02', label: 'Spotify<br>Canvas 02' },
    { id: 'spotify-canvas-03', label: 'Spotify<br>Canvas 03' },
  ],
};

function updateHeroGallery(filter) {
  const selections = heroSelections[filter];
  const posters = [...document.querySelectorAll('.poster')];
  const annotations = [...document.querySelectorAll('.annotation')];
  const arrows = ['↘', '↙', '↘'];

  selections.forEach((selection, index) => {
    const project = findProject(selection.id);
    const poster = posters[index];
    const oldMedia = poster.querySelector('img, video');
    if (oldMedia?.tagName === 'VIDEO') oldMedia.pause();
    oldMedia?.remove();
    const media = createHeroMedia(project);
    poster.append(media);
    syncPosterMediaAspect(media);
    poster.dataset.projectId = project.id;
    poster.setAttribute('aria-label', `Open ${project.title} project`);
    annotations[index].innerHTML = `<b>${String(index + 1).padStart(2, '0')}</b> ${selection.label} <span>${arrows[index]}</span>`;
    poster.animate(
      [{ transform: 'translateY(24px) rotate(-2deg)', opacity: .35 }, { transform: '', opacity: 1 }],
      { duration: 520 + index * 90, easing: 'cubic-bezier(.2,.75,.2,1)' }
    );
  });
}

document.querySelectorAll('.poster img, .poster video').forEach(syncPosterMediaAspect);
updateHeroGallery('graphic');

menuToggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('span').textContent = open ? '×' : '+';
});

document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('span').textContent = '+';
}));

function openProject(id) {
  const project = findProject(id);
  if (!project) return;

  const image = lightbox.querySelector('img');
  const video = lightbox.querySelector('video');
  const videoSource = project.video || project.heroVideo;
  const usesHeroVideo = !project.video && Boolean(project.heroVideo);
  image.hidden = Boolean(videoSource);
  video.hidden = !videoSource;

  if (videoSource) {
    image.removeAttribute('src');
    if (project.src && !usesHeroVideo) video.poster = project.src;
    else video.removeAttribute('poster');
    video.src = videoSource;
    video.muted = usesHeroVideo;
  } else {
    video.pause();
    video.removeAttribute('src');
    video.load();
    image.src = project.src;
    image.alt = project.title;
  }

  lightbox.querySelector('h2').textContent = project.title;
  lightbox.querySelector('p').textContent = project.category;
  lightbox.querySelector('.lightbox-number').textContent = String(projects.indexOf(project) + 1).padStart(2, '0');
  lightbox.querySelector('.lightbox-year').textContent = project.year;
  lightbox.showModal();
  document.body.classList.add('is-locked');
  if (videoSource) video.play().catch(() => {});
}

function closeProject() {
  const video = lightbox.querySelector('video');
  video.pause();
  lightbox.close();
  document.body.classList.remove('is-locked');
}

document.querySelectorAll('[data-project-id]').forEach((button) => {
  button.addEventListener('click', () => openProject(button.dataset.projectId));
});
lightbox.querySelector('.lightbox-close').addEventListener('click', closeProject);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeProject(); });
lightbox.addEventListener('cancel', () => document.body.classList.remove('is-locked'));

const previewObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target.querySelector('video');
    if (!video) return;
    if (entry.isIntersecting && !entry.target.hidden) video.play().catch(() => {});
    else video.pause();
  });
}, { rootMargin: '150px 0px', threshold: .2 });
document.querySelectorAll('.project').forEach((project) => previewObserver.observe(project));

const captionProjects = [...document.querySelectorAll('.project')];
const captionProjectsInFocus = new Set();

function updateActiveProjectCaption() {
  captionProjects.forEach((project) => project.classList.remove('is-caption-active', 'is-background', 'is-near-background'));
  if (projectStack.classList.contains('is-filtered')) return;

  const activeProject = [...captionProjectsInFocus]
    .filter((project) => !project.hidden)
    .sort((a, b) => captionProjects.indexOf(a) - captionProjects.indexOf(b))
    .at(-1) || captionProjects.find((project) => !project.hidden);
  if (!activeProject) return;

  const activeIndex = captionProjects.indexOf(activeProject);
  activeProject.classList.add('is-caption-active');
  captionProjects.forEach((project, index) => {
    if (project.hidden || index >= activeIndex) return;
    project.classList.add('is-background');
    if (index === activeIndex - 1) project.classList.add('is-near-background');
  });
}

const captionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) captionProjectsInFocus.add(entry.target);
    else captionProjectsInFocus.delete(entry.target);
  });
  updateActiveProjectCaption();
}, { rootMargin: '-28% 0px -58%', threshold: .01 });

captionProjects.forEach((project) => captionObserver.observe(project));
updateActiveProjectCaption();

document.querySelectorAll('[data-hero-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-hero-filter]').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    updateHeroGallery(button.dataset.heroFilter);
  });
});

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    projectStack.classList.toggle('is-filtered', filter !== 'all');
    if (filter === 'all') delete projectStack.dataset.activeFilter;
    else projectStack.dataset.activeFilter = filter;
    document.querySelectorAll('.project').forEach((project) => {
      const hidden = filter !== 'all' && !project.dataset.category.split(' ').includes(filter);
      project.hidden = hidden;
      if (hidden) project.querySelector('video')?.pause();
      if (!hidden && filter !== 'all') {
        project.animate(
          [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 420, easing: 'cubic-bezier(.2,.75,.2,1)' }
        );
      }
    });
    updateActiveProjectCaption();
    requestAnimationFrame(() => window.ScrollTrigger?.refresh());
  });
});

const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55%' });
sections.forEach((section) => sectionObserver.observe(section));

if (!reduceMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.wordmark, .site-nav a', { y: -25, opacity: 0, duration: .65, stagger: .05 })
    .from('.hero h1 span', { yPercent: 105, opacity: 0, duration: .8, stagger: .08 }, '-=.35')
    .from('.hero-services, .hero-meta, .scribble-cta', { y: 25, opacity: 0, duration: .55, stagger: .08 }, '-=.45')
    .from('.poster', { y: 100, rotation: 8, opacity: 0, duration: .9, stagger: .12 }, '-=.75')
    .from('.annotation, .hero-about', { opacity: 0, duration: .5, stagger: .08 }, '-=.4');

  gsap.to('.poster-one', { yPercent: -15, rotation: -3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.to('.poster-two', { yPercent: -28, rotation: 3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.to('.poster-three', { yPercent: -42, rotation: -4, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.from('.work-header h2', { xPercent: -12, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.work-header', start: 'top 88%', end: 'top 35%', scrub: 1 } });

  document.querySelectorAll('.project').forEach((project, index) => {
    gsap.fromTo(project, { scale: .9, y: 70, rotation: index % 2 ? 3 : -3 }, {
      scale: 1,
      y: 0,
      rotation: index % 2 ? .5 : -.5,
      ease: 'none',
      scrollTrigger: { trigger: project, start: 'top 95%', end: 'top 27%', scrub: 1 }
    });
  });

  gsap.to('.record-stack img:nth-child(1)', { y: -110, rotation: -13, ease: 'none', scrollTrigger: { trigger: '.music', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to('.record-stack img:nth-child(2)', { y: 70, rotation: 14, ease: 'none', scrollTrigger: { trigger: '.music', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to('.record-stack img:nth-child(3)', { y: -45, rotation: 3, ease: 'none', scrollTrigger: { trigger: '.music', start: 'top bottom', end: 'bottom top', scrub: 1 } });
}
