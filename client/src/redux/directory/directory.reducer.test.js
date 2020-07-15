import directoryReducer, { INITIAL_STATE } from "./directory.reducer";

describe("test directory reducer", () => {
  it("should return initial state", () => {
    expect(directoryReducer(undefined, {})).toEqual(INITIAL_STATE);
  });
});
