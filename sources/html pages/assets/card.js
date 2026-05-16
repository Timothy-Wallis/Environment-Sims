<<<<<<< HEAD
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
=======
export class Card {
    constructor(title, x, y, width, height, image, description = ""){
        this.title = title;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.description = description;
    }
    createCard(){
        let card = document.createElement("div");
        card.classList.add("card");
        card.style.position = "absolute";
        card.style.left = `${this.x}px`;
        card.style.top = `${this.y}px`;
        card.style.width = `${this.width}px`;
        card.style.height = `${this.height}px`;
        let title = document.createElement("h2");
        title.innerText = this.title;
        let img = document.createElement("img");
        img.src = this.image;
        let desc = document.createElement("p");
        desc.innerText = this.description;
        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(desc);
        document.body.appendChild(card);
        card.addEventListener("click", () => {
            card.removeEventListener("click", arguments.callee);
            for(let opacity = 1; opacity >= 0; opacity -= 0.1){
                card.style.opacity = opacity;
                card.style.top = `${this.y - (10 * opacity)}px`;
            }
        });
    }

}

export const environmentTypes = {
    FOREST: "forest",
    DESERT: "desert",
    MOUNTAIN: "mountain",
    SWAMP: "swamp"
};

export class environmentCard extends Card {
    constructor(title, x, y, width, height, image, description = "", environment = "default", effect = "none"){
        super(title, x, y, width, height, image, description);
        this.environment = environment;
        this.effect = effect;

    }

}
>>>>>>> f16d001 (working to new update : Current refactor occuring - NON-Stable)
