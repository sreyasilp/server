import Profile from "../models/profile.js";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

// Profile Type
const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    pincode: { type: GraphQLString },
    profilePhoto: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve(parent, args) {
        return Profile.find();
      },
    },
    profile: {
      type: ProfileType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Profile.findById(args.id);
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add or Update a Profile
    createProfile: {
      type: ProfileType,
      args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        street: { type: GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLNonNull(GraphQLString) },
        country: { type: GraphQLNonNull(GraphQLString) },
        pincode: { type: GraphQLNonNull(GraphQLString) },
        profilePhoto: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const {
          id,
          firstName,
          lastName,
          email,
          password,
          phone,
          street,
          city,
          country,
          pincode,
          profilePhoto,
        } = args;

        // create a new one
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
          profilePhoto,
        });

        return newProfile.save();
      },
    },
    // Add or Update a Profile
    updateProfile: {
      type: ProfileType,
      args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        street: { type: GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLNonNull(GraphQLString) },
        country: { type: GraphQLNonNull(GraphQLString) },
        pincode: { type: GraphQLNonNull(GraphQLString) },
        profilePhoto: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const {
          id,
          firstName,
          lastName,
          email,
          password,
          phone,
          street,
          city,
          country,
          pincode,
          profilePhoto,
        } = args;

        // Check if profile with the given id already exists
        const existingProfile = await Profile.findById(id);

        // If profile exists, update it
        if (existingProfile) {
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
          return existingProfile.save();
        }
        return newProfile.save();
      },
    },
    // Delete a Profile
    deleteProfile: {
      type: ProfileType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Profile.findByIdAndRemove(args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
