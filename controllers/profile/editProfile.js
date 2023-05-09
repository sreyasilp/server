import Profile from '../models/profile.js';

const editProfile = async (req, res) => {
  const { id } = req.params;
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
    const existingProfile = await Profile.findById(id);

    if (!existingProfile) return res.status(404).json({ message: "Profile not found" });

    existingProfile.firstName = firstName;
    existingProfile.lastName = lastName;
    existingProfile.email = email;
    existingProfile.password = password;
    existingProfile.phone = phone;
    existingProfile.street = street;
    existingProfile.city = city;
    existingProfile.country = country;
    existingProfile.pincode = pincode;
    existingProfile.profilePhoto = profilePhoto;

    await existingProfile.save();

    res.json(existingProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default editProfile;
