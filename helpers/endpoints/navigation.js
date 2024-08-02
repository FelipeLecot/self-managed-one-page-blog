import { escapeStrings } from "../escapeStrings.js";
import prisma from "../prisma.js";

const createNavigationListItem = (navigation) => {
    return `<li>
            <a href="${navigation.block ? `#${navigation.block.slug}` : navigation.url}" target="_blank">${navigation.name}</a>
            <p>${navigation.block ? `#${navigation.block.slug}` : navigation.url}</p>
            <p>${navigation.order}</p>
            <div class="controls">
                <button class="remove" onclick="deleteNavigationForm('${navigation.id}')">Eliminar</button>
                <button class="update" onclick="updateNavigationForm('${navigation.id}', '${escapeStrings(navigation.name)}', '${escapeStrings(navigation.url || "")}', '${navigation.order}', '${navigation.blockId}')">Actualizar</button>
            </div>
        </li>`;
}

const createNavigationList = async (navigations) => {
    let navigationListEl = `<button class="create" onclick="createNavigationForm()">Crear Navegacion</button><ul class="navigation"><li><p>Nombre</p><p>Url</p><p>Orden</p><p>Acciones</p></li>`;
    navigations.forEach(navigation => {
        navigationListEl += createNavigationListItem(navigation);
    });
    navigationListEl += `</ul>`;
    return navigationListEl;
}

export const get = async () => {
    try {
        const navigations = await prisma.navigation.findMany({
            include: {
                block: true
            }
        });
    
        return (await createNavigationList(navigations));
    }
    catch (error) {
        console.log(error)
        return `<p>Error</p>`;
    }
}

export const create = async (data) => {
    const { name, url, order, block } = data;
    try {
        if (name, order && (block || url)) {
            let createData = {
                name,
                order: parseInt(order)
            }

            if (block) {
                createData.block = {
                    connect: {
                        id: parseInt(block)
                    }
                }
            }
            if (url) {
                createData.url = url;
            }

            const navigationEntry = await prisma.navigation.create({
                data: createData
            });

            const newNavigation = await prisma.navigation.findMany({
                where: {
                    id: navigationEntry.id
                },
                include: {
                    block: true
                }
            });

            return createNavigationListItem(newNavigation);
        }
        else {
            return `<p>Por favor llenar todo el formulario antes de enviar</p>`;
        }
    } catch (error) {
        console.log(error)
        return `<p>Error</p>`;
    }
}

export const update = async (data) => {
    try {
        const { id, name, order, block, url } = data;
        if ( id, name, order && (block || url)) {
            const updateData = {
                name,
                order: parseInt(order)
            }
            if (block) {
                updateData.block = {
                    connect: {
                        id: parseInt(block)
                    }
                }
            }
            if (url) {
                updateData.url = url;
            }

            const navigation = await prisma.navigation.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name,
                    order: parseInt(order),
                    block: block ? {
                        connect: {
                            id: parseInt(block)
                        }
                    } : null,
                    url: url ? url : null
                }
            })
        
            if (!navigation) {
                return `<p>Error al actualizar el bloque</p>`;
            }
        
            const navigations = await prisma.navigation.findMany(
                {
                    include: {
                        block: true
                    }
                }
            );
        
            return (await createNavigationList(navigations));
        }
        else {
            return `<p>Por favor llenar todo el formulario antes de enviar</p>`;
        }
    }
    catch (error) {
        console.log(error)
        return `<p>Error</p>`;
    }
}

export const remove = async (id) => {
    try {
        if (!id) {
            return "<p>No se recibio ninguna navegacion</p>"
        }
    
        const deleteNavigation = await prisma.navigation.delete({
            where: {
                id: parseInt(id)
            }
        })
    
        const navigations = await prisma.navigation.findMany({
            include: {
                block: true
            }
        });
    
        return (await createNavigationList(navigations));
    }
    catch (error) {
        console.log(error)
        return `<p>Error</p>`;
    }
}