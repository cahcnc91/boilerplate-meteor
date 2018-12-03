import { Meteor } from "meteor/meteor";
import React from "react";
var expect = require("expect");
import { mount } from "enzyme";

import { lists } from "../fixtures/fixtures";
import { SingleListItem } from "./SingleListItem";

if (Meteor.isClient) {
  describe("SingleListItem", function() {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it("should render titles of lists", function() {
      const wrapper = mount(
        <SingleListItem list={lists[0]} Session={Session} />
      );

      expect(wrapper.find("h4").text()).toBe(lists[0].listName);
    });

    it("should call set on click", function() {
      const wrapper = mount(
        <SingleListItem list={lists[0]} Session={Session} />
      );

      wrapper.find("div").simulate("click");
      expect(Session.set).toHaveBeenCalledWith("selectedListId", lists[0]._id);
    });
  });
}
