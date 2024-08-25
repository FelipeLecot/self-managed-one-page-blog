const hideOverlays = () => {
    [...document.querySelectorAll('.overlay-backdrop, .create-form, .delete-form, .update-form')].forEach(el => el.classList.remove('overlay-show'));
}

document.querySelector('.overlay-backdrop').addEventListener('click', () => {
    hideOverlays();
});

/* File Forms */

const createFileForm = () => {
    document.querySelector('.create-form').innerHTML = `
        <form id="create-form" hx-encoding="multipart/form-data" hx-post="/wp/api/file" hx-trigger="submit" hx-target=".files" hx-swap="beforeend" hx-on::after-request="hideOverlays()">
            <label for="name">Nombre:</label>
            <input type="text" name="name" id="name" required>
            <label for="description">Descripcion:</label>
            <input type="text" name="description" id="description">
            <label for="file">Subir archivo:</label>
            <input type="file" name="file" id="file" required>
            <button id="submit">Crear</button>
        </form>
    `

    htmx.process(document.querySelector('.create-form'));

    document.querySelector('.create-form').classList.add('overlay-show');
    document.querySelector('.overlay-backdrop').classList.add('overlay-show');
}

const updateFileForm = (id, name, description) => {
    document.querySelector('.update-form').innerHTML = `
        <form id="update-form" hx-trigger="submit" hx-put="/wp/api/file" hx-target=".content" hx-swap="innerHTML" hx-on::after-request="hideOverlays()">
            <input type="hidden" name="id" value="${id}" required>
            <label for="name">Nombre:</label>
            <input type="text" name="name" id="name" value="${name}" required>
            <label for="description">Descripcion:</label>
            <input type="text" name="description" id="description" value="${description}">
            <button id="submit">Actualizar</button>
        </form>
    `

    htmx.process(document.querySelector('.update-form'));

    document.querySelector('.update-form').classList.add('overlay-show');
    document.querySelector('.overlay-backdrop').classList.add('overlay-show');
}

const deleteFileForm = (id) => {
    document.querySelector('.delete-form').innerHTML = `
        <form id="delete-form" hx-delete="/wp/api/file" hx-trigger="submit" hx-target=".content" hx-swap="innerHTML" hx-on="htmx:afterRequest:removeOverlay">
            <p>¿Estas seguro que queres eliminar este archivo?</p>
            <input type="hidden" name="id" value="${id}" required>
            <button class="delete-confirm" id="submit">Eliminar</button>
            <button class="delete-cancel" onclick="hideOverlays()">Cancelar</button>
        </form>
    `

    htmx.process(document.querySelector('.delete-form'));

    document.querySelector('.delete-form').classList.add('overlay-show');
    document.querySelector('.overlay-backdrop').classList.add('overlay-show');
}

/* Image Forms */

const createImageForm = () => {
    document.querySelector('.create-form').innerHTML = `
        <form id="create-form" hx-post="/wp/api/image" hx-encoding="multipart/form-data" hx-trigger="submit" hx-target=".images" hx-swap="beforeend" hx-on::after-request="hideOverlays()">
            <label for="name">Nombre:</label>
            <input type="text" name="name" id="name" required>
            <label for="description">Descripcion:</label>
            <input type="text" name="description" id="description">
            <label for="file">Subir archivo:</label>
            <input type="file" name="file" id="file" required>
            <button id="submit">Crear</button>
        </form>
    `

    htmx.process(document.querySelector('.create-form'));

    document.querySelector('.create-form').classList.add('overlay-show');
    document.querySelector('.overlay-backdrop').classList.add('overlay-show');
}

const updateImageForm = (id, name, description) => {
    document.querySelector('.update-form').innerHTML = `
        <form id="update-form" hx-trigger="submit" hx-put="/wp/api/image" hx-target=".content" hx-swap="innerHTML" hx-on::after-request="hideOverlays()">
            <input type="hidden" name="id" value="${id}" required>
            <label for="name">Nombre:</label>
            <input type="text" name="name" id="name" value="${name}" required>
            <label for="description">Descripcion:</label>
            <input type="text" name="description" id="description" value="${description}">
            <button id="submit">Actualizar</button>
        </form>
    `

    htmx.process(document.querySelector('.update-form'));

    document.querySelector('.update-form').classList.add('overlay-show');
    document.querySelector('.overlay-backdrop').classList.add('overlay-show');
}

