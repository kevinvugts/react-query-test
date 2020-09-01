// Link.react.test.js
import React from "react";
import Home from "./index";
import renderer from "react-test-renderer";

describe("Home Page", () => {
  test("Snapshot renders", () => {
    const component = renderer.create(<Home />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
