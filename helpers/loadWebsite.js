import { loadBlocks } from "./loadBlocks.js";
import { loadNavigation } from "./loadNavigation.js";

const loadWebsite = async () => {

    const navigation = await loadNavigation();
    
    return `
        <html>
            <head>
                <title>Alejandro Lecot</title>
                
                <meta name="description" content="Blog personal de Alejandro Lecot">
                <meta name="keywords" content="blog, personal, alejandro, lecot">
                <meta name="author" content="Felipe Lecot">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="icon" href="/assets/favicon.ico">

                <meta property="og:title" content="Alejandro Lecot">
                <meta property="og:description" content="Blog personal de Alejandro Lecot">
                <meta property="og:image" content="https://alejandrolecot.com/assets/header.png">
                <meta property="og:url" content="https://alejandrolecot.com">
                <meta property="og:type" content="website">

                <meta name="twitter:card" content="summary_large_image">
                <meta name="twitter:title" content="Alejandro Lecot">
                <meta name="twitter:description" content="Blog personal de Alejandro Lecot">
                <meta name="twitter:image" content="https://alejandrolecot.com/assets/header.png">
                <meta name="twitter:url" content="https://alejandrolecot.com">

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <link rel="stylesheet" href="/assets/website/styles.css">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </head>
            <body>
                <nav class="nav-bar">
                    <img alt="Logo Alejandro Lecot" src="/assets/logo.png" width="300" height="25">
                    <ul class="navbar-items">
                        ${navigation}
                    </ul>
                    <div class="sidebar-hamburger">
                        <button class="navbar-toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </nav>
                <div class="sidebar-backdrop"></div>  
                <nav class="sidebar">
                    <img alt="Logo Alejandro Lecot" src="/assets/logo.png" width="300" height="25">
                    <ul>
                        ${navigation}
                    </ul>
                </nav>

                <main class="content">
                    ${await loadBlocks()}
                </main>
                <footer>
                    <p>© ${new Date().getFullYear()} Alejandro Lecot. Todos los derechos reservados.</p>
                    <div class="credits">
                        <div>
                            <img alt="Logo Felipe Lecot" src="/assets/felipelecot.png" width="50" height="50"> 
                            <p>Este sito fue desarrollado y diseñado por <a class="felipelecot" href="https://www.felipelecot.com?ref=alejandrolecot.com" target="_blank">Felipe Lecot</a>.</p>
                        </div>
                        <p>Usa el código desde <a class="github" href="https://github.com/FelipeLecot/self-managed-one-page-blog" target="_blank">GitHub</a>.</p>
                    </div>
                </footer>
                <div class="image-overlay">
                    <img alt="Imagen" src="">
                    <div class="image-overlay-backdrop"></div>
                </div>
            </body>
            <script src="/assets/website/scripts.js"></script>
        </html>
    `
}

export default loadWebsite;