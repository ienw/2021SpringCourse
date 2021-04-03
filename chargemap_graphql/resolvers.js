import models from './model.js';

const Resolvers = {
  Query: {
    stations: (parent, args) => {
      const limit = args.limit || 10
      const { topRight, bottomLeft } = args

      let geoQuery = null
      if (topRight && bottomLeft) {
        const bLeft = bottomLeft;
        const tRight = topRight;
        geoQuery = {
          type: 'Polygon',
          coordinates: [[
            [bLeft.lat, bLeft.lng], // bottom left
            [tRight.lat, bLeft.lng], //top left
            [tRight.lat, tRight.lng],
            [bLeft.lat, tRight.lng],
            [bLeft.lat, bLeft.lng]
          ]]
        }
      }

      if (geoQuery) {
        return models.stations.find({
            location: {
              $geoWithin: {
                $geometry: geoQuery
              }
            }
          }).populate("Connections").limit(limit).exec()
      } else {
        return models.stations.find().populate("Connections").limit(limit).exec()
      }
    },
    station: (parent, args) => {
      return models.stations
        .findById(args.id)
        .populate("Connections")
        .exec()
    }
 },

 Mutation: {
   removeStation: (parent, args) => {
    return models.stations.deleteOne({ _id: args.id });
   },

   modifyStation: (parent, args) => {
     const argsWithoutId = {...args, id: undefined }
     return models.stations.updateOne({_id: args.id}, argsWithoutId);
   },

   addStation: async (parent, args) => {

    const connections = args.Connections || []

    const connectionsIds = await Promise.all(
      connections.map(async connection => {
        const ConnectionTypeID = await models.connectiontypes.create(connection.ConnectionTypeID);
        const LevelID = await models.levels.create(connection.LevelID);
        const CurrentTypeID = await models.currenttypes.create(connection.CurrentTypeID);
        return models.connections.create({
          ConnectionTypeID: ConnectionTypeID._id,
          LevelID: LevelID._id,
          CurrentTypeID: CurrentTypeID._id,
          Quantity: connection.Quantity,
        })
      })
    )

    const station = {
      ...args,
      Connections: connectionsIds.map(c => c._id),
    }

    const post = await models.stations.create(station);
    return post;
   }
 }

}

export default [Resolvers];