const deleteImageForm = (id) => {
    document.querySelector('.delete-form').innerHTML = `
        <form id="delete-form" hx-delete="/wp/api/image" hx-trigger="submit" hx-target=".content" hx-swap="innerHTML" hx-on::after-request="hideOverlays()">
            <p>¿Estas seguro que queres eliminar este archivo?</p>
            <input type="hidden" name="id" value="${id}" required>
            <button class="delete-confirm" id="submit">Eliminar</button>
            <button class="delete-cancel" onclick="hideOverlays()">Cancelar</button>
        </form>
    `

    htmx.process(document.querySelector('.delete-form'));

    document.querySelector('.delete-form').classList.add('overlay-show');
    document.querySelector('.overlay-backdrop').classList.add('overlay-show');
}

/* Navigation Forms */

const createNavigationForm = () => {
    document.querySelector('.create-form').innerHTML = `
        <span hx-target="#block-select" hx-get="/wp/api/block" hx-swap="beforeend" hx-trigger="load"></span>
        <form id="create-form" hx-post="/wp/api/navigation" hx-trigger="submit" hx-target=".navigation" hx-swap="beforeend" hx-on::after-request="hideOverlays()">
            <label for="name">Nombre:</label>
            <input type="text" name="name" id="name" required>
            <label for="url">URL:</label>
            <input type="text" name="url" id="url">
            <label for="order">Orden:</label>
            <input type="number" name="order" id="order" required>
            <label for="block-select">Bloque:</label>
            <select name="block" id="block-select">
                <option>Ninguno</option>
            </select>
            <button id="submit">Crear</button>
        </form>
    `

    htmx.process(document.querySelector('.create-form'));

    document.querySelector('.create-form').classList.add('overlay-show');
    document.querySelector('.overlay-backdrop').classList.add('overlay-show');
}

const updateNavigationForm = (id, name, url, order, blockId) => {
    document.querySelector('.update-form').innerHTML = `
        <span hx-target="#block-select" hx-get="/wp/api/block?id=${blockId}" hx-swap="beforeend" hx-trigger="load"></span>
        <form id="update-form" hx-trigger="submit" hx-put="/wp/api/navigation" hx-target=".content" hx-swap="innerHTML" hx-on::after-request="hideOverlays()">
            <input type="hidden" name="id" value="${id}" required>
            <label for="name">Nombre:</label>
            <input type="text" name="name" id="name" value="${name}" required>
            <label for="url">URL:</label>
            <input type="text" name="url" id="url" value="${url}">
            <label for="url">Orden:</label>
            <input type="number" name="order" id="number" value="${order}" required>
            <label for="block-select">Bloque:</label>
            <select name="block" id="block-select">
                <option>Ninguno</option>
            </select>
            <button id="submit">Actualizar</button>
        </form>
    `

    htmx.process(document.querySelector('.update-form'));

    document.querySelector('.update-form').classList.add('overlay-show');
    document.querySelector('.overlay-backdrop').classList.add('overlay-show');
}

const deleteNavigationForm = (id) => {
    document.querySelector('.delete-form').innerHTML = `
        <form id="delete-form" hx-delete="/wp/api/navigation" hx-trigger="submit" hx-target=".content" hx-swap="innerHTML" hx-on::after-request="hideOverlays()">
            <p>¿Estas seguro que queres eliminar este enlace?</p>
            <input type="hidden" name="id" value="${id}" required>
            <button class="delete-confirm" id="submit">Eliminar</button>
            <button class="delete-cancel" onclick="hideOverlays()">Cancelar</button>
        </form>
    `

    htmx.process(document.querySelector('.delete-form'));

    document.querySelector('.delete-form').classList.add('overlay-show');
    document.querySelector('.overlay-backdrop').classList.add('overlay-show');
}

