import Profile from '../models/profile.js';

const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findById(id);

    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getProfile;
