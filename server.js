const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/questions") {
    res.writeHead(200, { "Content-Type": "application/json" });
    fs.createReadStream("questions.json").pipe(res);
    return;
  }

  const filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url,
  );

  const file = fs.createReadStream(filePath);
  file.on("error", () => {
    res.writeHead(404);
    res.end("File not found!");
  });
  file.pipe(res);
});

server.listen(3000, () => console.log("Server running on port 3000"));
