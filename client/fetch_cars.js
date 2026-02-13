const http = require('http');

http.get('http://localhost:5000/api/cars', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received.
    resp.on('end', () => {
        try {
            console.log(data);
        } catch (e) {
            console.error("Error parsing JSON!", e);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
