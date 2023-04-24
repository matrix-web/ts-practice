const mutations = {
  setFavoriteAmount(state, payload) {
    return (state.user.favoriteAmount = payload);
  },
  setPlaces(state, payload) {
    state.places = payload;

    return state;
  },
  setCheckInDate(state, payload) {
    state.checkInDate = payload;

    return state;
  },
  setCheckOutDate(state, payload) {
    state.checkOutDate = payload;

    return state;
  },
};

export type MutationType = typeof mutations;

export default mutations;
