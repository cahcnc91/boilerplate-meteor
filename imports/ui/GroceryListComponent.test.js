import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { GroceryListComponent } from './GroceryListComponent';
import { lists } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('GroceryListComponent', function () {

    it('should render component for each list', function () {
      const wrapper = mount(<GroceryListComponent lists={lists}/>);

      expect(wrapper.find('SingleListItem').length).toBe(2);
    });

  });
}
