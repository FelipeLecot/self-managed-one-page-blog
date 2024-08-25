import * as blocks from './endpoints/blocks.js';
import * as navigation from './endpoints/navigation.js';
import * as images from './endpoints/images.js';
import * as files from './endpoints/files.js';

/*<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script><script src="https://unpkg.com/htmx.org@2.0.1"></script>*/

export const loadCMS = async (page) => {
    let pageContent = ""
    switch (page) {
        case "blocks":
            pageContent = await blocks.get()
            break;
        case "navigation":
            pageContent = await navigation.get()
            break;
        case "images":
            pageContent = await images.get()
            break;
        case "files":
            pageContent = await files.get()
            break;
        default:
            "<p>Error</p>"
    }

    return `
        <html>
            <head>
                <title>CMS | Alejandro Lecot</title>
                
                <meta name="description" content="CMS para Blog personal de Alejandro Lecot">
                <meta name="keywords" content="blog, personal, alejandro, lecot">
                <meta name="author" content="Felipe Lecot">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="icon" href="/assets/favicon.ico">

                <meta property="og:title" content="Alejandro Lecot">
                <meta property="og:description" content="Blog personal de Alejandro Lecot">
                <meta property="og:image" content="https://alejandrolecot.com/assets/header.jpg">
                <meta property="og:url" content="https://alejandrolecot.com">
                <meta property="og:type" content="website">

                <meta name="twitter:card" content="summary_large_image">
                <meta name="twitter:title" content="Alejandro Lecot">
                <meta name="twitter:description" content="Blog personal de Alejandro Lecot">
                <meta name="twitter:image" content="https://alejandrolecot.com/assets/header.jpg">
                <meta name="twitter:url" content="https://alejandrolecot.com">

                <link rel="stylesheet" href="/assets/cms/styles.css">
                <script src="https://unpkg.com/htmx.org@2.0.1"></script>
                <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/froala-editor@latest/js/froala_editor.pkgd.min.js"></script>
                <link href="https://cdn.jsdelivr.net/npm/froala-editor@latest/css/froala_editor.pkgd.min.css" rel="stylesheet" type="text/css" />
            </head>
            <body>
                <nav class="sidebar">
                    <img alt="Logo Alejandro Lecot" src="/assets/logo.png" width="300" height="25">
                    <ul>
                        <li><a href="/wp/blocks">Bloques</a></li>
                        <li><a href="/wp/navigation">Navegación</a></li>
                        <li><a href="/wp/images">Imágenes</a></li>
                        <li><a href="/wp/files">Archivos</a></li>
                        <li><a href="/">Ver Sitio</a></li>
                    </ul>
                </nav>
                <main class="content">
                    ${pageContent}
                </main>
                <div class="overlays">
                    <div class="delete-form"></div>
                    <div class="update-form"></div>
                    <div class="create-form"></div>
                    <div class="overlay-backdrop"></div>
                </div>
            </body>
            <script src="/assets/cms/scripts.js"></script>
        </html>
    `
}