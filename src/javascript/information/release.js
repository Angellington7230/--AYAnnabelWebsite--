// const all = document.getElementById("All");
// const live = document.getElementById("Live");
// const event = document.getElementById("Event");
// const release = document.getElementById("Release");
// const media = document.getElementById("Media");




release.addEventListener("click", function handler(e){
    const event_data = "../data/information/release.json";

    // alert("Clicando em em release");

    const json_live_data = fetch(event_data)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to Load the json. Status: " + response.status);
            }
            return response.json();
        })
        .then((response) => {
            const posts = response.posts;
            console.log(posts);
            const background2 = document.getElementById("background2");
            background2.innerHTML =  ''

            posts.forEach((post) => {


             


               
                let article = document.createElement("article");
                article.classList.add("event");

                let date_pub = document.createElement("p");
                date_pub.classList.add("date-pub");
                date_pub.textContent = post.date; // Usar textContent para definir o texto

                let card_default = document.createElement("div");
                card_default.classList.add("card-default");

                let back_default = document.createElement("div");
                back_default.classList.add("back-default");

                let information = document.createElement("div");
                information.classList.add("information");

                let info_title = document.createElement("h2");
                info_title.classList.add("info-title");
                info_title.textContent = post.info_title;

                let info_content = document.createElement("div");
                info_content.classList.add("info-content");

                let content = document.createElement("div");
                content.classList.add("content");

                post.description.forEach((description) => {


                    if (description.text == null || description.text == "") {
                        let breakline = document.createElement("p");
                        breakline.innerHTML = "<br>"
                        content.appendChild(breakline);
                    }

                    if (description.text && description.link && description.image == null){
                        let link = document.createElement("p");
                        link.innerHTML = `
                        <div class="info-link">
                         <p><a href="${description.link}" target="_blank">${description.text}</a></p>
                        </div>
                            `
                        content.appendChild(link)
                    }


                    if (description.text && description.image && description.link){
                        let paragraph = document.createElement("div");
                        paragraph.innerHTML = 
                        `
                        <div class="info-album">

                            <a href="${description.link}" target="_blank" ><img src="${description.image}" alt="${description.text}"></a>
                            <p>${description.text}</p>
                        </div>
                        `
                        content.appendChild(paragraph)
                    }

                    if (!description.text && !description.link && description.image){
                        let paragraph = document.createElement("div");
                        paragraph.innerHTML = 
                        `
                        <div class="info-album">

                            <a href="#" target="_blank" ><img src="${description.image}" alt="${description.text}"></a>
                        </div>
                        `
                        content.appendChild(paragraph)
                    }
                    
                    
                    else if (description.image === null && description.link == null){
                        let paragraph = document.createElement("p");
                        paragraph.textContent = description.text;
                        content.appendChild(paragraph);
                    } else {
                        // let info_album = document.createElement("div");
                        // info_album.classList.add("info-album");
                
                        // let img = document.createElement("img");
                        // img.src = description.image;
                        // img.alt = description.text;  // A descrição da imagem pode ser o texto
                
                        // let paragraph = document.createElement("p");
                        // paragraph.textContent = description.text;
                
                        // info_album.appendChild(img);
                        // info_album.appendChild(paragraph);
                
                        // content.appendChild(info_album); 
                        console.log("")
                    }
                });
            
                information.appendChild(info_title);
                information.appendChild(info_content);
                info_content.appendChild(content);

                card_default.appendChild(back_default);
                back_default.appendChild(information)
                // card_default.appendChild(informationz);
                
                article.appendChild(date_pub);
                article.appendChild(card_default);

                background2.appendChild(article);
            });
        })

        
        .catch((err) => {
            console.error('Failed to Load the json.', err);
        });  

        // event.removeEventListener("click", handler)
});












