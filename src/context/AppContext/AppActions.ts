import { TActionTypes, makeAction } from "./App.types";

const AppActions = {
  addBoundary: makeAction(TActionTypes.ADD_BOUNDARY),
  addDestination: makeAction(TActionTypes.ADD_DESTINATION),
  addPerson: makeAction(TActionTypes.ADD_PERSON),
  attachDestinations: makeAction(TActionTypes.ATTACH_DESTINATIONS),
  clearDestinations: makeAction(TActionTypes.CLEAR_DESTINATIONS),
  deleteBoundary: makeAction(TActionTypes.DELETE_BOUNDARY),
  deleteDestination: makeAction(TActionTypes.DELETE_DESTINATION),
  setArea: makeAction(TActionTypes.SET_AREA),
  setCurrentIP: makeAction(TActionTypes.SET_CURRENT_IP),
  swapDestinations: makeAction(TActionTypes.SWAP_DESTINATIONS),
  updateBoundary: makeAction(TActionTypes.UPDATE_BOUNDARY),
  updateDestination: makeAction(TActionTypes.UPDATE_DESTINATION),
  updateDestinationDelay: makeAction(TActionTypes.UPDATE_DESTINATION_DELAY),
  updateDestinationName: makeAction(TActionTypes.UPDATE_DESTINATION_NAME),
};

export { AppActions };
