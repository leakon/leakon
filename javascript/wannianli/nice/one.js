/**
 * 公历转换农历
 * Leakon <leakon@gmail.com>
 * 2008-10-27
 */

/**
 * 字典
 * Leap Month	闰月
 * Lunar Month	阴历月份
 * Lunar Date	阴历日期
 */
/**
 * http://gb.weather.gov.hk/gts/time/conversionc.htm
 *
 */

function Leakon_Lunar() {


	// Public methods begin
	this.init		= function(arrDate) {

		// test

		_date	= arrDate;
		_date[0]	= parseInt(arrDate[0]);
		_date[1]	= parseInt(arrDate[1]);
		_date[2]	= parseInt(arrDate[2]);

		/*
		for (var i = 0, len = arrDate.length; i < len; i++) {
			_date[i]	= parseInt(arrDate[i]);
		}
		*/

		// clear cache
		_cache.lunar_day	= false;

		if (_date[_C_YEAR] !== _cache.initialized['year']) {
			_cache.initialized['year']	= false;
		}


		// _C_YEAR, _C_MONTH, _C_DAY
	//	_keyOfDayDiff	= 'get_day_diff_' + _date[_C_YEAR] + '_'
	//			+ _date[_C_MONTH] + '_'+ _date[_C_DAY];
	//	_cache[_keyOfDayDiff]	= false;

		// initialize private properties
		_initialize();

		_getLunars();

		return	_objLunar;

	}

/*
	this.getResult		= function() {
		return	_objLunar;
	}
*/


	this.release		= function() {
		_cache		= {'lunar_day':false, 'initialized':{}};
	}


	this.getTest		= function() {

	//	alert(null === _cache['_diff_2006-10-26']);
	//	alert(null == false);
	//	alert(_test.counter);

	}
	// Public methods end


	var _cache		= {'lunar_day':false, 'initialized':{}};
	var _test		= {'counter':0, 'cacheHelper':{}};

	var _cacheHelper	= new function() {

		this.isCached	= function(strKey) {
			return	('undefined' == typeof _test['cacheHelper'][strKey]) ? false : true;
		}

		this.setCache	= function(strKey, mixedVal) {
			return	_test['cacheHelper'][strKey]	= mixedVal;
		}

		this.getCache	= function(strKey, defaultVal) {
			return	('undefined' == typeof _test['cacheHelper'][strKey]) ? defaultVal : _test['cacheHelper'][strKey];
		}

	}

	// Following are private methods
	var _mathHelper		= new function() {


		this.getMod		= function(decimal) {
			return	decimal - Math.floor(decimal);
		}

		// 广义求余
		this.getModCom		= function(x, w) {
			return	this.getMod(x / w) * w;
		}

		var _retValOfTotalDays;

		//等效标准天数
		this.getTotalDays	= function(y, m, d) {

			// Julian的等效标准天数
			_retValOfTotalDays		= (y - 1) * 365 + Math.floor((y - 1) / 4) + _getDayDiff(y, m, d) - 2;

			if (y > 1582) {
				_retValOfTotalDays	+= -Math.floor((y - 1) / 100) + Math.floor((y - 1) / 400) + 2;	// Gregorian的等效标准天数
			}

			return _retValOfTotalDays;
		}
	}


	var _arrDumper	= [];
	var dump	= function(obj, indent) {

		var _dumpIndent	= '';

		for (var idx in obj) {

			if ('object' == typeof obj[idx] || null == typeof obj[idx]) {
				_arrDumper.push(dump(obj[idx], _dumpIndent + '	'));
			} else {
				_arrDumper.push(_dumpIndent + idx + ": " + obj[idx]);
			}
		}

		if (0 == _dumpIndent.length) {
			alert(_arrDumper.join("\n"));
		}

	}

	var _month1900	= 0;
	var _radianPI	= 0;
	var _timeZone	= 0;
	var _tony_1	= 0;
	var _tony_2	= 0;
	var _tony_3	= 0;
	var _angle_0	= 0;
	var _angle_1	= 0;
	var _angle_2	= 0;
	var _angle_3	= 0;


	// 初始化与指定年份有关的全局变量，当年份改变时，重新计算
	var _initialize		= function() {

		var modernYear	= _date[_C_YEAR];

		if (false !== _cache.initialized['year']) {
			return;
		}


		// ------------------------------------- //
		// Have something to do with Year, Begin

		_month1900	= Math.floor((modernYear - 1900) * 12.3685);
		_radianPI	= 180 / Math.PI;
		_timeZone	= 8;			// 时区

		_tony_1		= (modernYear - 1899.5) / 100;
		_tony_2		= 0.1734 - 3.93e-4 * _tony_1;
		_tony_3		= 693595 + 29 * _month1900;

		_angle_0	= _getAngle(_month1900, _tony_1, 0, 0.75933, 2.172e-4, 1.55e-7)
				+ 0.53058868 * _month1900 - 8.37e-4 * _tony_1 + _timeZone / 24 + 0.5;

		_angle_1	= _getAngle(_month1900, _tony_1, 0.08084821133, 359.2242 / _radianPI,
				0.0000333 / _radianPI, 0.00000347 / _radianPI);

		_angle_2	= _getAngle(_month1900, _tony_1, 7.171366127999999e-2,
				306.0253 / _radianPI, -0.0107306 / _radianPI, -0.00001236 / _radianPI);

		_angle_3	= _getAngle(_month1900, _tony_1, 0.08519585128,
				21.2964 / _radianPI, 0.0016528 / _radianPI, 0.00000239 / _radianPI);

		_prepareLunarDay();

		// Have something to do with Year, End
		// ------------------------------------- //


		// write cache
		_cache.initialized['year']		= modernYear;

	}

	var _optArray			= {};
	_optArray['loop_list_1']	= [];
	_optArray['loop_list_2']	= [];
	_optArray['loop_list_3']	= [];
	_optArray['loop_list_4']	= [];
	_optArray['loop_list_5']	= [];

	_optArray['var_of_loop_a_1']	= [];
	_optArray['var_of_loop_a_2']	= [];
	_optArray['var_of_loop_a_3']	= [];
	_optArray['var_of_loop_a_4']	= [];

	// 为 _getLunarDay 中 loopIndex_1 的循环做缓存优化
	// Should be executed in _initialize
	var _prepareLunarDay	= function() {

		for (var optIndex = -1; optIndex <= 13; optIndex += 0.5) {

			// 这里的 _angle_1 等变量，只与年份有关，可以缓存
			_optArray['loop_list_1'][optIndex]	= _angle_1 + 0.507984293 * optIndex;
			_optArray['loop_list_2'][optIndex]	= _angle_2 + 6.73377553 * optIndex;
			_optArray['loop_list_3'][optIndex]	= _angle_3 + 6.818486628 * optIndex;
			_optArray['loop_list_4'][optIndex]	= _angle_0 + 1.53058868 * optIndex + _tony_2 * Math.sin(_optArray['loop_list_1'][optIndex])
								- 0.4068 * Math.sin(_optArray['loop_list_2'][optIndex])
								+ 0.0021 * Math.sin(2 * _optArray['loop_list_1'][optIndex]) + 0.0161 * Math.sin(2 * _optArray['loop_list_2'][optIndex])
								+ 0.0104 * Math.sin(2 * _optArray['loop_list_3'][optIndex]) - 0.0074 * Math.sin(_optArray['loop_list_1'][optIndex] - _optArray['loop_list_2'][optIndex])
								- 0.0051 * Math.sin(_optArray['loop_list_1'][optIndex] + _optArray['loop_list_2'][optIndex]);

		//	_optArray[loop_list_5][optIndex]	= _tony_3 + 28 * optIndex + _optArray['loop_list_4'][optIndex]; 	// 朔或望的等效标准天数及时刻

			// 重点优化区域，开始
			_optArray['var_of_loop_a_1'][optIndex]	= 5.19595 - 0.0048 * Math.cos(_optArray['loop_list_1'][optIndex]) + 0.002 * Math.cos(2 * _optArray['loop_list_1'][optIndex])
								- 0.3283 * Math.cos(_optArray['loop_list_2'][optIndex]) - 0.006 * Math.cos(_optArray['loop_list_1'][optIndex] + _optArray['loop_list_2'][optIndex])
								+ 0.0041 * Math.cos(_optArray['loop_list_1'][optIndex] - _optArray['loop_list_2'][optIndex]);

			_optArray['var_of_loop_a_2'][optIndex]	= 0.207 * Math.sin(_optArray['loop_list_1'][optIndex]) + 0.0024 * Math.sin(2 * _optArray['loop_list_1'][optIndex])
								- 0.039 * Math.sin(_optArray['loop_list_2'][optIndex]) + 0.0115 * Math.sin(2 * _optArray['loop_list_2'][optIndex])
								- 0.0073 * Math.sin(_optArray['loop_list_1'][optIndex] + _optArray['loop_list_2'][optIndex]) - 0.0067 * Math.sin(_optArray['loop_list_1'][optIndex] - _optArray['loop_list_2'][optIndex])
								+ 0.0117 * Math.sin(2 * _optArray['loop_list_3'][optIndex]);

			_optArray['var_of_loop_a_3'][optIndex]	= Math.abs(_optArray['var_of_loop_a_1'][optIndex] * Math.sin(_optArray['loop_list_3'][optIndex]) + _optArray['var_of_loop_a_2'][optIndex] * Math.cos(_optArray['loop_list_3'][optIndex]));
			_optArray['var_of_loop_a_4'][optIndex]	= 0.0059 + 0.0046 * Math.cos(_optArray['loop_list_1'][optIndex]) - 0.0182 * Math.cos(_optArray['loop_list_2'][optIndex])
								+ 0.0004 * Math.cos(2 * _optArray['loop_list_2'][optIndex]) - 0.0005 * Math.cos(_optArray['loop_list_1'][optIndex] + _optArray['loop_list_2'][optIndex]);

			// 重点优化区域，结束

		} // end of for



	}


	var _getLunarDay 	= function() {

	//	return 0;

		var _year_2, _month_2, _day_2;
		_year_2		= _date[_C_YEAR];
		_month_2	= _date[_C_MONTH];
		_day_2		= _date[_C_DAY];


		// private variables initialize
		var _loop_var_a_1, _loop_var_a_2, _loop_var_a_3, _loop_var_a_4;
		var _arr_list_1, _arr_list_2, _arr_list_3, _arr_list_4, _arr_list_5, _arr_list_6, _arr_list_7;

	//	var shuoD	= 0;	// 本阴历月的阴历朔日数

		var intEclipse	= 0;	// 日月食
		var intLunarDay	= -1;	// 农历日数
		var intShuoTime	= 0;	// 本阴历月的朔时刻
		var intWangDay	= 0;	// 本阴历月的望时刻
		var intWantTime	= 0;	// 本阴历月的阴历望日数

		var _currentIndex;	// 记录当前时间对应的 loopIndex_1 值
		// loopIndex_1 = 整数为朔，loopIndex_1 = 半整数为望
		for (var loopIndex_1 = -1; loopIndex_1 <= 13; loopIndex_1 += 0.5) {

			// 重点优化区域，开始

			/*
			// 这里的 _angle_1 等变量，只与年份有关，可以缓存
			_arr_list_1		= _angle_1 + 0.507984293 * loopIndex_1;
			_arr_list_2		= _angle_2 + 6.73377553 * loopIndex_1;
			_arr_list_3		= _angle_3 + 6.818486628 * loopIndex_1;
			_arr_list_4		= _angle_0 + 1.53058868 * loopIndex_1 + _tony_2 * Math.sin(_arr_list_1) - 0.4068 * Math.sin(_arr_list_2)
						+ 0.0021 * Math.sin(2 * _arr_list_1) + 0.0161 * Math.sin(2 * _arr_list_2)
						+ 0.0104 * Math.sin(2 * _arr_list_3) - 0.0074 * Math.sin(_arr_list_1 - _arr_list_2)
						- 0.0051 * Math.sin(_arr_list_1 + _arr_list_2);

			_arr_list_5		= _tony_3 + 28 * loopIndex_1 + _arr_list_4; 	// 朔或望的等效标准天数及时刻
			*/

			// After cache optimization

		//	_arr_list_1		= _optArray['loop_list_1'][loopIndex_1];
		//	_arr_list_2		= _optArray['loop_list_1'][loopIndex_1];
			_arr_list_3		= _optArray['loop_list_1'][loopIndex_1];
		//	_arr_list_4		= _optArray['loop_list_1'][loopIndex_1];
			_arr_list_5		= _tony_3 + 28 * loopIndex_1 + _optArray['loop_list_4'][loopIndex_1]; 	// 朔或望的等效标准天数及时刻

			// 重点优化区域，结束





			_arr_list_6		= _mathHelper.getTotalDays(_year_2, _month_2, _day_2);

			// 记录当前日期的 _arr_list_5 值
			_arr_list_7		= _arr_list_6 - Math.floor(_arr_list_5);	// 当前日距朔日的差值


			if (loopIndex_1 == Math.floor(loopIndex_1) && _arr_list_7 >= 0 && _arr_list_7 <= 29) {
				_currentIndex		= loopIndex_1;	// 记录当前时间对应的 loopIndex_1 值
				intShuoTime		= _mathHelper.getMod(_arr_list_5);
				intLunarDay		= _arr_list_7 + 1;
			}

			if (loopIndex_1 == (_currentIndex + 0.5)) {
				intWantTime	= _mathHelper.getMod(_arr_list_5);
				intWangDay	= Math.floor(_arr_list_5) - (_arr_list_6 - intLunarDay + 1) + 1;
			}







			// 判断日月食
			if ((intLunarDay == 1 && loopIndex_1 == _currentIndex) || (intLunarDay == intWangDay && loopIndex_1 == (_currentIndex + 0.5))) {

				if (Math.abs(Math.sin(_arr_list_3)) <= 0.36) {



					// 重点优化区域，开始

					/*
					_loop_var_a_1	= 5.19595 - 0.0048 * Math.cos(_arr_list_1) + 0.002 * Math.cos(2 * _arr_list_1)
							- 0.3283 * Math.cos(_arr_list_2) - 0.006 * Math.cos(_arr_list_1 + _arr_list_2)
							+ 0.0041 * Math.cos(_arr_list_1 - _arr_list_2);

					_loop_var_a_2	= 0.207 * Math.sin(_arr_list_1) + 0.0024 * Math.sin(2 * _arr_list_1)
							- 0.039 * Math.sin(_arr_list_2) + 0.0115 * Math.sin(2 * _arr_list_2)
							- 0.0073 * Math.sin(_arr_list_1 + _arr_list_2) - 0.0067 * Math.sin(_arr_list_1 - _arr_list_2)
							+ 0.0117 * Math.sin(2 * _arr_list_3);

					_loop_var_a_3	= Math.abs(_loop_var_a_1 * Math.sin(_arr_list_3) + _loop_var_a_2 * Math.cos(_arr_list_3));
					_loop_var_a_4	= 0.0059 + 0.0046 * Math.cos(_arr_list_1) - 0.0182 * Math.cos(_arr_list_2)
							+ 0.0004 * Math.cos(2 * _arr_list_2) - 0.0005 * Math.cos(_arr_list_1 + _arr_list_2);
					*/


				//	_loop_var_a_1	= _optArray['var_of_loop_a_1'][loopIndex_1];
				//	_loop_var_a_2	= _optArray['var_of_loop_a_2'][loopIndex_1];
					_loop_var_a_3	= _optArray['var_of_loop_a_3'][loopIndex_1];
					_loop_var_a_4	= _optArray['var_of_loop_a_4'][loopIndex_1];



					// 重点优化区域，结束

					if (_loop_var_a_3 - _loop_var_a_4 <= 1.5572) {

						intEclipse		= 1;	// 日食

						if (loopIndex_1 != Math.floor(loopIndex_1)) {

							if (_loop_var_a_3 + _loop_var_a_4 >= 1.0129) {

								intEclipse	= 3;	// 月偏食

							} else {

								intEclipse	= 2;	// 月全食

							}
						}
					}
				}
			}	// 判断日月食 结束




		}	// loopIndex_1 循环结束

		if (intLunarDay == 1) {
			intLunarDay	+= intShuoTime	// 朔日则返回朔的时刻
		}

		if (intLunarDay == intWangDay) {
			intLunarDay	+= intWantTime;	// 望日则返回望的时刻
		}

		var ret			= intLunarDay + intEclipse * 100;
		_cache.lunar_day	= ret;

		return	ret;
	}



	// Private
	// 查找某年的闰月，如果为 0 则该年无闰月
	var _getLeapingMonthByYear	= function(intYear) {
		var indexOfYear		= intYear - intBeginingYear;
		return	parseInt(strLeapMonthSearchMap.charAt(indexOfYear), 16);
	}


	// 农历及日月食
	// Private
	// 角度函数
	var _getAngle		= function(x, t, c1, t0, t2, t3) {
		return	_mathHelper.getMod(c1 * x) * 2 * Math.PI
			+ t0 - t2 * t * t - t3 * t * t * t;
	}


	//干支
	var _getGZString	= function(intYear_12) {
		return	_strCnGZMap_10.charAt(intYear_12 % 10) + _strCnGZMap_12.charAt(intYear_12 % 12);
	}


	//生肖
	var _getZodiacString	= function(idxZodiac) {
		return	_strCnZodiacMap.charAt(idxZodiac);
	}


	//农历月数
	var _getCnMonthString	= function(v) {
		var v0			= Math.abs(v);
		var vstr		= _strCnMonthMap.charAt((v0 - 1) % 10);
		if(v0 > 10) {
			vstr	= '十' + vstr;
		}
		if(v0 == 1) {
			vstr	= '正';
		}
		if(v < 0) {
			vstr	= '闰' + vstr;
		}
		return vstr;
	}


	var _strCnGZMap_10	= '癸甲乙丙丁戊己庚辛壬';
	var _strCnGZMap_12	= '亥子丑寅卯辰巳午未申酉戌';

	var _strCnZodiacMap	= '猪鼠牛虎兔龙蛇马羊猴鸡狗';
	var _strCnMonthMap	= '一二三四五六七八九十';
	var _strCnDayMap	= '十一二三四五六七八九初十廿三';

	// 农历日数
	var _getCnDayString	= function(v) {
		var vstr	= _strCnDayMap.charAt(Math.floor(v / 10) + 10) + _strCnDayMap.charAt(v % 10);
		if (v == 10) {
			vstr	= '初十';
		}
		return vstr;
	}

	var _getLunarMonth 	= function() {

		var y, m, d;
		y	= _date[_C_YEAR];
		m	= _date[_C_MONTH];
		d	= _date[_C_DAY];

		// need lunar day, it can be cached
		var strLunarDay;
		strLunarDay		= _cache.lunar_day === false ? _getLunarDay() : _cache.lunar_day;


		// 农历日数
		var intLunarDays	= Math.floor(strLunarDay - Math.floor(strLunarDay / 100) * 100);

		// 从当年到 -849 年的总闰月数
		var intTotalLeap;

		var keyOfYear	= 'cache_total_leap_year_' + y;
		if (_cacheHelper.isCached(keyOfYear)) {

			intTotalLeap		= _cacheHelper.getCache(keyOfYear, 0);

		} else {

			intTotalLeap		= 0;
			for (var i = -849; i <= y; i++) {
				if(_getLeapingMonthByYear(i) != '0') {
					intTotalLeap++;
				}
			}

			_cacheHelper.setCache(keyOfYear, intTotalLeap);
		}


		// 从当年到 -849 年的有效总月数(扣除闰月)
		var intValidMonth	= Math.round((_mathHelper.getTotalDays(y, m, d) - _intTotalDayOfBeginning - intLunarDays) / 29.530588)
					- intTotalLeap;

		// 历史上的修改月建
		if (y <= 240)	intValidMonth++;
		if (y <= 237)	intValidMonth--;
		if (y < 24)	intValidMonth++;
		if (y < 9)	intValidMonth--;
		if (y <= -255)	intValidMonth++;
		if (y <= -256)	intValidMonth += 2;
		if (y <= -722)	intValidMonth++;

		var lunM	= Math.round(_mathHelper.getModCom(intValidMonth - 3, 12) + 1);

		if(lunM == _getLeapingMonthByYear(y - 1) && m == 1 && d < intLunarDays) {
			// 如果 y - 1 年末是闰月且该月接到了 y 年则 y 年年初也是闰月
			lunM	*= -1;
		} else {
			if (lunM == _getLeapingMonthByYear(y)) {
				lunM	*= -1;
			} else {
				if (lunM < _getLeapingMonthByYear(y) || m < lunM && _getLeapingMonthByYear(y)) {
					lunM++;		// 如果y年是闰月但当月未过闰月则前面多扣除了本年的闰月，这里应当补偿
				}
				lunM	= Math.round(_mathHelper.getModCom(lunM - 1, 12) + 1);
			}
		}
		return lunM;
	}


	// 判断Gregorian历还是Julian历
	// 阳历y年m月(1,2,..,12,下同)d日，opt=1,2,3分别表示标准日历、Gregorge历和Julian历
	var _isGregorianBak 	= function(y, m, d, opt) {
		if (opt == 1){
			if (y > 1582 || (y == 1582 && m > 10) || (y == 1582 && m == 10 && d > 14)) {
				return(1);	// Gregorian
			} else {
				if (y == 1582 && m == 10 && d >= 5 && d <= 14) {
					return(-1);	// 空
				} else {
					return(0);	// Julian
				}
			}
		}
		if(opt == 2) {
			return(1);	// Gregorian
		}
		if(opt == 3) {
			return(0);	// Julian
		}
	}

	var _getMonthJieQi		= function(_year_8, _month_8) {

		var _index_18		= '_' + (_year_8 * 100 - (0 - _month_8));

		if (null != _cache[_index_18]) {
			return	_cache[_index_18];
		}


		var mL		= _getDayDiff(_year_8, _month_8 + 1, 1) - _getDayDiff(_year_8, _month_8, 1);

		var sN0		= 2 * _month_8 - 2;
		var sDt0	= _getSolarTerm(_year_8, sN0, 1);
		var sD0		= _antiDayDiff(_year_8, Math.floor(sDt0));
		var sM0		= Math.floor(sD0 / 100);
		sDate0		= sD0 % 100;

		sN1		= 2 * _month_8 - 1;

		var sDt1	= _getSolarTerm(_year_8, sN1, 1);
		var sD1		= _antiDayDiff(_year_8, Math.floor(sDt1));
		var sM1		= Math.floor(sD1 / 100);
		sDate1		= sD1 % 100;

		sN2		= 2 * _month_8;
		var sDt2	= _getSolarTerm(_year_8, sN2, 1);
		var sD2		= _antiDayDiff(_year_8, Math.floor(sDt2));
		var sM2		= Math.floor(sD2 / 100);
		sDate2		= sD2 % 100;

		var sN3		= 2 * _month_8 + 1;
		if (sN3 > 24) {
			sN3	-= 24;
		}

		var sDt3	= _getSolarTerm(_year_8, sN3, 1);
		var sD3		= _antiDayDiff(_year_8, Math.floor(sDt3));
		var sM3		= Math.floor(sD3 / 100);
		sDate3		= sD3 % 100;

		if (sM0 == _month_8) {
			sN2	= sN1;
			sN1	= sN0;
			sDt2	= sDt1;
			sDt1	= sDt0;
			sDate2	= sDate1;
			sDate1	= sDate0;
		}

		if (sM3 == _month_8) {
			sN1	= sN2;
			sN2	= sN3;
			sDt1	= sDt2;
			sDt2	= sDt3;
			sDate1	= sDate2;
			sDate2	= sDate3;
		}

		sN1		= _mathHelper.getModCom(sN1 - 1, 24) + 1;
		sN2		= _mathHelper.getModCom(sN2 - 1, 24) + 1;

		if (sDate2 > mL) {
			sDate2	-= mL;
		}

		var retObj		= {};
		var index_11_month	= _month_8 + '_' +  sDate1;
		var index_11_day	= _month_8 + '_' +  sDate2;

		retObj[index_11_month]	= _getJieQi(sN1);
		retObj[index_11_day]	= _getJieQi(sN2);

		_cache[_index_18]	= retObj;
		return			retObj;

	}



	//反日差天数
	var _antiDayDiff		= function(_year_11, _x_11) {

		var _j_11, _m_11 = 1;

		for (_j_11 = 1; _j_11 <= 12; _j_11++) {

			var _h_11	= _getDayDiff(_year_11, _j_11 + 1, 1) - _getDayDiff(_year_11, _j_11, 1);

			if (_x_11 <= _h_11 || _j_11 == 12 ) {
				var _m_11	= _j_11;
				break;
			} else {
				_x_11		-= _h_11;
			}
		}

		return 100 * _m_11 + _x_11;

	}

	var _diffRetVal;
	// 日差天数
	var _getDayDiff			= function(y, m, d) {

		//			  year			month
		 var _Y_M		= (y + 4000) * 10000	+ (m + 20) * 100;
		//			  year and month,	day
		 _keyOfDayDiff		= _Y_M			+ (d + 40);

		if (null != _cache[_keyOfDayDiff]) {
			return	_cache[_keyOfDayDiff];
		}





		if (null != _cache[_Y_M]) {

			_diffRetVal	= _cache[_Y_M];

		} else {

			// restore initialize
		//	_arrDayOfMonth		= [0,31,28,31,30,31,30,31,31,30,31,30,31];
			_arrDayOfMonth[2]	= 28;

			var _isGYear;

			if (y > 1582 || (y == 1582 && m > 10) || (y == 1582 && m == 10 && d > 14)) {
				_isGYear	= 1;	// Gregorian
			} else {
			//	if (y == 1582 && m == 10 && d >= 5 && d <= 14) {
				if (y == 1582 && m == 10 && d > 4 && d < 15) {
					_isGYear	= -1;	// 空
				} else {
					_isGYear	= 0;	// Julian
				}
			}

			if (_isGYear) {
				if ((y % 100 != 0 && y % 4 == 0) || (y % 400 == 0)) {
					_arrDayOfMonth[2]	+= 1;
				}
			} else {
				if (y % 4 == 0) {
					_arrDayOfMonth[2]	+= 1;
				}
			}

			_diffRetVal	= 0;
			for (var i = 0; i < m; i++) {
				_diffRetVal	+= _arrDayOfMonth[i];
			}

			_cache[_Y_M]	= _diffRetVal;


			// test
		//	_test.counter++;

		}


		// 以上代码只跟 y m 有关
		//////////////////////////////////////////////////////////////////
		// 一下代码跟 d 有关



		_diffRetVal	+= d;
		if (y == 1582) {
			if (_isGYear == 1) {
				_diffRetVal	-= 10;
			}
			if (_isGYear == -1) {
				_diffRetVal	= 1 / 0;	// infinity
			}
		}

		_cache[_keyOfDayDiff]	= _diffRetVal;


	//	alert(_keyOfDayDiff + ': ' + _diffRetVal);

		return _diffRetVal;

	}


	// 年干支
	var _getGZYear		= function(y, m, d) {
		// 判断是否过立春
		if(_getDayDiff(y, m, d) < (_getSolarTerm(y, 3) - 1)) {
			y	-= 1;
		}
		return Math.round(_mathHelper.getModCom(y - 3, 60));
	}


	// 节气函数
	// pd取值为0或1，分别表示平气和定气，该函数返回节气的D0值
	var _getSolarTerm	= function(y, n, pd) {

		var juD		= y * (365.2423112 - 6.4e-14 * (y - 100) * (y - 100) - 3.047e-8 * (y - 100))
				+ 15.218427 * n + 1721050.71301;	// 儒略日

		var tht		= 3e-4 * y - 0.372781384 - 0.2617913325 * n;	// 角度
		var yrD		= (1.945 * Math.sin(tht) - 0.01206 * Math.sin(2 * tht)) * (1.048994 - 2.583e-5 * y);	// 年差实均数

		var shuoD	= -18e-4 * Math.sin(2.313908653 * y - 0.439822951 - 3.0443 * n);	// 朔差实均数
		var vs		= (pd) ? (juD + yrD + shuoD - _mathHelper.getTotalDays(y, 1, 0) - 1721425)
					: (juD - _mathHelper.getTotalDays(y, 1, 0) - 1721425);

		return vs;
	}

	var _JieQiString	= '小寒大寒立春雨水惊蛰春分清明谷雨立夏小满芒种夏至小暑大暑立秋处暑白露秋分寒露霜降立冬小雪大雪冬至';
	//节气
	var _getJieQi 		= function(_index_11) {
		var _pos_11	= 2 * _index_11;
		return _JieQiString.substring(_pos_11 - 2, _pos_11);
	}

	var _getLunars		= function() {

		var gzYear, lunarDay, lunarMonth, lunarDayString;

		gzYear			= _getGZYear(_date[_C_YEAR], _date[_C_MONTH], _date[_C_DAY]);
		lunarDay		= _getLunarDay();
		lunarMonth		= _getLunarMonth();
		lunarDayString		= Math.floor(lunarDay - Math.floor(lunarDay / 100) * 100);

		_objLunar.lunar_year	= _getGZString(gzYear);
		_objLunar.lunar_month	= _getCnMonthString(lunarMonth);
		_objLunar.lunar_day	= _getCnDayString(lunarDayString);
		_objLunar.lunar_zodiac	= _getZodiacString(gzYear % 12);
		_objLunar.modern	= _date;
		_objLunar.solar_term	= _getMonthJieQi(_date[0], _date[1]);

		_objLunar.int_lunar_year	= gzYear;
		_objLunar.int_lunar_month	= lunarMonth;
		_objLunar.int_lunar_day		= lunarDay;
		_objLunar.str_lunar_day		= lunarDayString;

		return _objLunar;
	}


	// Private properties

	// 记录从公元前 850 年开始
	var intBeginingYear	= -849;
	var _C_YEAR		= 0;
	var _C_MONTH		= 1;
	var _C_DAY		= 2;

	var objTodayate		= new Date();
	var _keyOfDayDiff	= '';

	var _date		= [objTodayate.getFullYear(), objTodayate.getMonth(), objTodayate.getDate()];

	var _objLunar		= {
					'lunar_year':'',	// 干支年
					'lunar_month':'',	// 阴历月
					'lunar_day':'',		// 阴历日
					'lunar_zodiac':'',	// 生肖
					'modern':'',		// modern
					'solar_term':{},	// 节气
					'int_lunar_year':'',
					'int_lunar_month':'',
					'int_lunar_day':'',
					'str_lunar_day':'',
					'null':''
				};

	var _arrDayOfMonth		= [0,31,28,31,30,31,30,31,31,30,31,30,31];

	var _intTotalDayOfBeginning	= _mathHelper.getTotalDays(-849, 1, 21);

	// -849 ~ 2100
	var strLeapMonthSearchMap	= '0c0080050010a0070030c0080050010a0070030c0080050020a0070030c0080050020a0070030c0090050020a0070030c0090050020a0060030c0060030c00900600c0c0060c00c00c00c0c000600c0c0006090303030006000c00c060c0006c00000c0c0c0060003030006c00009009c0090c00c009000300030906030030c0c00060c00090c0060600c0030060c00c003006009060030c0060060c0090900c00090c0090c00c006030006060003030c0c00030c0060030c0090060030c0090300c0080050020a0060030c0080050020b0070030c0090050010a0070030b0090060020a0070040c0080050020a0060030c0080050020b0070030c0090050010a0070030b0090060020a0070040c0080050020a0060030c0080050020b0070030c0090050000c00900909009009090090090090900900909009009009090090090900900900909009009090090090090900900909009009090090090090900900909009009009090090090900900900909009009090060030c0090050010a0070030b008005001090070040c0080050020a0060030c0090040010a0060030c0090050010a0070030b0080050010a008005001090050020a0060030c0080040010a0060030c0090050010a0070030b0080050010a0070030b008005001090070040c0080050020a0060030c0080040010a0060030c0090050010a0070030b008005001090070040c0080050020a0060030c0080040010a0060030c0090050010a0060030c0090050010a0070030b008005001090070040c0080050020a0060030c0080040010a0070030b0080050010a0070040c0080050020a0060030c0080040010a0070030c0090050010a0070030b0080050020a0060030c0080040010a0060030c0090050050020a0060030c0090050010b0070030c0090050010a0070040c0080040020a0060030c0080050020a0060030c0090050010a0070030b0080040020a0060040c0090050020b0070030c00a0050010a0070030b0090050020a0070030c0080040020a0060030c0090050010a0070030c0090050030b007005001090050020a007004001090060020c0070050c0090060030b0080040020a0060030b0080040010a0060030b0080050010a0050040c0080050010a0060030c0080050010b0070030c007005001090070030b0070040020a0060030c0080040020a0070030b0090050010a0060040c0080050020a0060040c0080050010b0070030c007005001090070030c0080050020a0070030c0090050020a0070030c0090050020a0060040c0090050020a0060040c0090050010b0070030c0080050030b007004001090060020c008004002090060020a008004001090050030b0080040020a0060040b0080040c00a0060020b007005001090060030b0070050020a0060020c008004002090070030c008005002090070040c0080040020a0060040b0090050010a0060030b0080050020a0060040c0080050010b00700300108005001090070030c0080050020a007003001090050030a0070030b0090050020a0060040c0090050030b0070040c0090050010c0070040c0080060020b00700400a090060020b007003002090060020a005004001090050030b007004001090050040c0080040c00a0060020c007005001090060030b0070050020a0060020c008004002090060030b008004002090060030b0080040020a0060040b0080040010b0060030b0070050010a00600400207005003080060040030700500307006004003070050030800600400307005004090060040030700500409006005002070050030a0060050030700500400206004002060050030020600400307005004090060040030700500408007005003080050040a00600500307005004002060050030800500400206005002070050040020600500307006004002070050030800600400307005004080060040a006005003080050040020700500409006004002060050030b0060050020700500308006004003070050040800600400307005004080060040020';

}

