var expect = require('expect');
import { Meteor } from 'meteor/meteor';

import { validateNewUser } from './users';

if(Meteor.isServer){
  describe ('Users', function() {
  
    it('should allow valid email address', function () {
      const testUser = {
        emails: [
          {
            address: 'camila@gmail.com'
          }
        ]
      };
  
      const res = validateNewUser(testUser);
  
      expect(res).toBe(true);
    });

    it('should reject invalid email', function () {
      const testUser = {
        emails: [
          {
            address: 'camila'
          }
        ]
      };

      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    })
  
  });
}



