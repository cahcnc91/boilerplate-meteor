import { Meteor } from 'meteor/meteor';
import React from 'react';
var expect = require('expect');
import { mount } from 'enzyme';

import { PrivateHeader } from './PrivateHeader';

if(Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should set button text to logout', function () {
      const wrapper = mount( <PrivateHeader title='Test Title' handleLogout={() => {}}/>)
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title props as h1 text', function () {
      const wrapper = mount( <PrivateHeader title='Test title 1'/>)
      const buttonText = wrapper.find('h2').text();

      expect(buttonText).toBe('Test title 1');
    })

    it('should call handle Logout onclick', function () {
      const spy = expect.createSpy();
      const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/>);

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalled();
    });


  });
}