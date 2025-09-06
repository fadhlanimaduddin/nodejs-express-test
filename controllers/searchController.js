const axios = require('axios');
const DATA_URL = 'https://bit.ly/48ejMhW';


async function fetchData() {
  const res = await axios.get(DATA_URL);
  const raw = res.data.DATA;


  const lines = raw.trim().split('\n');
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const [name, nim, ymd] = lines[i].split('|');
    result.push({ name, nim, ymd });
  }

  return result;
}

// Search by name
exports.searchByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: 'Name query is required' });

    const data = await fetchData();
    const result = data.filter(item => item.name.toLowerCase() === name.toLowerCase());

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search by NIM
exports.searchByNim = async (req, res) => {
  try {
    const { nim } = req.query;
    if (!nim) return res.status(400).json({ error: 'NIM query is required' });

    const data = await fetchData();
    const result = data.filter(item => item.nim === nim);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search by YMD
exports.searchByYmd = async (req, res) => {
  try {
    const { ymd } = req.query;
    if (!ymd) return res.status(400).json({ error: 'YMD query is required' });

    const data = await fetchData();
    const result = data.filter(item => item.ymd === ymd);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
