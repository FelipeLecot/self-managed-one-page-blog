import { escapeStrings } from "../escapeStrings.js";
import prisma from "../prisma.js";
import fs from "fs";

const createFileListItem = (file) => {
    return `<li>
            <a href="/assets/files/${file.name}" target="_blank">${file.name}</a>
            <p>${file.description}</p>
            <p>${(new Date(file.dateCreated)).toISOString().split('.')[0].replace("T", " ")}</p>
            <div class="controls">
                <button class="remove" onclick="deleteFileForm('${file.id}')">Eliminar</button>
                <button class="update" onclick="updateFileForm('${file.id}', '${escapeStrings(file.name)}', '${escapeStrings(file.description)}')">Actualizar</button>
            </div>
        </li>`;
}

const createFileList = (files) => {
    let fileListEl = `<button class="create" onclick="createFileForm()">Crear Archivo</button><ul class="files"><li><p>Nombre</p><p>Descripción</p><p>Fecha de creación</p><p>Acciones</p></li>`;
    files.forEach(file => {
        fileListEl += createFileListItem(file);
    });
    fileListEl += `</ul>`;
    return fileListEl;
}

export const get = async () => {
    try {
        const files = await prisma.file.findMany();
    
        return createFileList(files);
    }
    catch (e) {
        console.log(e)
        return `<p>Error</p>`;
    }
}

export const create = async (data, file) => {
    try {
        const { name, description } = data;
        if (name, file) {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = data.name + "." + fileExtension;

            const checkFileName = await prisma.file.findMany({
                where: {
                    name: fileName
                }
            });
            const filePath = 'assets/files/' + fileName;
            const checkIfFileExists = fs.existsSync(filePath);
            if (checkFileName.length > 0 || checkIfFileExists) {
                return `<p>El archivo ya existe</p>`;
            }

            const fileEntry = await prisma.file.create({
                data: {
                    name: fileName,
                    description
                }
            });
            if (!fileEntry) {
                return `<p>Error al crear el archivo</p>`;
            }
            fs.renameSync(file.path, filePath);

            return createFileListItem(fileEntry);
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
        const fileExtension = name.split('.').pop();
        const file = await prisma.file.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                description
            }
        })
    
        fs.renameSync(`assets/files/${file.name}`, `assets/files/${name}`);
    
        const files = await prisma.file.findMany();
    
        return createFileList(files);
    }
    catch (e) {
        console.log(e)
        return `<p>Error</p>`;
    }
}

export const remove = async (id) => {
    try {
        if (!id) {
            return "<p>No se recibio ningún archivo</p>"
        }
    
        const deleteFile = await prisma.file.delete({
            where: {
                id: parseInt(id)
            }
        })
    
        fs.unlinkSync(`assets/files/${deleteFile.name}`);
    
        const files = await prisma.file.findMany();
    
        return createFileList(files);
    }
    catch (e) {
        console.log(e)
        return `<p>Error</p>`;
    }
}