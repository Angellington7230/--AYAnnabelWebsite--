// const all = document.getElementById("All");
// const live = document.getElementById("Live");
// const event = document.getElementById("Event");
// const release = document.getElementById("Release");
// const media = document.getElementById("Media");




media.addEventListener("click", function handler(e){
    const event_data = "../data/information/media.json";

    // alert("Clicando em em media");

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
                const livediv = `
                    <article class="media">
                        <p class="date-pub">${post.date}</p>
                        <div class="card-media">
                            <div class="wallpaper">
                                <div class="information">

                                    <div class="col1">
                                        <h2 class="info-title">
                                            ${post.info_title}
                                        </h2>
                                        <div class="info-content">
                                            <div class="content">
                                                <p> ${post.description}</p>                                
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col2">
                                        <div class="media">

                                            <iframe width="380" height="240" src="${post.link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                `;

                background2.insertAdjacentHTML('beforeend', livediv);
            });
        })

        
        .catch((err) => {
            console.error('Failed to Load the json.', err);
        });  

        // event.removeEventListener("click", handler)
});












