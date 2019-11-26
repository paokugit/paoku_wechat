var t = getApp(),
  e = t.requirejs("core"),
  a = t.requirejs("foxui"),
  i = t.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    subtext: "保存地址",
    province_list: null,
    province_name: null,
    city_list: null,
    city_name: null,
    area_list: null,
    area_name: null,
    addressCity: null,
    multiArray: [], // 三维数组数据
    multiIndex: [0, 0, 0], // 默认的下标,
    selectProvinceId: null,
    selectCityId: null,
    selectAreaId: null,
    realname: "",
    mobile: "",
    areas: "",
    street: "",
    address: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function(options) {
  //   this.loadProivnce();

  //   this.setData({
  //     show: !0
  //   })
  //   var a = this
  //   wx.request({
  //     url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp',
  //     method: 'POST', //请求方式
  //     data: {
  //       type: 0,
  //       id: 0
  //     }, //请求参数

  //     complete() {
  //       wx.hideLoading();
  //     },
  //     success: function(res) {
  //       console.log(res.data)

  //     }
  //   });
  // },
  //省级
  onLoad: function() {
    this.setData({
      show: !0
    })
    var that = this;
    that.getProvince()
  },

  //获取省份列表
  getProvince: function() {
    let that = this
    wx.request({
      url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp',
      data: {
        type: 0,
        id: 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        let provinceList = [...res.data.data.province] //放到一个数组里面
        let provinceArr = res.data.data.province.map((item) => {
          return item.name
        }) //获取名称
        that.setData({
          multiArray: [provinceArr, [],
            []
          ], //更新三维数组  更新完为[['广东','北京'],[],[]]
          province_list: provinceList, //省级原始数据
          province_name: provinceArr, //省级全部名称

        })
        console.log(that.data.multiArray)
        let defaultCode = that.data.province_list[0].id //使用第一项当作参数获取市级数据
        if (defaultCode) {
          that.setData({
            currnetProvinceId: defaultCode //保存当前省份id
          })
          console.log(defaultCode)
          that.getCity(defaultCode) //获取市区数据
        }
      }
    })
  },
  //根据省份id获取城市
  getCity: function(id) {
    let that = this
    that.setData({
      currnetProvinceId: id
    })
    // console.log("市", id)
    wx.request({
      url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp',
      data: {
        type: 1,
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        // console.log(res.data.data)
        let cityArr = res.data.data.province.map((item) => {
          return item.name
        }) //返回城市名称
        let cityList = [...res.data.data.province]
        console.log(cityList)
        that.setData({
          multiArray: [that.data.province_name, cityArr, []], //更新后[['广东','北京'],['潮州'，'汕头','揭阳'],[]]
          city_list: cityList, //保持市级数据
          city_name: cityArr //市级名称
        })
        console.log(that.data.multiArray)
        let defaultCode = that.data.city_list[0].id //获取第一个市的区级数据
        if (defaultCode) {
          that.setData({
            currentCityId: defaultCode //保存当下市id
          })
          that.getArea(defaultCode) //获取区域数据
        }
      }
    })
  },
  //获取区域
  getArea: function(id) {
    let that = this
    that.setData({
      currentCityId: id //保存当前选择市
    })
    wx.request({
      url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp',
      data: {
        type: 2,
        id: id
      },
      success(res) {
        // console.log(res.data.data)
        let areaList = [...res.data.data.province]
        let areaArr = res.data.data.province.map((item) => {
          return item.name
        }) //区域名
        that.setData({
          multiArray: [that.data.province_name, that.data.city_name, areaArr],
          area_list: areaList, //区列表
          area_name: areaArr //区名字
        })

      }
    })
  },
  //picker确认选择地区
  bindRegionChange: function(e) {
    // 因为在获取省中 北京只有一个选项，导致获取不了北京》北京》第一个
    if (e.detail.value[1] == null || e.detail.value[2] == null) { //如果只滚动了第一列则选取第一列的第一数据
      this.setData({
        multiIndex: e.detail.value, //更新下标
        addressCity: [this.data.province_list[e.detail.value[0]].name, this.data.city_list[0].name, this.data.area_list[0].name],
        selectProvinceId: this.data.province_list[e.detail.value[0]].id,
        selectCityId: this.data.city_list[0].id,
        selectAreaId: this.data.area_list[0].id
      })
    } else {
      this.setData({
        multiIndex: e.detail.value, //更新下标
        addressCity: [this.data.province_list[e.detail.value[0]].name, this.data.city_list[e.detail.value[1]].name, this.data.area_list[e.detail.value[2]].name],
        selectProvinceId: this.data.province_list[e.detail.value[0]].id,
        selectCityId: this.data.city_list[e.detail.value[1]].id,
        selectAreaId: this.data.area_list[e.detail.value[2]].id
      })
    }
    console.log(this.data.selectProvinceId, this.data.selectCityId, this.data.selectAreaId)
  },
  //滑动地区组件
  bindRegionColumnChange: function(e) {
    // console.log(e.detail.column,e.detail.value)
    let that = this
    let column = e.detail.column //当前改变的列
    let data = {
      multiIndex: JSON.parse(JSON.stringify(that.data.multiIndex)),
      multiArray: JSON.parse(JSON.stringify(that.data.multiArray))
    }
    data.multiIndex[column] = e.detail.value //第几列改变了就是对应multiIndex的第几个，更新他
    switch (column) {
      case 0: //第一列改变，省级改变
        let currentProvinceId = that.data.province_list[e.detail.value].id
        if (currentProvinceId != that.data.currentProvinceId) { //判断当前id是不是更新了
          that.getCity(currentProvinceId) //获取当前id下的市级数据
        }
        data.multiIndex[1] = 0 //将市默认选择第一个
        break
      case 1: //第二列改变，市级改变
        let currentCityId = that.data.city_list[e.detail.value].id
        if (currentCityId != that.data.currentCityId) {
          that.getArea(currentCityId) //获取区域
        }
        data.multiIndex[2] = 0 //区域默认第一个
        break
    }
    that.setData(data) //更新数据
  },

  nameChange: function(t) {
    console.log(t)
    this.setData({
      realname: t.detail.value,
    })
  },
  phoneChange: function(t) {
    console.log(t)
    this.setData({
      mobile: t.detail.value,
    })
  },
  streetChange: function(t) {
    console.log(t)
    this.setData({
      address: t.detail.value,
    })
  },
  submit: function() {
    console.log(this.data.realname, this.data.mobile)
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