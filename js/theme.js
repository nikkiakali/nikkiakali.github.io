(function () {
    var root = document.documentElement;
    var toggle = document.querySelector('.theme-switch');

    function getTheme() {
        return root.dataset.theme === 'dark' ? 'dark' : 'light';
    }

    function setTheme(theme) {
        root.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        if (toggle) {
            var isDark = theme === 'dark';
            toggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
            toggle.setAttribute('aria-label', isDark ? 'Use light mode' : 'Use dark mode');
        }
    }

    if (toggle) {
        var current = getTheme();
        toggle.setAttribute('aria-checked', current === 'dark' ? 'true' : 'false');
        toggle.setAttribute('aria-label', current === 'dark' ? 'Use light mode' : 'Use dark mode');

        toggle.addEventListener('click', function () {
            setTheme(getTheme() === 'dark' ? 'light' : 'dark');
        });
    }
})();

(function () {
    var btn = document.querySelector('.nav-toggle');
    var panel = document.querySelector('.site-header-end');
    if (!btn || !panel) return;

    btn.addEventListener('click', function () {
        var open = panel.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
})();
