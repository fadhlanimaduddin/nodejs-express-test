const pool = require('../lib/db');

// Get all persons
exports.getPersons = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM persons ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get person by ID
exports.getPersonById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM persons WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create person
exports.createPerson = async (req, res) => {
  try {
    const { name, nim, ymd } = req.body;
    const result = await pool.query(
      'INSERT INTO persons (name, nim, ymd) VALUES ($1, $2, $3) RETURNING *',
      [name, nim, ymd]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update person
exports.updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nim, ymd } = req.body;
    const result = await pool.query(
      'UPDATE persons SET name=$1, nim=$2, ymd=$3, updated_at=NOW() WHERE id=$4 RETURNING *',
      [name, nim, ymd, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete person
exports.deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM persons WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json({ message: 'Person deleted', person: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
