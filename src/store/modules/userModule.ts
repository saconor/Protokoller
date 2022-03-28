import { UserWithRole } from "@/models/user.model";

interface State {
  users: UserWithRole[],
  loggedInUser:UserWithRole|null
}

const initialState: State = { users:[], loggedInUser:null };

export const userModule = {
  actions: {
    setLoggedInUser({ commit }: any, payload: UserWithRole): void {
      commit('setLoggedInUser', payload);
    },
    logoutUser({ commit }: any, payload: any): void {
      commit('logoutUser');
    },
  },
  getters: {
    loggedInUser(state: State): any {
      console.log(state)
      return state.loggedInUser;
    },
  },
  mutations: {
    setLoggedInUser(state: State, payload: UserWithRole): void {
      state.loggedInUser = payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logoutUser(state: State): void {
      state.loggedInUser = null;
    },
  },
  namespaced: true,
  state: initialState,
};
