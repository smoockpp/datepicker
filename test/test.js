var expect = require('chai').expect;
var dPicker = require('../scripts/main.js');

//Test Suite
describe('Date Picker', function() {
  // Test spec (unit test)
  it('should return 29 days of February if a leap year' , function() {
    dPicker.today = new Date('February 11, 2000 11:13:00');
    expect(dPicker.numberDaysInMonth).to.equal(29);
  });
  it('should return 28 days of February if not a leap year' , function() {
    dPicker.today = new Date('February 11, 2017 11:13:00');
    console.log(dPicker.numberDaysInMonth);
    expect(dPicker.numberDaysInMonth).to.equal(28);
  });



});
