const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;
const mongoose = require('mongoose');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');
const SongType = require('./song_type');
const LyricType = require('./lyric_type');
const UserType = require('./user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
      },
      resolve(parentValue, { title }) {
        return new Song({ title }).save();
      },
    },
    updateSong: {
      type: SongType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
      },
      resolve(parentValue, { id, title }) {
        return Song.findByIdAndUpdate(id, { title }, { new: true });
      },
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID },
      },
      resolve(parentValue, { content, songId }) {
        return Song.addLyric(songId, content);
      },
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Lyric.like(id);
      },
    },
    updateLyric: {
      type: LyricType,
      args: {
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        likes: { type: GraphQLInt },
      },
      resolve(parentValue, { id, content, likes }) {
        return Lyric.findOneAndUpdate(
          { _id: id },
          { content, likes },
          { new: true }
        );
      },
    },
    deleteLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Lyric.findByIdAndRemove(id);
      },
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Song.findByIdAndRemove(id);
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, request) {
        return AuthService.login({ email, password, request });
      },
    },
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, request) {
        return AuthService.signup({ email, password, request });
      },
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, request) {
        const { user } = request;
        request.logout();
        return user;
      }
    }
  },
});

module.exports = mutation;
