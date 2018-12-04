import { Meteor } from "meteor/meteor";
import React from "react";
var expect = require("expect");
import { mount } from "enzyme";

import { Editor } from "./Editor";
import { lists } from "../../fixtures/fixtures";

if (Meteor.isClient) {
  describe("Editor", function() {
    let browserHistory;
    let call;

    beforeEach(function() {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it("should render pick list message", function() {
      const wrapper = mount(
        <Editor browserHistory={browserHistory} call={call} />
      );

      expect(wrapper.find("p").text()).toBe("Choose a List");
    });

    it("should render not found message", function() {
      const wrapper = mount(
        <Editor
          browserHistory={browserHistory}
          call={call}
          selectedListId={lists[0]._id}
        />
      );

      expect(wrapper.find('p').text()).toBe('List Not found');
    });

   /* it('should remove list', function () {
      const wrapper = mount(<Editor
          browserHistory={browserHistory}
          call={call}
          selectedListId={lists[0]._id}
        />)

      wrapper.find("button").simulate("click");
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
      expect(call).toHaveBeenCalledWith('groceryLists.remove', lists[0]._id)
    });  */

  });
}
