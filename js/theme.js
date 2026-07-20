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
    var panel = document.getElementById('site-nav-panel') || document.querySelector('.site-header-end');
    if (!btn || !panel) return;

    var mobileQuery = window.matchMedia('(max-width: 767px)');
    var focusableSelector = 'a[href], button:not([disabled])';

    function focusables() {
        return Array.prototype.slice.call(panel.querySelectorAll(focusableSelector));
    }

    function isOpen() {
        return panel.classList.contains('is-open');
    }

    function setScrollLocked(locked) {
        document.documentElement.classList.toggle('nav-open', locked);
    }

    function setOpen(open) {
        panel.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (mobileQuery.matches) {
            setScrollLocked(open);
        } else {
            setScrollLocked(false);
        }
        if (open && mobileQuery.matches) {
            var items = focusables();
            if (items.length) {
                items[0].focus();
            }
        }
        if (!open) {
            btn.focus();
        }
    }

    function closeNav() {
        if (isOpen()) {
            setOpen(false);
        }
    }

    btn.addEventListener('click', function () {
        setOpen(!isOpen());
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeNav();
            return;
        }
        if (!isOpen() || !mobileQuery.matches || event.key !== 'Tab') {
            return;
        }
        var items = focusables();
        if (items.length === 0) {
            return;
        }
        var first = items[0];
        var last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    panel.querySelectorAll('.site-nav a').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    mobileQuery.addEventListener('change', function () {
        if (!mobileQuery.matches) {
            setScrollLocked(false);
            closeNav();
        }
    });
})();
