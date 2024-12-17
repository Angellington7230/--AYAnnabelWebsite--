// Função para converter a data em formato "YYYY/MM/DD" para um objeto Date
function parseDate(dateStr) {
    const parts = dateStr.split('/');
    return new Date(parts[0], parts[1] - 1, parts[2]);  // Mês é 0-indexed (0 = janeiro)
}

// Função para buscar dados de um JSON
function fetchData(url, article) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data.posts.map(post => ({
            ...post,
            article: article,
            date: parseDate(post.date)  // Converte a data para Date
        })))
        .catch(err => console.error('Erro ao carregar JSON:', err));
}

// Função principal para buscar e ordenar todos os dados
async function fetchAndDisplayData() {
    // URLs dos JSONs
    const urls = [
        { article: "event", url: '../data/information/event.json' },
        { article: "live", url: '../data/information/live.json' },
        { article: "media", url: '../data/information/media.json' },
        { article: "release", url: '../data/information/release.json' },
    ];

    try {
        // Fetch os dados de todos os JSONs
        const allPosts = await Promise.all(urls.map(item => fetchData(item.url, item.article)));

        // Unifica todos os posts em uma única lista
        const allPostsFlattened = allPosts.flat();

        // Ordena os posts pela data
        allPostsFlattened.sort((a, b) => b.date - a.date);  // Ordenação crescente

        return allPostsFlattened;  // Retorna os posts ordenados
    } catch (err) {
        console.error('Erro ao buscar e exibir dados:', err);
    }
}

