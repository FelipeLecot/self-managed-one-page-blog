export const loadCarousel = (block, gallery) => {
    return `
    <div class="carousel">
        <div id="block-${block.id}-carousel" class="carousel slide">
            <div class="carousel-indicators">
                ${gallery.map((imageRelation, index) => {
                    return `<button type="button"${index == 0 ? ` class="active" aria-current="true"` : ""} data-bs-target="#block-${block.id}-carousel" data-bs-slide-to="${index}" aria-label="${imageRelation.image.description}"></button>`  
                }).join('')}
            </div>
            <div class="carousel-inner">
                ${gallery.map((imageRelation, index) => {
                    return `<div class="carousel-item${index == 0 ? " active" : ""}">
                        <img src="/assets/images/${imageRelation.image.name}" class="d-block w-100" alt="${imageRelation.image.description}">
                        <div class="carousel-caption d-md-block">
                            <p>${imageRelation.image.description}</p>
                        </div>
                    </div>`
                }).join('')}
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#block-${block.id}-carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#block-${block.id}-carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
        </div>
    </div>`
}