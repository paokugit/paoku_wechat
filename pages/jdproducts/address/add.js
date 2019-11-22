var a, e, i = getApp(),
  s = i.requirejs("core");
var f = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: i.globalData.appimg,
    showIcon: true,
    region: ['广东省', '广州市', '海珠区'],
    multiArray: [], //国家省份三级联动数组
    objectMultiArray: '', //中国省份数组
    countriesShowList: [], //展示的国家数组
    provincesShowList: [], //展示的省份数组
    citiesShowList: [], //展示的地区数组
    provincesShow: false, //是否第一次渲染省份数组
    multiSelect: '>', //选中的所在地
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      show: !0
    })
    var a = this
    wx.request({
      url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp',
      method: 'POST', //请求方式
      data: {
        type: 1,
        id: 19
      }, //请求参数
      header: {
        'content-type': 'application/json' // 默认值
      },
      complete() {
        wx.hideLoading();
      },
      success: function(res) {
        console.log(res.data)
        var arr = a.toArr(res.data, "中国")
        console.log(arr)
        a.setData({
          multiArray: [arr.nameList, ['——'],
            ['——']
          ],
          objectMultiArray: arr.itemList,
          countriesShowList: arr.nameList
        })
      }
    });
  },
  toArr(object, findItem) { //object要遍历的对象  findItem查找项
    var nameList = []; //返回的数组
    var itemList = [];
    var allMessage;
    for (var i in object) {
      nameList.push(object[i].name); //属性
      if (findItem && object[i].name == findItem) { //遍历对象，找到findItem的所有数据
        itemList = object[i];
      }
    }
    if (findItem) {
      allMessage = {
        'nameList': nameList,
        'itemList': itemList
      }
    } else {
      allMessage = {
        'nameList': nameList
      }
    }
    return allMessage;
  },
  //城市三级联动选中
  bindMultiPickerChange: function (e) {
    var index = e.detail.value;
    var arr;

    if (index[0] == 36) { //选中中国
      if (index[1] == null) {
        if (this.data.citiesShowList[index[2]] && this.data.citiesShowList[index[2]] != '——') {
          arr = this.data.countriesShowList[index[0]] + ',' + this.data.provincesShowList[0] + ',' + this.data.citiesShowList[index[2]]
        } else {
          arr = this.data.countriesShowList[index[0]] + ',' + this.data.provincesShowList[0]
        }
      } else {
        if (this.data.citiesShowList[index[2]] && this.data.citiesShowList[index[2]] != '——') {
          arr = this.data.countriesShowList[index[0]] + ',' + this.data.provincesShowList[index[1]] + ',' + this.data.citiesShowList[index[2]]
        } else {
          arr = this.data.countriesShowList[index[0]] + ',' + this.data.provincesShowList[index[1]]
        }
      }
    } else {
      arr = this.data.countriesShowList[index[0]]
    }
    this.setData({
      multiSelect: arr
    })
  },
  //三级联动城市改变
  bindMultiPickerColumnChange: function (e) {
    var provincesList = this.data.objectMultiArray.provinces;  //省份
    var provincesArr = this.toArr(provincesList).nameList;  //省份数组

    //移动第一列时，选中中国的情况
    if (e.detail.column == 0 && e.detail.value == 36) {
      this.setData({
        multiArray: [this.data.multiArray[0], provincesArr, ['——']],
        provincesShowList: provincesArr,
        provincesShow: true
      })
    } else if (e.detail.column == 0 && e.detail.value != 36) {   //选中非中国的国家情况 
      this.setData({
        multiArray: [this.data.multiArray[0], ['——'], ['——']]
      })
    }

    //移动第二列，选中相应的省份显示地区
    if (e.detail.column == 1 && this.data.provincesShow) {
      var findProvincesList = this.toArr(provincesList, provincesArr[e.detail.value]); //provincesArr[e.detail.value] 当前选中的省份
      var findCitiesList = this.toArr(findProvincesList.itemList.cities); //当前选中省份的地区数组
      var citiesList;

      if (findCitiesList.nameList.length > 0) { //当前省份是否有城市
        citiesList = findCitiesList.nameList;
      } else {
        citiesList = ['——'];
      }
      this.setData({
        multiArray: [this.data.multiArray[0], provincesArr, citiesList],
        citiesShowList: citiesList
      })
    }
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})