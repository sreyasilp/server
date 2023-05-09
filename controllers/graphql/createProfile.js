import { GraphQLNonNull, GraphQLString } from "graphql";
import ProfileType from "../types/profile.js";
import Profile from "../../../models/profile.js";

const createProfile = {
  type: ProfileType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    pincode: { type: new GraphQLNonNull(GraphQLString) },
    profilePhoto: { type: GraphQLString },
  },
  resolve(parent, args, context) {  
    const newProfile = new Profile({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      password: args.password,
      phone: args.phone,
      street: args.street,
      city: args.city,
      country: args.country,
      pincode: args.pincode,
      profilePhoto: args.profilePhoto,
    });

    return newProfile.save();
  },
};

export default createProfile;
