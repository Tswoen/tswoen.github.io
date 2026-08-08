;(function () {
  var headerRoots = document.querySelectorAll('[data-site-header]');

  if (!headerRoots.length) {
    return;
  }

  var defaults = {
    name: '汤武 （Miles)',
    subtitlePrefix: "I'm ",
    headerClass: 'header-top',
    active: '',
    basePath: '',
    resumeUrl: 'https://drive.google.com/file/d/1pT-Nk6AxY9ZOWBizuDb4htA3IiUF_fSe/view?usp=sharing',
    socialLinks: [
      { href: 'https://www.linkedin.com/in/rajaprerak', className: 'linkedin', icon: 'bxl-linkedin' },
      { href: 'https://www.github.com/rajaprerak', className: 'github', icon: 'bxl-github' },
      { href: 'mailto:rajaprerak@gmail.com', className: 'google', icon: 'bxl-google' }
    ]
  };

  var navItems = [
    { key: 'home', label: 'Home', path: 'index.html' },
    { key: 'about', label: 'About', path: 'pages/about.html' },
    { key: 'experience', label: 'Experience', path: 'pages/Experience.html' },
    { key: 'projects', label: 'Projects', path: 'pages/Blog.html' },
    { key: 'moments', label: 'Moments', path: 'pages/Moments.html' },
    { key: 'photo', label: 'Photo', path: 'pages/photo.html' },
    { key: 'resume', label: 'Resume', external: true }
  ];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizePathname(pathname) {
    return (pathname || '').replace(/\\/g, '/').toLowerCase();
  }

  function getDefaultBasePath(pathname) {
    if (pathname.indexOf('/pages/') !== -1 || pathname.indexOf('/projects/') !== -1) {
      return '..';
    }

    return '.';
  }

  function isRootLikePage(pathname) {
    var normalizedPath = pathname.replace(/\/+$/, '');
    var lastSegment = normalizedPath.split('/').pop();

    if (pathname.indexOf('/pages/') !== -1 || pathname.indexOf('/projects/') !== -1) {
      return false;
    }

    if (!normalizedPath) {
      return true;
    }

    return lastSegment === 'index.html' || lastSegment.indexOf('.') === -1;
  }

  function getDefaultHeaderClass(pathname) {
    if (isRootLikePage(pathname)) {
      return 'header-tops';
    }

    return 'header-top';
  }

  function getDefaultActive(pathname) {
    var normalizedPath = pathname.replace(/\/+$/, '');

    if (pathname.indexOf('/projects/') !== -1 && /\/index\.html$/.test(normalizedPath)) {
      return 'projects';
    }

    if (isRootLikePage(pathname)) {
      return 'home';
    }

    if (/\/pages\/about\.html$/.test(normalizedPath)) {
      return 'about';
    }

    if (/\/pages\/experience\.html$/.test(normalizedPath)) {
      return 'experience';
    }

    if (/\/pages\/blog\.html$/.test(normalizedPath)) {
      return 'projects';
    }

    if (/\/pages\/moments\.html$/.test(normalizedPath)) {
      return 'moments';
    }

    if (/\/pages\/photo\.html$/.test(normalizedPath)) {
      return 'photo';
    }

    return '';
  }

  function resolveHref(path, basePath) {
    if (!path) {
      return '';
    }

    if (basePath === '.' || basePath === '') {
      return path;
    }

    return basePath + '/' + path;
  }

  function renderNav(activeKey, basePath) {
    return navItems.map(function (item) {
      var isActive = item.key === activeKey ? ' class="active"' : '';
      var href = item.external ? defaults.resumeUrl : resolveHref(item.path, basePath);
      var target = item.external ? ' target="_blank"' : '';

      return '<li' + isActive + '><a href="' + escapeHtml(href) + '"' + target + '><span>' + escapeHtml(item.label) + '</span></a></li>';
    }).join('');
  }

  function renderSocialLinks() {
    return defaults.socialLinks.map(function (item) {
      return '<a href="' + escapeHtml(item.href) + '" target="_blank" class="' + escapeHtml(item.className) + '"><i class="bx ' + escapeHtml(item.icon) + '"></i></a>';
    }).join('');
  }

  function renderHeader(root) {
    var pathname = normalizePathname(window.location.pathname);
    var basePath = root.getAttribute('data-base-path') || getDefaultBasePath(pathname);
    var headerClass = root.getAttribute('data-header-class') || getDefaultHeaderClass(pathname);
    var active = root.getAttribute('data-active') || getDefaultActive(pathname);
    var name = root.getAttribute('data-name') || defaults.name;

    root.innerHTML = [
      '<header id="header" class="' + escapeHtml(headerClass) + '">',
      '  <div class="container">',
      '    <h1><a href="' + escapeHtml(resolveHref('index.html', basePath)) + '">' + escapeHtml(name) + '</a></h1>',
      '    <h2 style="color:#fff">' + escapeHtml(defaults.subtitlePrefix) + '<span class="typing" style="color:#12D640"></span></h2>',
      '    <nav class="nav-menu d-none d-lg-block">',
      '      <ul>',
      '        ' + renderNav(active, basePath),
      '      </ul>',
      '    </nav><!-- .nav-menu -->',
      '',
      '    <div class="social-links">',
      '      ' + renderSocialLinks(),
      '    </div>',
      '  </div>',
      '</header><!-- End Header -->'
    ].join('\n');
  }

  for (var index = 0; index < headerRoots.length; index += 1) {
    renderHeader(headerRoots[index]);
  }
})();
