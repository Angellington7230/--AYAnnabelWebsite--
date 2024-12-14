const all = document.getElementById("All");
const live = document.getElementById("Live");
const event = document.getElementById("Event");
const release = document.getElementById("Release");
const media = document.getElementById("Media");


all.addEventListener("click", function(e){
    alert("Clicando em all")
})


live.addEventListener("click", function(e){
    const live_data = "../data/information/live.json";

    console.log("Clicando em live");

    const json_live_data = fetch(live_data)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to Load the json. Status: " + response.status);
            }
            return response.json();
        })
        .then((response) => {
            const posts = response.posts;
            console.log(posts);

            // Itera sobre os posts para adicionar cada um no HTML
            posts.forEach((post) => {
                const background2 = document.getElementById("background2");
                const livediv = `
                    <article class="live">
                        <p class="date-pub">${post.date}</p>
                        <div class="card-live">
                            <div class="wallpaper">
                                <div class="information">
                                    <h2 class="info-title">
                                        ${post.info_title}
                                    </h2>
                                    <h3 class="info-subtitle">
                                        ${post.info_subtitle}
                                    </h3>
                                    <div class="info-content">
                                        <div class="col1">
                                            <p class="date-live"><b>Day: </b>Sábado, 23 de abril de 2016</p>
                                            <p class="local-live"><b>Local: </b>${post.local}</p>
                                            <br>
                                            <p class="time-live"><b>Time:  </b>${post.time}(collab)</p>
                                            <br>
                                            <p class="ticket-live"><b>Ticket: </b>${post.ticket}</p>
                                        </div>
                                        <div class="col2">
                                            <p class="details-live"><b>Details: </b>${post.details}</p>
                                            <br>
                                            <p class="organizer"><b>${post.organizer}</b></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                `;

                // Adiciona o conteúdo ao elemento com id 'background2'
                background2.insertAdjacentHTML('beforeend', livediv);
            });
        })
        .catch((err) => {
            console.error('Failed to Load the json.', err);
        });  
});











