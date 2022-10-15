const fs = require("fs"); 

var posts = [];
var categories = [];

function initialize()
{

    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function

        fs.readFile('./data/posts.json', 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
    
            posts = JSON.parse(data);
            resolve("successful operation");

        });
        // console.log(posts.length);
        // posts = posts_copy;
        
    
    
        fs.readFile('./data/categories.json', 'utf8', (err, data2) => {
            if (err) throw err;
            console.log(data2);
    
            categories = JSON.parse(data2);
            resolve("successful operation");

        });
    
        

    });


    

}

function getAllPosts()
{
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
        //console.log(posts.length);
        if(posts.length == 0)
        {
            reject("no posts returned");
            return;
        }

        resolve(posts);


    });
    
}

function getPublishedPosts()
{
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
        //console.log(posts.length);
        if(posts.length == 0)
        {
            reject("no posts returned");
            return;
        }
        for(var j = 0; j < posts.length; j++)
        {
            if(posts[j].published)
            {
                resolve(posts[j]);
            }
        }


    });
    
}

function getCategories()
{
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
        //console.log(posts.length);
        if(categories.length == 0)
        {
            reject("no categories returned");
            return;
        }

        resolve(categories);
    });
}

module.exports.addPost = function(postData){
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
        //console.log(posts.length);
        if(typeof postData.published == 'undefined')
        {
            postData.published = false;
            reject("checkbox issue (i.e. 'Published' checkbox not selected)");
            return;
        }
        else
        {
            postData.published = true;
        }

        postData.id = posts.length + 1;

        posts.push(postData);

        resolve(postData);
    });
}




initialize().then(getCategories).then(getPublishedPosts).then(getCategories).catch(function(rejectMsg){
    // catch any errors here
    console.log(rejectMsg);
});;