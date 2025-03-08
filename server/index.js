const express = require("express")
const cors = require("cors")
const pool = require("./db")


const app = express()
app.use(cors())
app.use(express.json())

app.get("/api/notes", async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM notes")
        res.json(result.rows)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error with GET function")
    }
})

app.post("/api/notes", async (req, res) => {
    try {
        const { note } = req.body;  // Change content to note
        const result = await pool.query(
            "INSERT INTO notes (content) VALUES ($1) RETURNING *", [note]
        );
        res.json(result.rows[0]); // Send back the inserted note
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error with POST function");
    }
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))