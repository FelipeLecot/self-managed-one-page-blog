import { escapeStrings } from "../escapeStrings.js";
import prisma from "../prisma.js";
import fs from "fs";

const createImageListItem = (image) => {
    return `<li>
            <a href="/assets/images/${image.name}" target="_blank">${image.name}</a>
            <p>${image.description}</p>
            <p>${(new Date(image.dateCreated)).toISOString().split('.')[0].replace("T", " ")}</p>
            <div class="controls">
                <button class="remove" onclick="deleteImageForm('${image.id}')">Eliminar</button>
                <button class="update" onclick="updateImageForm('${image.id}', '${escapeStrings(image.name)}', '${escapeStrings(image.description)}')">Actualizar</button>
            </div>
        </li>`;
}

const createImageList = (images) => {
    let imageListEl = `<button class="create" onclick="createImageForm()">Crear Imagen</button><ul class="images"><li><p>Nombre</p><p>Descripción</p><p>Fecha de creación</p><p>Acciones</p></li>`;
    images.forEach(image => {
        imageListEl += createImageListItem(image);
    });
    imageListEl += `</ul>`;
    return imageListEl;
}

export const get = async () => {
    try {
        const images = await prisma.image.findMany();
    
        return createImageList(images);
    }
    catch (e) {
        console.log(e)
        return `<p>Error</p>`;
    }
}

export const create = async (data, image) => {
    try {
        const { name, description } = data;
        if (name, image) {
            const imageExtension = image.originalname.split('.').pop();
            const imageName = data.name + "." + imageExtension;

            const checkImageName = await prisma.image.findMany({
                where: {
                    name: imageName
                }
            });
            const filePath = `assets/images/${imageName}`;
            const checkIfImageExists = fs.existsSync(filePath);
            if (checkImageName.length > 0 || checkIfImageExists) {
                return `<p>La imagen ya existe</p>`;
            }

            const imageEntry = await prisma.image.create({
                data: {
                    name: imageName,
                    description
                }
            });
            if (!imageEntry) {
                return `<p>Error al crear la imagen</p>`;
            }

            const imagePath = 'assets/images/' + imageName;
            const moveFromTempPathImage = fs.renameSync(image.path, imagePath);

            return createImageListItem(imageEntry);
        }
        else {
            return `<p>Missing data</p>`;
        }
    } catch (error) {
        console.log(error)
        return `<p>Error</p>`;
    }
}

export const update = async (data) => {
    try {
        const { name, description, id } = data;
        
        const image = await prisma.image.findMany({
            where: {
                id: parseInt(id)
            }
        })
    
        fs.renameSync(`assets/images/${image[0].name}`, `assets/images/${name}`);
        
        const newImage = await prisma.image.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                description
            }
        })
        
        const images = await prisma.image.findMany();
    
        return createImageList(images);
    }
    catch (e) {
        console.log(e)
        return `<p>Error</p>`;
    }
}

export const remove = async (id) => {
    try {
        if (!id) {
            return "<p>No se recibio ninguna imagen</p>"
        }
    
        const deleteImage = await prisma.image.delete({
            where: {
                id: parseInt(id)
            }
        })
    
        fs.unlinkSync(`assets/images/${deleteImage.name}`);
    
        const images = await prisma.image.findMany();
    
        return createImageList(images);
    }
    catch (e) {
        console.log(e)
        return `<p>Error</p>`;
    }
}

export const getGallery = async (data) => {
    try {
        const { blockId } = data;

        let galleryIds = [];

        if (!blockId) {
            const availableImages = await prisma.image.findMany();

            let multipleSelectEl = availableImages.map(image => {
                return `<div class="image-option">
                <img src="/assets/images/${image.name}" alt="${image.name}">
                <input type="checkbox" name="gallery" value="${image.id}"></div>`;
            });

            return multipleSelectEl.join("");
        }
        
        const gallery = await prisma.gallery.findMany({
            where: {
                blockId: parseInt(blockId)
            }
        });
        
        galleryIds = gallery.map(image => image.imageId);

        const availableImages = await prisma.image.findMany();

        let multipleSelectEl = availableImages.map(image => {
            console.log(image.id, galleryIds.includes(image.id));
            return `<div class="image-option">
            <img src="/assets/images/${image.name}" alt="${image.name}">
            <input type="checkbox" ${galleryIds.includes(image.id) ? "checked" : ""} id="image-${image.id}" name="gallery" value="${image.id}"></div>`;
        });

        return multipleSelectEl.join("");
    }
    catch (e) {
        console.log(e);
        return `<p>Error</p>`;
    }
}
