const state = {
  user: {
    name: "Alex Johnson",
    avatarPath: "../../img/avatar.png",
    favoriteAmount: 0,
  },
  places: [],
  checkInDate: null,
  checkOutDate: null,
};

export type StateType = typeof state;

export default state;
