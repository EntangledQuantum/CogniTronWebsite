(function () {
    const slots = document.querySelectorAll('[data-praxis-video]');

    function buildVideo(src) {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.setAttribute('aria-label', 'Praxis product video');
        return video;
    }

    function loadCandidate(slot, candidates, index) {
        if (index >= candidates.length) return;

        const probe = buildVideo(candidates[index]);
        probe.addEventListener('loadedmetadata', () => {
            slot.replaceChildren(probe);
            slot.classList.add('has-video');
        }, { once: true });

        probe.addEventListener('error', () => {
            loadCandidate(slot, candidates, index + 1);
        }, { once: true });

        probe.load();
    }

    slots.forEach((slot) => {
        try {
            const candidates = JSON.parse(slot.dataset.videoCandidates || '[]');
            if (Array.isArray(candidates) && candidates.length > 0) {
                loadCandidate(slot, candidates, 0);
            }
        } catch (error) {
            // Keep the static coming-soon fallback if candidate data is malformed.
        }
    });
})();
