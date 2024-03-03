const allPost = [];
let cnt = 0;
const fetchPosts = async (input, searchStatus) => {
    document.getElementById("spinner_container").classList.remove("hidden");
    
    let response;
    if (searchStatus) response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${input}`);
    else response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await response.json();
    const posts = data.posts;

    setTimeout(function() {
        document.getElementById("spinner_container").classList.add("hidden");
      }, 2000);
    displayPosts(posts);
}

const displayPosts = (posts) => {
    const container = document.getElementById("post_container");
    container.textContent = '';
    if (!posts.length) {
        document.getElementById("error-message").classList.remove("hidden");
        document.getElementById("mark_as_read_container").classList.add("hidden");
    }
    else {
        document.getElementById("error-message").classList.add("hidden");
        document.getElementById("mark_as_read_container").classList.remove("hidden");
    }
    posts.forEach(post => {
        allPost.push(post);
        const div = document.createElement("div");
        let activStatus;
        if (post.isActive) activStatus = "green";
        else activStatus = "red";
        div.innerHTML = `
            <div class="indicator p-1 mt-8 ml-5">
                <span class="indicator-item badge bg-${activStatus}-600"></span>
                <div class="grid w-20 h-20 place-items-center rounded-xl">
                    <img class="rounded-xl"
                        src="${post.image}" />
                </div>
            </div>
            <div class="card-body flex-1">
                <div class="flex flex-col lg:flex-row">
                    <p># ${post.category}</p>
                    <p>Author : ${post?.author?.name}</p>
                </div>
                <h2 class="text-xl font-bold">${post.title}</h2>
                <p>${post.description}</p>
                <div class="border-2 border-dashed my-5">
                </div>
                <div class="flex justify-between">
                    <div class="flex-1 flex gap-2 lg:gap-10">
                        <div class="flex gap-1 lg:gap-5">
                            <img src="images/message.png" alt="">
                            <p>${post.comment_count}</p>
                        </div>
                        <div class="flex gap-1 lg:gap-5">
                            <img src="images/eye.png" alt="">
                            <p>${post.view_count}</p>
                        </div>
                        <div class="flex gap-1 lg:gap-5 lg:w-full">
                            <img src="images/time.png" alt="">
                            <p>${post.posted_time} min</p>
                        </div>
                    </div>
                    <div class="tooltip" data-tip="Mark as read">
                        <img id="mark_as_read_btn" onclick="displayMarkAsRead(${post.id})"  class="cursor-pointer" src="images/mail.png" alt="">
                    </div>
                </div>
            </div>
        `
        div.classList.add("card", "bg-[#7D7DFC1A]", "flex", "flex-col", "lg:flex-row", "border-2", "border-[#7D7DFC]", "rounded-3xl");
        container.appendChild(div);
    })
}

const fetchLatesPost = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await response.json();
    displayLatestPosts(data);
    // console.log(data);
}

const displayLatestPosts = (posts) => {
    const container = document.getElementById("latest_post_container");
    for (const post of posts) {
        const div = document.createElement("div");
        let date = post.author.posted_date ? post.author.posted_date : "No Publish Date";
        let authorDesignation = post.author.designation ? post.author.designation : "Unknown";

        div.innerHTML = `
            <figure><img class="rounded-xl"
                src="${post.cover_image}" alt="" />
            </figure>
            <div class="">
                <div class="flex items-center gap-2 my-4">
                    <img src="images/date.png" alt="">
                    <p class="text-[#12132D99]">${date}</p>
                </div>
                <h2 class="text-xl font-extrabold">${post.title}</h2>
                <p class="my-4">${post.description}</p>
                <div class="flex items-center gap-5">
                    <div class="avatar">
                        <div class="w-16 rounded-full">
                            <img src="${post.profile_image}" />
                        </div>
                    </div>
                    <div>
                        <h4 class="font-extrabold">${post.author.name}</h4>
                        <p>${authorDesignation}</p>
                    </div>
                </div>
            </div>
        `
        div.classList.add("card", "card-compact", "bg-base-100", "shadow-xl", "border", "border-[#12192D26]", "p-4");
        container.appendChild(div);
    }
}

const search = () => {
    const input = document.getElementById("search").value;
    fetchPosts(input, true);
}

const displayMarkAsRead = (id) => {
    cnt++;
    document.getElementById("read_count").innerText = cnt;
    const container = document.getElementById("mark_as_read_container");
    for (let i = 0; i < allPost.length; i++) {
        if (allPost[i].id === id){
            const div = document.createElement("div");
            div.innerHTML = `
                <p class="font-semibold">${allPost[i].title}</p>
                <div class="flex gap-2 p-5">
                    <img src="images/eye.png" alt="">
                    <p>${allPost[i].view_count}</p>
                </div>
            `
            div.classList.add("bg-white", "flex", "justify-between", "items-center", "p-5", "rounded-2xl");
            container.appendChild(div);
            break;
        }
    }
}

fetchPosts();
fetchLatesPost();
