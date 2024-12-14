// const all = document.getElementById("All");
// const live = document.getElementById("Live");
// const event = document.getElementById("Event");
// const release = document.getElementById("Release");
// const media = document.getElementById("Media");




event.addEventListener("click", function(e){
    const event_data = "../data/information/event.json";

    alert("Clicando em live");

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

            posts.forEach((post) => {
                const background2 = document.getElementById("background2");
               
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
                    if (description.image === null) {
                        let paragraph = document.createElement("p");
                        paragraph.textContent = description.text;
                        content.appendChild(paragraph);
                    } else {
                        let info_album = document.createElement("div");
                        info_album.classList.add("info-album");

                        let img = document.createElement("img");
                        img.src = description.image;
                        img.alt = description.text;

                        let paragraph = document.createElement("p");
                        paragraph.textContent = description.text;

                        info_album.appendChild(img);
                        info_album.appendChild(paragraph);

                        content.appendChild(info_album);
                    }
                });

                // Adicionando link externo (se houver)
                let linkContainer = content.querySelector('.info-link');
                if (!linkContainer) {
                    linkContainer = document.createElement('div');
                    linkContainer.classList.add('info-link');
                    let externalLink = post.description.find(d => d.text.includes("http"));
                    if (externalLink) {
                        let a = document.createElement("a");
                        a.href = externalLink.text;
                        a.target = "_blank";
                        a.textContent = externalLink.text;
                        linkContainer.appendChild(a);
                        content.appendChild(linkContainer);
                    }
                }

                information.appendChild(info_title);
                information.appendChild(info_content);
                info_content.appendChild(content);

                card_default.appendChild(back_default);
                card_default.appendChild(information);
                
                article.appendChild(date_pub);
                article.appendChild(card_default);

                background2.appendChild(article);
            });
        })
        .catch((err) => {
            console.error('Failed to Load the json.', err);
        });  
});












