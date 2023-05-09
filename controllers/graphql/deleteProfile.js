import { GraphQLID } from "graphql";
import ProfileType from "../types/profile.js";
import Profile from "../../../models/profile.js";

const deleteProfile = {
  type: ProfileType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent, args) {
    return Profile.findByIdAndRemove(args.id);
  },
};

export default deleteProfile;
