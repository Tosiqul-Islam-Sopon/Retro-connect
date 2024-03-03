const fetchPosts = async() =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await response.json();
    const posts = data.posts;
    // console.log(data.posts);
    displayPosts(posts);
}

const displayPosts = (posts) =>{
    const container = document.getElementById("post_container");
    posts.forEach(post =>{
        const div = document.createElement("div");
        let activStatus;
        if (post.isActive)  activStatus = "green";
        else    activStatus = "red";
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
                    <div class="">
                        <img src="images/mail.png" alt="">
                    </div>
                </div>
            </div>
        `
        div.classList.add("card", "bg-[#7D7DFC1A]", "flex", "flex-row", "border-2", "border-[#7D7DFC]", "rounded-3xl");
        container.appendChild(div);
    })
}

fetchPosts();