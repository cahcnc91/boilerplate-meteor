import { Meteor } from "meteor/meteor";
import React from "react";
var expect = require("expect");
import { mount } from "enzyme";

import SingleListItem from './SingleListItem';

if(Meteor.isClient){
  describe('SingleListItem', function () {
    
    it('should render titles of lists', function () {
      const listName = 'This a test Title';
      const wrapper = mount(<SingleListItem groceryList={{listName}}/>)

      expect(wrapper.find('h4').text()).toBe(listName);
    });
  });

}
