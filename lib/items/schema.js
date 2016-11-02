import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLSchema
} from 'graphql';

import Db from './db';

const Item = new GraphQLObjectType({
    name: 'Item',
    description: '',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                resolve(item) { item.id }
            },
            name: {
                type: GraphQLString,
                resolve(item) { item.name }
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'root query',
    fields: () => {
        return {
            bag: {
                type: new GraphQLList(Item),
                args: {
                    id: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    console.log(JSON.stringify(args))
                    const result =  Db.models.item.findAll({where: args})
                    console.log(JSON.stringify(result))
                    return result
                }
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query
})

export default Schema