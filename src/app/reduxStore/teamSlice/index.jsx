import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    team: [{}, {}, {}, {}, {}, {}],
    teamName: 'My Team',
    focus: 0,
    id: undefined,
    fetchedTeams: [],
    showTypeChart: false,
    showLoadedTeams: false,
    showSaveTeam: false,
  },
  reducers: {
    setFocus(state, action){
      state.focus = action.payload
    },
    setTeamName(state, action) {
      state.teamName = action.payload
    },
    addToTeam(state, action) {
      let newTeam = [...state.team];
      newTeam[action.payload.position] = action.payload.pokemon;
      state.team = newTeam;
    },
    removeFromTeam(state, action) {
      state.team = state.team.filter((pokemon, idx) => idx !== action.payload);
    },
    clearTeam(state, action) {
      state.team = [];
    },
    overwriteTeam(state, action) {
      state.team = action.payload;
    },
    modifyMemberProperty(state, action) {
      state.team[action.payload.idx][action.payload.property] = action.payload.value;
    },
    toggleTypeChart(state, action) {
      state.showTypeChart = !state.showTypeChart;
    },
    setFetchedTeams(state, action) {
      state.fetchedTeams = action.payload;
    },
    toggleLoadedTeams(state, action) {
      state.showLoadedTeams = !state.showLoadedTeams;
    },
    toggleSaveTeam(state, action) {
      state.showSaveTeam = !state.showSaveTeam;
    },
    setTeam(state, action) {
      state.id = action.payload._id;
      state.team = action.payload.pokemon;
      state.teamName = action.payload.teamName;
    }
  }
})

export default teamSlice;