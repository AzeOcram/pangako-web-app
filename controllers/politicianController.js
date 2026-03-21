import Politician from '../models/Politician.js';

// GET all politicians
export const getAllPoliticians = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { firstname: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } },
        { fullname: { $regex: search, $options: 'i' } },
      ];
    }

    const politicians = await Politician.find(filter).sort({ lastname: 1 });
    res.json({ success: true, data: politicians });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET single politician by ID
export const getPolitician = async (req, res) => {
  try {
    const politician = await Politician.findById(req.params.id);
    if (!politician) return res.status(404).json({ success: false, message: 'Politician not found' });
    res.json({ success: true, data: politician });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST create politician
export const createPolitician = async (req, res) => {
  try {
    const politician = new Politician(req.body);
    await politician.save();
    res.status(201).json({ success: true, data: politician });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT update politician
export const updatePolitician = async (req, res) => {
  try {
    const politician = await Politician.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!politician) return res.status(404).json({ success: false, message: 'Politician not found' });
    res.json({ success: true, data: politician });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE politician
export const deletePolitician = async (req, res) => {
  try {
    const politician = await Politician.findByIdAndDelete(req.params.id);
    if (!politician) return res.status(404).json({ success: false, message: 'Politician not found' });
    res.json({ success: true, message: 'Politician deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
