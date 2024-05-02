/**
 * Impor HTTP Standar Library dari Node.js
 * Hal inilah yang nantinya akan kita gunakan untuk membuat
 * HTTP Server
 * */
const http = require('http');
const { PORT = 8000 } = process.env; // Ambil port dari environment variable

const {people, getData, getDatabyId, deleteDatabyId} = require('./people')

// Request handler
// Fungsi yang berjalan ketika ada request yang masuk.
// const onRequest = (req, res) => {
//   switch(req.url){
//     case '/':
//         res.end('Hello World!');
//         return;
//     case '/about':
//         res.end('This is About!');
//         return;
//     case '/people':
//         res.end(JSON.stringify(people));
//         return;
//     default:
//         res.writeHead(404).end('Not Found!')
//         return;
//   }
// }

const onRequest = (req, res) => {
/* Split Url 
http://localhost:8000 index ke 0
/people index ke 1
/id index ke 2
 */
const splitedUrl = req.url.split('/')[2]
// mengubah dari string menjadi number
const id = +splitedUrl

if(req.url ==='/people') getData(req,res)
else if(req.method ==='GET' && id) getDatabyId(req,res,id)
else if(req.method ==='DELETE' && id) deleteDatabyId(req,res,id)
}

const server = http.createServer(onRequest);

// Jalankan server
server.listen(PORT, 'localhost', () => {
  console.log("Server sudah berjalan, silahkan buka http://localhost:%d", PORT);
})