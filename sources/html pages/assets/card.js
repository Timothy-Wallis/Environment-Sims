class Card {
    constructor(name, image, description, properties) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.properties = properties;
    }

    generateCard() {
        let card = document.createElement("div");
        card.classList.add("card");
        let img = document.createElement("img");
        img.src = this.image;
        img.alt = this.name;
        let name = document.createElement("h3");
        name.textContent = this.name;
        let description = document.createElement("p");
        description.textContent = this.description;
        card.appendChild(name);
        card.appendChild(img);
        card.appendChild(description);
        card.addEventListener("click", () => {
            alert(`You clicked on ${this.name}!`);
        });
        return card;
    }
}

export { Card };
