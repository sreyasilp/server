import Profile from '../models/profile.js';

const deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProfile = await Profile.findByIdAndRemove(id);

    res.json(deletedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default deleteProfile;
