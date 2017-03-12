'use strict';

// Create a Class of DatePicker

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DatePicker = function () {
  // constructor for date
  function DatePicker(month, year, firstDay) {
    var _this = this;

    _classCallCheck(this, DatePicker);

    // array with all the months in Strings
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // array with all the dayss from the week in Strings
    this.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    // creating new Date and passing current month, current year and first day of the month as arguments
    this.today = new Date(year, month, firstDay);
    // arrow function that returns how many days each month have
    this.numberDays = function () {
      // checks if month is February and if it's leap year
      if (_this.monthNum == 1) {
        // February only!
        if (_this.year % 4 === 0 && _this.year % 100 !== 0 || _this.year % 400 === 0) {
          return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
      }
      // else returns for non leap year
      return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    };
    this.monthNum = new Date(this.today).getMonth();
    // Current year
    this.year = new Date(this.today).getFullYear();
    // Current month in String
    this.month = this.months[new Date(this.today).getMonth()];
    // Current day from the week
    this.firstDayOfWeek = this.today.getDay() === 0 ? 7 : this.today.getDay();
    // Number of days in current month
    this.numberDaysInMonth = this.numberDays()[new Date(this.today).getMonth()];
    // Current date
    this.dayDate = new Date().getDate();
    this.html = '';
    this.state = false;
    this.pickerValue = '';
  }
  // Methods


  _createClass(DatePicker, [{
    key: 'prevMonth',
    value: function prevMonth() {
      this.clearUI();
      if (this.monthNum === 0) {
        this.monthNum = 12;
        this.year--;
      }
      this.today = new Date(this.year, this.monthNum - 1, 1);
      console.log(this.monthNum);
      this.monthNum = new Date(this.today).getMonth();
      // Current month in String
      this.month = this.months[new Date(this.today).getMonth()];
      // Current day from the week
      this.firstDayOfWeek = this.today.getDay() === 0 ? 7 : this.today.getDay();
      // Number of days in current month
      this.numberDaysInMonth = this.numberDays()[new Date(this.today).getMonth()];
      // Current new Date()
      this.init();
    }
  }, {
    key: 'nextMonth',
    value: function nextMonth() {
      this.clearUI();
      this.today = new Date(this.year, this.monthNum + 1, 1);
      this.monthNum = new Date(this.today).getMonth();
      if (this.monthNum % 12 === 0) {
        this.monthNum = 0;
        this.year++;
      }

      // Current month in String
      this.month = this.months[new Date(this.today).getMonth()];
      // Current day from the week
      this.firstDayOfWeek = this.today.getDay() === 0 ? 7 : this.today.getDay();
      // Number of days in current month
      this.numberDaysInMonth = this.numberDays()[new Date(this.today).getMonth()];
      // Current new Date()
      this.init();
    }
    // Method to initialize UI

  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      if (this.state === false) {
        (function () {
          var weekDaysTd = function weekDaysTd() {
            var html = '';
            _this2.days.forEach(function (x) {
              html += '\n            <td>\n              ' + x + '\n            </td>\n          ';
            });
            return html;
          };
          var daysRows = function daysRows() {
            var day = 1;
            var html = '';
            for (var i = 0; i < 9; i++) {
              html += '<tr>';
              for (var j = 1; j <= 7; j++) {
                html += '<td>';
                // if day <=
                if (day <= _this2.numberDaysInMonth && (i > 0 || j >= _this2.firstDayOfWeek)) {
                  var today = new Date().getDate();
                  var todaysMonth = new Date().getMonth();
                  var todaysYear = new Date().getFullYear();
                  if (day == today && _this2.monthNum == todaysMonth && _this2.year == todaysYear) {
                    html += '<span class="today">' + day + '</span>';
                    day++;
                  } else {
                    html += '' + day;
                    day++;
                  }
                }
                html += '</td>';
              }
              if (day > _this2.numberDaysInMonth) {
                break;
              }
              html += '</tr>';
            }
            return html;
          };
          _this2.html = '\n        <table Class="calendar">\n          <thead>\n            <tr class="table-header">\n              <th colspan="7">\n              <span id=\'prev-month\' onClick="n.prevMonth()">&#8630;</span><span class="month-year">' + _this2.month + ' &nbsp; ' + _this2.year + '</span><span id=\'next-month\' onClick="n.nextMonth()">&#8631;</span>\n              </th>\n            </tr>\n            <tr class="weekdays">' + weekDaysTd() + '</tr>\n          </thead>\n          <tbody>' + daysRows() + '</tbody>\n        </table>\n      ';
          var calendarDiv = document.getElementById('calendar');
          calendarDiv.innerHTML += '\n        <div>\n          ' + _this2.html + '\n        </div>\n      ';
          _this2.state = true;
          var tds = document.querySelectorAll('tbody tr td');
          var monthToPass = function monthToPass() {
            var month = _this2.monthNum + 1;
            if (month === 10 || month === 11 || month === 12) {
              return month;
            } else {
              return '0' + month;
            }
          };
          var yearToPass = _this2.year;

          var _loop = function _loop(i) {
            tds[i].addEventListener('click', function (e) {
              if (tds[i].innerHTML) {
                var dateToPass = e.target.innerHTML;
                if (Number(dateToPass) < 10) {
                  dateToPass = '0' + dateToPass;
                } else {
                  dateToPass;
                }
                _this2.pickerValue = dateToPass + '/' + monthToPass() + '/' + yearToPass;
                document.querySelector('input[name="datepicker"]').setAttribute('value', _this2.pickerValue);

                _this2.clearUI();
                console.log(_this2.pickerValue);
              }
            });
          };

          for (var i = 0; i < tds.length; i++) {
            _loop(i);
          }
        })();
      } else {
        this.clearUI();
      }
    }
  }, {
    key: 'clearUI',
    value: function clearUI() {
      document.getElementById('calendar').innerHTML = '';
      this.state = false;
    }
  }]);

  return DatePicker;
}();

var year = new Date().getFullYear();
var month = new Date().getMonth();
var n = new DatePicker(month, year, 1);

// console.log(n.firstDayOfWeek);
document.querySelector('input[name="datepicker"]').addEventListener('click', function () {
  n.init();
});

document.querySelector('input[type="submit"]').addEventListener('click', function (e) {
  e.preventDefault();

  console.log(e.target);
});

// module.exports = new DatePicker();