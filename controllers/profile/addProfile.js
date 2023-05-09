import Profile from '../models/profile.js';

const addProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    street,
    city,
    country,
    pincode,
    profilePhoto
  } = req.body;

  try {
    const newProfile = new Profile({
      firstName,
      lastName,
      email,
      password,
      phone,
      street,
      city,
      country,
      pincode,
      profilePhoto
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default addProfile;
