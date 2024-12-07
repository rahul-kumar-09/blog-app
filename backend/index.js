const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Worlds!");
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
