import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
  } from 'graphql';
  
  const ProfileType = new GraphQLObjectType({
    name: 'Profile',
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
  
  export default ProfileType;
  