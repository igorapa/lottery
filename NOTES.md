Lottery

export MONGO_URL=mongodb://url/loterry

http://localhost:3000/grapqhl?query={counter}
http://localhost:3000/grapqhl?query={message,counter}

mongoimport -d lottery -c megasena --type csv --headerline --file megasena_062216.csv

{
  __type(name: "Query"){
    name
    possibleTypes {
      kind
      name
      description
    }
    kind
  }
}

{
  employee(id: 10) {
    name
    age
    fisrtBoss: boss(level: 5) {
      name
      age
    }
    secondBoss: boss(lebel: 10) {
      name
      age
    }
  }
}

fragment personInfo on Employee {
  name,
  age
}

{
  employee(id: 88) {
    ...personInfo
    fisrtBoss: boss(level: 5) {
      ...personInfo
    }
    secondBoss: boss(lebel: 10) {
      ...personInfo
    }
  }
}



mutation: new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    incrementCounter: {
      type: GraphQLInt,
      resolve: () => ++counter
    }
  })
})

// console.log(
//   Relay.QL`
//     query Query {
//       megasena {
//         _id,
//         Concurso
//         Valor_Acumulado
//       }
//     }
//   `
// );
