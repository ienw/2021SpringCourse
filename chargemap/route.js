const router = require('express').Router();
const models = require('./model');

router.route('/stations/:id')       
  .get(async (req, res) => {
    res.json(
      await models.stations
        .findById(req.params.id)
        .populate("Connections")
        .exec()
    );
  })
  .patch(async (req, res) => {
    const result = await models.stations.updateOne({ _id: req.params.id }, req.body);
    res.json(result);
  })
  .delete(async (req, res) => {
    const result = await models.stations.deleteOne({ _id: req.params.id });
    res.json(result);
  });

router.route('/stations')
  .post(async (req, res) => {

    const connections = req.body.stations || []

    const connectionsIds = Promise.all(
      connections.map(async connection => {
        const ConnectionTypeID = await models.connectiontypes.create();
        const LevelID = await models.levels.create();
        const CurrentTypeID = await models.currenttypes.create();
        return models.Connections.create({
          ConnectionTypeID: ConnectionTypeID._id,
          LevelID: LevelID._id,
          CurrentTypeID: CurrentTypeID._id,
          Quantity: connection.Quantity,
        })
      })
    )

    const station = {
      ...req.body,
      Connections: connectionsIds.map(c => c._id),
    }

    const post = await models.stations.create(station);
    res.json(post);
  })
  .get(async (req, res) => {
    const limit = Number(req.query.limit) || 10

    const { topRight, bottomLeft } = req.query

    let geoQuery = null
    if (topRight && bottomLeft) {
      const bLeft = JSON.parse(bottomLeft);
      const tRight = JSON.parse(topRight);
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
      res.json(
        await models.stations.find({
          location: {
            $geoWithin: {
              $geometry: geoQuery
            }
          }
        }).limit(limit).exec()
      )
    } else {
      res.json(
        await models.stations.find().limit(limit).exec()
      )
    }

  });

module.exports = router;