// Função para exibir os posts no HTML
function displayPosts(posts) {
    const background2 = document.getElementById("background2");
    background2.innerHTML = '';  // Limpa o conteúdo atual

    posts.forEach(post => {
        // Cria o artigo principal
        const article = document.createElement("article");
        article.classList.add(post.article);  // Adiciona a classe conforme o tipo de post

        // Criação do elemento de data de publicação
        const datePub = document.createElement("p");
        datePub.classList.add("date-pub");
        if (post.date instanceof Date) {
            datePub.textContent = post.date.toLocaleDateString();  // Exibe a data no formato local
        } else {
            datePub.textContent = "Data inválida";  // Caso o post não tenha uma data válida
        }

        // Adiciona a data ao artigo
        article.appendChild(datePub);

        // Se o tipo do post for "event"
        if (post.article === 'event') {
            let eventArticle = document.createElement("article");
            eventArticle.classList.add("event");

            // Adiciona a data de publicação do evento
            let date_pub = document.createElement("p");
            date_pub.classList.add("date-pub");
            date_pub.textContent = post.date.toLocaleDateString(); // Exibe a data do evento

            // Criação de elementos do conteúdo do evento
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

            // Processa as descrições no evento
            post.description.forEach((description) => {
                if (description.text == null || description.text == "") {
                    let breakline = document.createElement("p");
                    breakline.innerHTML = "<br>";
                    content.appendChild(breakline);
                }

                // Caso tenha texto, imagem e link
                if (description.text && description.image && description.link) {
                    let paragraph = document.createElement("div");
                    paragraph.innerHTML = ` 
                    <div class="info-album">
                        <a href="${description.link}" target="_blank"><img src="${description.image}" alt="${description.text}"></a>
                        <p>${description.text}</p>
                    </div>
                    `;
                    content.appendChild(paragraph);
                } 
                // Caso tenha apenas texto
                else if (description.image === null) {
                    let paragraph = document.createElement("p");
                    paragraph.textContent = description.text;
                    content.appendChild(paragraph);
                } 
                // Caso tenha apenas imagem
                else {
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

            // Adiciona o conteúdo ao evento
            information.appendChild(info_title);
            information.appendChild(info_content);
            info_content.appendChild(content);

            card_default.appendChild(back_default);
            back_default.appendChild(information);

            // Adiciona os elementos ao artigo de evento
            eventArticle.appendChild(date_pub);
            eventArticle.appendChild(card_default);

            // Adiciona o artigo de evento no contêiner
            background2.appendChild(eventArticle);
        }

        // Se o tipo do post for "live"
        if (post.article === "live") {
            // Criação do conteúdo do post de live
            const liveDiv = document.createElement("div");
            liveDiv.classList.add("card-live");

            // WallPaper (Imagem de fundo)
            const wallpaper = document.createElement("div");
            wallpaper.classList.add("wallpaper");

            // Informações do evento
            const information = document.createElement("div");
            information.classList.add("information");

            // Título do evento
            const title = document.createElement("h2");
            title.classList.add("info-title");
            title.textContent = post.info_title;  // Exibe o título

            // Subtítulo do evento
            const subtitle = document.createElement("h3");
            subtitle.classList.add("info-subtitle");
            subtitle.textContent = post.info_subtitle;  // Exibe o subtítulo

            // Conteúdo com as informações
            const infoContent = document.createElement("div");
            infoContent.classList.add("info-content");

            // Primeira coluna de informações (Data, Local, Horário, etc.)
            const col1 = document.createElement("div");
            col1.classList.add("col1");

            const day = document.createElement("p");
            day.classList.add("date-live");
            day.innerHTML = `<b>Day:</b> ${post.day || "N/A"}`;  // Usa "N/A" caso a data não esteja definida

            const local = document.createElement("p");
            local.classList.add("local-live");
            local.innerHTML = `<b>Local:</b> ${post.local || "N/A"}`;  // Usa "N/A" caso o local não esteja definido

            const time = document.createElement("p");
            time.classList.add("time-live");
            time.innerHTML = `<b>Time:</b> ${post.time || "N/A"} (collab)`;  // Usa "N/A" caso o horário não esteja definido

            const ticket = document.createElement("p");
            ticket.classList.add("ticket-live");
            ticket.innerHTML = `<b>Ticket:</b> ${post.ticket || "N/A"}`;  // Usa "N/A" caso o ticket não esteja definido

            // Segunda coluna de informações (Detalhes, Organizador, etc.)
            const col2 = document.createElement("div");
            col2.classList.add("col2");

            const details = document.createElement("p");
            details.classList.add("details-live");
            details.innerHTML = `<b>Details:</b> ${post.details || "N/A"}`;  // Usa "N/A" caso os detalhes não estejam definidos

            const organizer = document.createElement("p");
            organizer.classList.add("organizer");
            organizer.innerHTML = `<b>Organizer:</b> ${post.organizer || "N/A"}`;  // Usa "N/A" caso o organizador não esteja definido

            // Monta a estrutura do conteúdo
            col1.appendChild(day);
            col1.appendChild(local);
            col1.appendChild(time);
            col1.appendChild(ticket);

            col2.appendChild(details);
            col2.appendChild(organizer);

            infoContent.appendChild(col1);
            infoContent.appendChild(col2);

            information.appendChild(title);
            information.appendChild(subtitle);
            information.appendChild(infoContent);

            wallpaper.appendChild(information);
            liveDiv.appendChild(wallpaper);
            article.appendChild(liveDiv);  // Agora estamos adicionando o conteúdo de live ao artigo principal

            // Adiciona o post ao container
            background2.appendChild(article);
        }
        if (post.article === "media") {
            // Criação do artigo para "media"
            const mediaArticle = document.createElement("article");
            mediaArticle.classList.add("media");
        
            // Criação do elemento de data de publicação
            const datePub = document.createElement("p");
            datePub.classList.add("date-pub");
            if (post.date instanceof Date) {
                datePub.textContent = post.date.toLocaleDateString();  // Exibe a data no formato local
            } else {
                datePub.textContent = "Data inválida";  // Caso o post não tenha uma data válida
            }
        
            // Criação do card de media
            const cardMedia = document.createElement("div");
            cardMedia.classList.add("card-media");
        
            // Criação do wallpaper
            const wallpaper = document.createElement("div");
            wallpaper.classList.add("wallpaper");
        
            // Criação das informações do media
            const information = document.createElement("div");
            information.classList.add("information");
        
            // Coluna 1: Informações sobre o post (título e descrição)
            const col1 = document.createElement("div");
            col1.classList.add("col1");
        
            const infoTitle = document.createElement("h2");
            infoTitle.classList.add("info-title");
            infoTitle.textContent = post.info_title;  // Título do post
        
            const infoContent = document.createElement("div");
            infoContent.classList.add("info-content");
        
            const content = document.createElement("div");
            content.classList.add("content");
        
            const description = document.createElement("p");
            description.textContent = post.description || "Sem descrição disponível";  // Descrição, caso exista
            content.appendChild(description);
        
            // Coluna 2: Embed do vídeo (se houver link)
            const col2 = document.createElement("div");
            col2.classList.add("col2");
        
            const mediaContainer = document.createElement("div");
            mediaContainer.classList.add("media");
        
            if (post.link) {
                const iframe = document.createElement("iframe");
                iframe.width = "380";
                iframe.height = "240";
                iframe.src = post.link;  // Link do vídeo (YouTube ou outra plataforma)
                iframe.title = "Video player";
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                iframe.referrerPolicy = "strict-origin-when-cross-origin";
                iframe.allowFullscreen = true;
        
                mediaContainer.appendChild(iframe);
            }
        
            col1.appendChild(infoTitle);
            col1.appendChild(infoContent);
            infoContent.appendChild(content);
        
            col2.appendChild(mediaContainer);
        
            // Adiciona as colunas ao elemento "information"
            information.appendChild(col1);
            information.appendChild(col2);
        
            // Adiciona a estrutura ao "wallpaper" e "cardMedia"
            wallpaper.appendChild(information);
            cardMedia.appendChild(wallpaper);
        
            // Adiciona o "cardMedia" ao artigo "media"
            mediaArticle.appendChild(datePub);
            mediaArticle.appendChild(cardMedia);
        
            // Adiciona o artigo ao contêiner principal
            background2.appendChild(mediaArticle);
        }
        if (post.article === "release") {
            // Criação do artigo para "release"
            let article = document.createElement("article");
            article.classList.add("release");
        
            // Criação do elemento de data de publicação
            let date_pub = document.createElement("p");
            date_pub.classList.add("date-pub");
        
            // Formatação da data para um formato amigável (DD/MM/YYYY)
            const formattedDate = post.date instanceof Date ? post.date.toLocaleDateString("pt-BR") : "Data inválida"; // Formato pt-BR
            date_pub.textContent = formattedDate;
        
            // Criação do conteúdo do release
            let card_default = document.createElement("div");
            card_default.classList.add("card-default");
        
            let back_default = document.createElement("div");
            back_default.classList.add("back-default");
        
            let information = document.createElement("div");
            information.classList.add("information");
        
            let info_title = document.createElement("h2");
            info_title.classList.add("info-title");
            info_title.textContent = post.info_title;  // Título do release
        
            let info_content = document.createElement("div");
            info_content.classList.add("info-content");
        
            let content = document.createElement("div");
            content.classList.add("content");
        
            // Loop pelas descrições para formatar texto, links e imagens
            post.description.forEach((description) => {
                if (!description.text && !description.link && !description.image) {
                    // Caso não haja texto, link ou imagem
                    let paragraph = document.createElement("p");
                    paragraph.textContent = "Sem descrição disponível.";
                    content.appendChild(paragraph);
                } else if (description.text && !description.link && !description.image) {
                    // Caso tenha apenas texto
                    let paragraph = document.createElement("p");
                    paragraph.textContent = description.text;
                    content.appendChild(paragraph);
                } else if (description.text && description.link && !description.image) {
                    // Caso tenha texto e link, mas sem imagem
                    let link = document.createElement("p");
                    link.innerHTML = `<a href="${description.link}" target="_blank">${description.text}</a>`;
                    content.appendChild(link);
                } else if (description.text && description.image && !description.link) {
                    // Caso tenha texto e imagem, mas sem link
                    let paragraph = document.createElement("div");
                    paragraph.innerHTML = `
                        <div class="info-album">
                            <img src="${description.image}" alt="${description.text}">
                            <p>${description.text}</p>
                        </div>
                    `;
                    content.appendChild(paragraph);
                } else if (!description.text && description.image && description.link) {
                    // Caso tenha imagem e link, mas sem texto
                    let paragraph = document.createElement("div");
                    paragraph.innerHTML = `
                        <div class="info-album">
                            <a href="${description.link}" target="_blank"><img src="${description.image}" alt="Imagem do link"></a>
                        </div>
                    `;
                    content.appendChild(paragraph);
                }
            });
        
            // Adiciona o título, conteúdo e informações ao "release"
            information.appendChild(info_title);
            information.appendChild(info_content);
            info_content.appendChild(content);
        
            card_default.appendChild(back_default);
            back_default.appendChild(information);
        
            // Adiciona a data de publicação e o conteúdo ao artigo
            article.appendChild(date_pub);
            article.appendChild(card_default);
        
            // Adiciona o artigo ao container
            background2.appendChild(article);
        }
        
        

        else {
            console.log("")
        }
    });
}

// Adicionando o evento ao elemento 'all'
// const all = document.getElementById("All");  // Garantir que 'all' é o ID de um elemento válido

if (all) {
    all.addEventListener("click", async function (e) {
        // console.log("Clicando em all");  // Apenas para debugar e verificar se o clique está funcionando

        const posts = await fetchAndDisplayData();
        displayPosts(posts);
    });
} else {
    console.error('Elemento "all" não encontrado.');
}

if(all){
    window.onload = async function LoadAll(){
        const posts = await fetchAndDisplayData();
        displayPosts(posts);
    }
}

/* I am sorry so much... This one is so complex to do only! I have to thanks ChatGPT for fix my code
Now, fetch datas in async is very complex for me now... This logic is by ChatGPT... The rest is my.

*/