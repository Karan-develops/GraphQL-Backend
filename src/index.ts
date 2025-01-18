import express from "express";

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.json({ message: "Everything is good!" });
});

app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});
