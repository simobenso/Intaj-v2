(function () {
    const TARGET_HASH = "419c28eea959dd6a409857b6ddb763a9c942ad95605dc9a3c9ffde3e29f75ab0";
    const AUTH_KEY = "is_authenticated_saham_v2";

    // Create a style element to hide the body immediately
    const style = document.createElement('style');
    style.id = 'auth-style';
    style.innerHTML = 'body { display: none !important; }';
    document.head.appendChild(style);

    async function hash(string) {
        const utf8 = new TextEncoder().encode(string);
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    async function checkAuth() {
        // If already authenticated in this session/browser
        if (localStorage.getItem(AUTH_KEY) === 'true') {
            removeAuthDetails();
            return;
        }

        let authenticated = false;
        while (!authenticated) {
            // Needed to allow half a second for the browser to render the "hidden" state properly if we were doing this mid-load, 
            // but since prompt blocks, it's fine. 
            // However, because we need to await the hash, there's a split second where the prompt isn't there.
            // Since body is display:none, the user sees white screen (or background color).

            const password = prompt("Veuillez saisir le mot de passe pour accéder à l'application :");

            if (password === null) {
                // User cancelled. We rely on the loop or just stay hidden.
                // It's better to just reload or loop.
                continue;
            }

            const inputHash = await hash(password);

            if (inputHash === TARGET_HASH) {
                authenticated = true;
                localStorage.setItem(AUTH_KEY, 'true');
                removeAuthDetails();
            } else {
                alert("Mot de passe incorrect. Veuillez réessayer.");
            }
        }
    }

    function removeAuthDetails() {
        const styleEl = document.getElementById('auth-style');
        if (styleEl) styleEl.remove();
        // Also ensure body is visible in case it was modified directly
        document.body.style.display = '';
    }

    // Start authentication process
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAuth);
    } else {
        // Use timeout to ensure UI thread is free to render the white screen first? 
        // Not strictly necessary but safe.
        setTimeout(checkAuth, 50);
    }
})();
