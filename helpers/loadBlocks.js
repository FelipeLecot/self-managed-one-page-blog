import { loadCarousel } from "./loadCarousel.js";
import prisma from "./prisma.js"

export const loadBlocks = async () => {
    const blocks = await prisma.block.findMany({
        orderBy: {
            order: 'asc',
        },
        include: {
            gallery: {
                orderBy: {
                    order: 'asc'
                },
                include: {
                    image: true
                }
            }
        }
    });

    let html = '';
    for (const block of blocks) {
        html += `
            <div class="block ${block.color}" id="${block.slug}">
                <h1>${block.heading}</h1>
                ${block.content}

                <div class="gallery">
                    ${block.gallery.map(imageRelation => {
                        return (`
                            <figure>
                                <img src="/assets/images/${imageRelation.image.name}" alt="${imageRelation.image.description}" width="200" height="150">
                                <figcaption>${imageRelation.image.description}</figcaption>
                            </figure>
                        `)
                }).join('')}
                </div>
                ${block.gallery ? loadCarousel(block, block.gallery) : ""}
            </div>
        `
    }

    return html;
} 