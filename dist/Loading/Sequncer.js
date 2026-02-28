var Sequencer = (function () {
    var config = {
        phase1Path: 'Loading/Phase 1/loadingscreen.html',
        phase2Path: 'Loading/Phase 2/phase2.html'
    };

    function loadHTML(url, containerId, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?v=' + Date.now(), true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = xhr.responseText;

                    // Execute Scripts
                    var scripts = container.querySelectorAll('script');
                    scripts.forEach(function (script) {
                        var newScript = document.createElement('script');
                        newScript.textContent = script.textContent;
                        document.head.appendChild(newScript);
                    });

                    // Load Styles
                    var links = container.querySelectorAll('link[rel="stylesheet"]');
                    links.forEach(function (link) {
                        var newLink = document.createElement('link');
                        newLink.rel = 'stylesheet';
                        newLink.href = link.href;
                        document.head.appendChild(newLink);
                    });

                    if (callback) callback();
                }
            } else {
                console.error('Failed to load ' + url);
            }
        };
        xhr.onerror = function () {
            console.error('Network error loading ' + url);
        };
        xhr.send();
    }

    function init() {
        console.log('Sequencer Initialized');

        // Ensure containers exist
        if (!document.getElementById('loader-inject-p1')) {
            var p1Div = document.createElement('div');
            p1Div.id = 'loader-inject-p1';
            document.body.appendChild(p1Div);
        }
        if (!document.getElementById('loader-inject-p2')) {
            var p2Div = document.createElement('div');
            p2Div.id = 'loader-inject-p2';
            document.body.appendChild(p2Div);
        }

        // Load Phase 1
        loadHTML(config.phase1Path, 'loader-inject-p1');

        // Load Phase 2 (Hidden initially)
        loadHTML(config.phase2Path, 'loader-inject-p2');

        // Listen for Phase Completions
        window.addEventListener('phase1-done', onPhase1Done);
    }

    function onPhase1Done() {
        console.log('Phase 1 Done. Triggering Phase 2...');
        if (window.startPhase2) {
            window.startPhase2();
        } else {
            console.error('Phase 2 script not loaded or startPhase2 missing.');
            // Fallback
            document.body.classList.remove('zl-active');
            document.body.classList.add('zl-done');
        }
    }

    return {
        init: init
    };
})();
