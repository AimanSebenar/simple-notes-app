// server entry point
const express = require("express");
const cors = require("cors");
const notesRoutes = require("./routes/notes.routes");
const app = express();
const PORT = 3000;

app.use(cors()); //allow React comm with API
app.use(express.json()); //parse json req

app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

// app.get("/notes", (req, res) => {
//     res.json(notes);
// });

// app.post("/notes", (req, res) => {
//     notes.push(req.body);
//     res.json(notes);
// });

app.use("/notes", notesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});