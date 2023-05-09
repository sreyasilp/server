import { GraphQLID } from "graphql";
import ProfileType from "../types/profile.js";
import Profile from "../../../models/profile.js";

const getProfile = {
  type: ProfileType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent, args) {
    return Profile.findById(args.id);
  },
};

export default getProfile