/* Block Forms */

const createBlockForm = () => {
    document.querySelector('.create-form').innerHTML = `
        <span hx-get="/wp/api/image" hx-target=".gallery-option-cont" hx-swap="innerHTML" hx-trigger="load"></span>
        <form id="create-form" hx-post="/wp/api/block" hx-trigger="submit" hx-target=".blocks" hx-swap="beforeend" hx-on::after-request="hideOverlays()">
            <label for="slug">Nombre:</label>
            <input type="text" name="slug" id="slug" required>
            <label for="heading">Titulo:</label>
            <input type="text" name="heading" id="heading" required>
            <label for="content">Contenido:</label>
            <textarea name="content" id="content" required></textarea>
            <label for="order">Orden:</label>
            <input type="number" name="order" id="order" required>
            <label for="color">Color:</label>
            <select name="color" id="color" required>
                <option value="cyan" selected>Celeste</option>
                <option value="grey">Gris</option>
                <option value="white">Blanco</option>
            </select>
            <label for="gallery">Galeria:</label>
            <div id="gallery">
                <div class="gallery-option-cont">    
                    <p>Cargando...</p>
                </div>
            </div>
            <button id="submit">Crear</button>
        </form>
    `

    new FroalaEditor("#content")

    htmx.process(document.querySelector('.create-form'));

    document.querySelector('.create-form').classList.add('overlay-show');
    document.querySelector('.overlay-backdrop').classList.add('overlay-show');
}

const updateBlockForm = (id, slug, heading, content, order, color) => {
    document.querySelector('.update-form').innerHTML = `
        <span hx-get="/wp/api/image?blockId=${id}" hx-target=".gallery-option-cont" hx-swap="innerHTML" hx-trigger="load"></span>
        <form id="update-form" hx-trigger="submit" hx-put="/wp/api/block" hx-target=".content" hx-swap="innerHTML" hx-on::after-request="hideOverlays()">
            <input type="hidden" name="id" value="${id}" required>
            <label for="slug">Nombre:</label>
            <input type="text" name="slug" id="slug" value="${slug}" required>
            <label for="heading">Titulo:</label>
            <input type="text" name="heading" id="heading" value="${heading}" required>
            <label for="content">Contenido:</label>
            <textarea name="content" id="content" required>${content}</textarea>
            <label for="order">Orden:</label>
            <input type="number" name="order" id="order" value="${order}" required>
            <label for="color">Color:</label>
            <select name="color" id="color" required>
                <option value="cyan" ${color === 'cyan' ? 'selected' : ''}>Celeste</option>
                <option value="grey" ${color === 'grey' ? 'selected' : ''}>Gris</option>
                <option value="white" ${color === 'white' ? 'selected' : ''}>Blanco</option>
            </select>
            <label for="gallery">Galeria:</label>
            <div id="gallery">
                <div class="gallery-option-cont">    
                    <p>Cargando...</p>
                </div>
            </div>
            <button id="submit">Actualizar</button>
        </form>
    `
    
    new FroalaEditor("#content")

    htmx.process(document.querySelector('.update-form'));

    document.querySelector('.update-form').classList.add('overlay-show');
    document.querySelector('.overlay-backdrop').classList.add('overlay-show');
}

const deleteBlockForm = (id) => {
    document.querySelector('.delete-form').innerHTML = `
        <form id="delete-form" hx-delete="/wp/api/block" hx-trigger="submit" hx-target=".content" hx-swap="innerHTML" hx-on::after-request="hideOverlays()">
            <p>¿Estas seguro que queres eliminar este bloque?</p>
            <input type="hidden" name="id" value="${id}" required>
            <button class="delete-confirm" id="submit">Eliminar</button>
            <button class="delete-cancel" onclick="hideOverlays()">Cancelar</button>
        </form>
    `

    htmx.process(document.querySelector('.delete-form'));

    document.querySelector('.delete-form').classList.add('overlay-show');
    document.querySelector('.overlay-backdrop').classList.add('overlay-show');
}