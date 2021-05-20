blogsList = [{
    title: "Hello WEB",
    author: "Sakhri",
    likes: 12
},
{
    title: "Hello JAVA",
    author: "Hamid",
    likes: 5
},
{
    title: "Hello Python",
    author: "Hamid",
    likes: 8
},
{
    title: "Hello React NODEjs",
    author: "Hamid",
    likes: 29
}
]

const mostLikes = blogs => {
    const dict = {}
    blogs.map(blog => {
        if (!(dict.hasOwnProperty(blog.author))){
            dict[blog.author] = blog.likes
        }else{
            dict[blog.author] += blog.likes
        }
    })

    let max = 0
    let famousAuthor = null
    for(author in dict){
        if(dict[author] > max){
            max = dict[author]
            famousAuthor = author
        }
    }

    return {author: famousAuthor, likes: max}
}

console.log(mostLikes(blogsList))