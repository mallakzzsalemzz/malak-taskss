fetch(url , {
    method : "POST" , 
    headers : {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
        title : "Post Title 01" , 
        desc : "Hello World"
    })
})