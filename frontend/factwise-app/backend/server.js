const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require("cors");
const celebritiesData = require("./celebrities.json");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("factwise.db");

db.run(`
CREATE TABLE IF NOT EXISTS celebrities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first TEXT,
  last TEXT,
  dob DATE,
  gender TEXT,
  email TEXT,
  picture TEXT,
  country TEXT,
  description TEXT
)
`);

const insertCelebritiesData = () => {
    celebritiesData.forEach((item) => {
        const { id, first, last, dob, gender, email, picture, country, description } = item;
        db.run(`INSERT OR IGNORE INTO celebrities (id, first, last, dob, gender, email, picture, country, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, first, last, dob, gender, email, picture, country, description]);
    });
};

insertCelebritiesData();

app.get('/', (req, res) => {
    db.all(`SELECT * FROM celebrities`, (err, rows) => {
        if (err) {
            console.error('Error retrieving data:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ rows });
        }
    });
});

app.delete("/celebrities/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM celebrities WHERE id = ?`, [id], (err) => {
        if (err) {
            console.error('Error deleting data:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(`Deleted Celebrity Successfully`);
        }
    });
});

app.put("/celebrities/:id", (req, res) => {
    const { id } = req.params;
    const { first, last, dob, gender, email, picture, country, description } = req.body;
    db.run(`
        UPDATE celebrities 
        SET 
          first = ?, 
          last = ?, 
          dob = ?, 
          gender = ?, 
          email = ?, 
          picture = ?, 
          country = ?, 
          description = ? 
        WHERE id = ?
    `, [first, last, dob, gender, email, picture, country, description, id], (err) => {
        if (err) {
            console.error('Error updating data:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(`Updated celebrity with name ${first} ${last}`);
        }
    });
});

app.get("/celebrities",(req,res) => {
    const search_q  = req.query.search_q
    
    db.all(`SELECT * FROM celebrities WHERE first LIKE '%${search_q}%' OR last LIKE '%${search_q}%'`,(err,rows) => {
        if (err) {
            
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ rows });
        }
    }) 
})

app.post("/celebrities/add", (req, res) => {
    const {
        firstName,
        lastName,
        dob,
        gender,
        email,
        picture,
        country,
        description
    } = req.body;

    // Assuming `db` is your database connection object
    db.run(
        `INSERT OR IGNORE INTO celebrities (first, last, dob, gender, email, picture, country, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, dob, gender, email, picture, country, description],
        (err) => {
            if (err) {
                res.status(500).json("Database error" );
            } else {
               
                res.status(200).json("Celebrity added successfully");
            }
        }
    );
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
