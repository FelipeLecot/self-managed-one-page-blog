import prisma from "./prisma.js"

export const loadNavigation = async () => {
    const navigation = await prisma.navigation.findMany({
        orderBy: {
            order: 'asc'
        },
        include: {
            block: true
        }
    });

    let html = '';
    for (const nav of navigation) {
        if (nav.url) {
            html += `
                <li>
                    <a href="${nav.url}">${nav.name}</a>
                </li>
            `
            continue;
        }
        else if (nav.block) {
            html += `
                <li>
                    <a href="#${nav.block.slug}">${nav.name}</a>
                </li>
            `
        }
    }

    return html;
}