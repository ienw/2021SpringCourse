### Example queries

```graphql
query {
  login(username:"lily",password:"123") {
    user {
      _id,
      username
    }
  	token
  }
}
```

queries other than login require token in headers, example:
```json
{"token":"eyJhbGciOiJIUzI1N...."}
```

```graphql
query {
  stations(
    limit: 2, 
    bottomLeft: { lat: 60.0918986743294, lng: 24.60319519042969 },
  	topright: { lat: 60.38196898834704, lng: 24.94033813476563 }
  ) {
    _id
    Town
    Title
    Connections { _id }
    Location {coordinates, type }
    AddressLine1
    StateOrProvince
    Postcode	
  }
}
```

```graphql
mutation{
  addStation(
      Title: "K Supermarket Mankkaa",
      Town: "Espoo",
      Connections:[{
        Quantity: 2,
        LevelID: { Title: "Level tittle" }
      }]
    	Location: {
        coordinates: [24.767806757085054,
            60.20474678196112],
        type: "Point"
      }
  ){
    _id,
  	Location { coordinates, type }
    Connections {
      Quantity,
      LevelID { Title }
    }
  }
}
```


```graphql
mutation {
  modifyStation(
    id: "5e590b0a7536c009841db2df",
    Title: "Lilys store",
  ){
    _id,
    Title
  }
}
```


```graphql
mutation {
  removeStation(id: "606876a526462b9c5ccc6c68") {
    _id
    Title
    Town
  }
}
```


```graphql
query	{
  station(id: "5e590b0a7536c009841db2df") {
    _id
    Town
    Title
    Connections {
      LevelID {
        Title
      }
    }
  }
}
```