import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  EDIT_POST,
  POST_LOADING,
  GET_CURRENT_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case GET_CURRENT_POST:
      return {
        ...state,
        post: null
      }
    case EDIT_POST:
      return {
        ...state, 
        post: [action.payload]
      }
    default:
      return state;
  }
}
