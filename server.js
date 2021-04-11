const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req,res) => {
    let filePath = path.join(__dirname,req.url === '/' ? 'home.html':req.url);

    // Default content type
    let contentType = "text/html";

    // Read file
    fs.readFile(filePath, (err,content) => {
        if(err) {
            if(req.url == "/favicon.ico") {
                res.end();
            } else if (err.code == "ENOENT") {
                fs.readFile(path.join(__dirname,'404.html'),(err,content) => {
                    res.writeHead(404,{ "Content-type": contentType });
                    res.end(content);
                })
            } else {
                console.log(`Server error: ${err.code}`)
                res.writeHead(500)
                res.end();
            }
            
        } else {
            // Success
            res.write(content);
            res.end()
        }
    })
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})
