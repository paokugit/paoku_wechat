var t = getApp(),
  e = t.requirejs("core"),
  a = t.requirejs("foxui"),
  i = t.requirejs("jquery");
//   当前登录人的openid
var f = getApp();
var useropenid = "";
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
    detailaddress: "",
    ajxtrue: false,
    productid: '',
    productcount: '',
    productprice: '',
    paramaddressid: '',
    paramproviceid: '',
    paramcityid: '',
    paramareaid: '',
    paramsku: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    var that = this;
    that.setData({
      show: !0,
      productid: options.id,
      productcount: options.count,
      productprice: options.totalprice,
      paramsku: options.goodssku
    })
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
        })
        that.setData({
          multiArray: [provinceArr, [],
            []
          ],
          province_list: provinceList, //省级原始数据
          province_name: provinceArr, //省级全部名称

        })
        console.log(that.data.multiArray)
        let defaultCode = that.data.province_list[0].id
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
        let cityArr = res.data.data.province.map((item) => {
          return item.name
        })
        let cityList = [...res.data.data.province]
        console.log(cityList)
        that.setData({
          multiArray: [that.data.province_name, cityArr, []],
          city_list: cityList, //保持市级数据
          city_name: cityArr //市级名称
        })
        console.log(that.data.multiArray)
        let defaultCode = that.data.city_list[0].id
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
    console.log(this.data.addressCity[0], this.data.addressCity[1], this.data.addressCity[2], this.data.selectProvinceId, this.data.selectCityId, this.data.selectAreaId)
  },
  //滑动地区组件
  bindRegionColumnChange: function(e) {
    let that = this
    let column = e.detail.column
    let data = {
      multiIndex: JSON.parse(JSON.stringify(that.data.multiIndex)),
      multiArray: JSON.parse(JSON.stringify(that.data.multiArray))
    }
    data.multiIndex[column] = e.detail.value
    switch (column) {
      case 0:
        let currentProvinceId = that.data.province_list[e.detail.value].id
        if (currentProvinceId != that.data.currentProvinceId) {
          that.getCity(currentProvinceId)
        }
        data.multiIndex[1] = 0
        break
      case 1:
        let currentCityId = that.data.city_list[e.detail.value].id
        if (currentCityId != that.data.currentCityId) {
          that.getArea(currentCityId)
        }
        data.multiIndex[2] = 0
        break
    }
    that.setData(data)
  },

  nameChange: function(t) {
    this.setData({
      realname: t.detail.value,
    })
  },
  phoneChange: function(e) {
    this.setData({
      mobile: e.detail.value,
    })
    var phone = e.detail.value;
    let that = this
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      this.setData({
        ajxtrue: false
      })
    } else {
      this.setData({
        ajxtrue: true
      })
      console.log('验证成功', that.data.ajxtrue)
    }
  },
  streetChange: function(t) {
    this.setData({
      detailaddress: t.detail.value,
    })
  },
  submit: function() {
    var tt = this
    console.log(this.data.realname, this.data.mobile)
    if (tt.data.realname == "") {
      return void a.toast(tt, "请填写收件人")
    } else {
      if (tt.data.mobile == "") {
        return void a.toast(tt, "请填写联系电话")
      } else if (tt.data.ajxtrue == false) {
        return void a.toast(tt, "请填写正确联系电话")
      } else {
        if (tt.data.addressCity == null) {
          return void a.toast(tt, "请选择所在地区")
        } else {
          if (tt.data.detailaddress == "") {
            return void a.toast(tt, "请填写详细地址")
          } else {
            console.log('保存地址')
            wx.request({
              url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.add_address&comefrom=wxapp',
              data: {
                openid: useropenid,
                realname: tt.data.realname,
                mobile: tt.data.mobile,
                province: tt.data.addressCity[0],
                province_id: tt.data.selectProvinceId,
                city: tt.data.addressCity[1],
                city_id: tt.data.selectCityId,
                area: tt.data.addressCity[2],
                area_id: tt.data.selectAreaId,
                address: tt.data.detailaddress
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res)
                if (res.data.error == 0) {
                  tt.setData({
                    paramaddressid: res.data.data.address_id,
                    paramproviceid: res.data.data.province_id,
                    paramcityid: res.data.data.city_id,
                    paramareaid: res.data.data.area_id
                  })
                  void a.toast(tt, "保存成功")
                  setTimeout(function() {
                    wx.redirectTo({
                      url: '/pages/jdproducts/order/index?id=' + tt.data.productid + '&count=' + tt.data.productcount + '&totalprice=' + tt.data.productprice + '&addressid=' + tt.data.paramaddressid + '&proviceid=' + tt.data.paramproviceid + '&cityid=' + tt.data.paramcityid + '&areaid=' + tt.data.paramareaid + '&goodssku=' + tt.data.paramsku,
                    });
                  }, 1e3);

                }

              }
            })
          }
        }
      }
    }
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