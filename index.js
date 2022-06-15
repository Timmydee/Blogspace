let postArray = []
const titleInput = document.getElementById("text")
const bodyInput = document.getElementById("body")
const form = document.getElementById("post")

function renderBlog(){
    let html = ""
        for(post of postArray) {
            html += `
                <h3>${post.title}</h3>
                </p>${post.body}</p>
                <hr />
            `
        }
        document.getElementById("object-list").innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts",{method:'GET'})
    .then(res => res.json())
    .then(data => {
        postArray = data.slice(0,5)
        renderBlog()
    })

form.addEventListener('click',function(eve){
    eve.preventDefault()
    const postTitle = titleInput.value
    const postBody = bodyInput.value
    const data = {
        title: postTitle,
        body: postBody
    }

    const option = {
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    fetch("https://apis.scrimba.com/jsonplaceholder/posts",option)
        .then(res => res.json())
        .then(post => {
            postArray.unshift(post)
            renderBlog()
            titleInput.value = ""
            bodyInput.value = ""
        })
})
