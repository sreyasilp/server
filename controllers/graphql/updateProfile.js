import { GraphQLNonNull, GraphQLID, GraphQLString } from "graphql";
import ProfileType from "../types/profile.js";
import Profile from "../../../models/profile.js";
import MyAuthenticationService from "../../middleware/graphqlAuth.js";

const updateProfile = {
  type: ProfileType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
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
  },
  async resolve(parent, args, context) {
    const decodedToken = MyAuthenticationService.verifyToken(context.req.headers.authorization.split(" ")[1]);
    if (!decodedToken) {
      throw new Error("Invalid token");
    }
    const { id, ...updates } = args;
    const profile = await Profile.findById(id);

    if (!profile) {
      throw new Error(`Profile with ID ${id} does not exist`);
    }

    if (context.user.id !== profile.user.toString()) {
      throw new Error("You can only update your own profile");
    }

    const updatedProfile = await Profile.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return updatedProfile;
  },
};

export default updateProfile;
