import { escapeStrings } from "../escapeStrings.js";
import prisma from "../prisma.js";

const createBlockListItem = (block) => {
    return `<li>
            <a href="/#${block.slug}" target="_blank">${block.heading} (${block.slug})</a>
            <p>${block.color}</p>
            <p>${block.gallery ? block.gallery.length : 0} imagenes en galeria.</p>
            <div class="controls">
                <button class="remove" onclick="deleteBlockForm('${block.id}')">Eliminar</button>
                <button class="update" onclick="updateBlockForm('${block.id}', '${escapeStrings(block.slug)}', '${escapeStrings(block.heading)}', '${escapeStrings(block.content)}', '${block.order}', '${escapeStrings(block.color)}')">Actualizar</button>
            </div>
        </li>`;
}

const createBlockList = async (blocks) => {
    let blockListEl = `<button class="create" onclick="createBlockForm()">Crear Bloque</button><ul class="blocks"><li><p>Encabezado</p><p>Orden</p><p>Color</p><p>Acciones</p></li>`;
    blocks.forEach(block => {
        blockListEl += createBlockListItem(block);
    });
    blockListEl += `</ul>`;
    return blockListEl;
}

export const get = async () => {
    try {
        const blocks = await prisma.block.findMany({
            include: {
                gallery: true
            }
        });
    
        return (await createBlockList(blocks));
    }
    catch (error) {
        console.log(error)
        return `<p>Error</p>`;
    }
}

export const create = async (data) => {
    const { slug, heading, content, order, color, gallery } = data;
    try {
        if (slug, order, color) {
            const checkIfBlockExists = await prisma.block.findMany({
                where: {
                    slug
                }
            });

            if (checkIfBlockExists.length > 0) {
                return `<p>El bloque ya existe</p>`;
            }
            const blockEntry = await prisma.block.create({
                data: {
                    slug,
                    heading,
                    content,
                    order: parseInt(order),
                    color
                }
            });
            
            for (let i = 0; i < gallery.length; i++) {
                const galleryRelation = await prisma.gallery.create({
                    data: {
                        blockId: blockEntry.id,
                        images: gallery[i]
                    }
                })
            }

            const newBlock = await prisma.block.findMany({
                include: {
                    gallery: true
                },
                where: {
                    id: blockEntry.id
                }
            });

            return createBlockListItem(newBlock);
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

        const { slug, heading, content, order, color, id } = data;
        const block = await prisma.block.update({
            where: {
                id: parseInt(id)
            },
            data: {
                slug,
                heading,
                content,
                order: parseInt(order),
                color
            }
        })
    
        if (!block) {
            return `<p>Error al actualizar el bloque</p>`;
        }
    
        const deleteGallery = await prisma.gallery.deleteMany({
            where: {
                blockId: parseInt(id)
            }
        })

        if (data.gallery && data.gallery.length > 0) {
            for (let i = 0; i < data.gallery.length; i++) {
                const galleryRelation = await prisma.gallery.create({
                    data: {
                        image: {
                            connect: {
                                id: parseInt(data.gallery[i])
                            }
                        },
                        block: {
                            connect: {
                                id: parseInt(id)
                            }
                        }
                    }
                })
            }
        }
    
    
        const blocks = await prisma.block.findMany(
            {
                include: {
                    gallery: true
                }
            }
        );
    
        return (await createBlockList(blocks));
    }
    catch (error) {
        console.log(error)
        return `<p>Error</p>`;
    }
}

export const remove = async (id) => {
    try {
        if (!id) {
            return "<p>No se recibio ningún bloque</p>"
        }
    
        const deleteBlock = await prisma.block.delete({
            where: {
                id: parseInt(id)
            }
        })
    
        const deleteGallery = await prisma.gallery.deleteMany({
            where: {
                blockId: parseInt(id)
            }
        })
    
        const blocks = await prisma.block.findMany();
    
        return (await createBlockList(blocks));
    }
    catch (error) {
        console.log(error)
        return `<p>Error</p>`;
    }
}

export const getOptions = async (data) => {
    try {
        const { id } = data;

        const blocks = await prisma.block.findMany({
            select: {
                id: true,
                heading: true
            }
        });
    
        return blocks.map(block => `<option value="${block.id}" ${id == block.id ? "selected" : ""}>${block.heading}</option>`).join("");
    }
    catch (error) {
        console.log(error)
        return `<p>Error</p>`;
    }
}