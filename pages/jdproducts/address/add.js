var a, e, i = getApp(),
  s = i.requirejs("core");
var f = getApp();
//定义三列数组数据，用于存储省、市、县
let multiArray0 = [];
let multiArray1 = [];
let multiArray2 = [];
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalimg: i.globalData.appimg,
    showIcon: true,
    region: ['广东省', '广州市', '海珠区'],
    multiIndex: [],
    multiArray: [multiArray0, multiArray1, multiArray2], //封装obj
    multiIndex: [0, 0, 0],
    location_id: 41, //默认省份id
    city_id: "411300000000", //默认城市id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadProivnce();

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

      }
    });
  },

  //绑定选择器滑动事件
  bindMultiPickerColumnChange: function(e) {
    let that = this;
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    let data = {
      multiArray: that.data.multiArray,
      multiIndex: that.data.multiIndex
    };

    data.multiIndex[e.detail.column] = e.detail.value;


    //data.multiIndex[0] : 第一列选择第几个
    //data.multiIndex[1] : 第二列选择第几个

    console.log("multiIndex0:" + data.multiIndex[0])
    console.log("multiIndex1:" + data.multiIndex[1])


    let province_id = multiArray0[data.multiIndex[0]].location_id; //获取选择到的省份id
    let city_id = multiArray1[data.multiIndex[1]].location_id; //获取选择到的市区id

    let obj = {
      province_id: province_id, //第一列父元素ID
      city_id: city_id, //第二列父元素ID
      that: that,
      column: e.detail.column,
      valueIndex: e.detail.value
    }
    changePicker(obj);
  },
  //获取省份，后端提供的省份接口地址
  loadProivnce() {
    let that = this;
    wx.request({
      url: "http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp",
      method: "post",
      data: {
        type: 0,
        id: 0
      },

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        let dataArray = res.data.data.province;
        multiArray0 = dataArray;
        //根据默认省，获取默认市
        that.loadCity(that.data.location_id)
      }
    })
  },
  //获取市级，后端提供的市级接口地址
  loadCity(location_id) {
    let that = this;
    wx.request({
      url: "http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp",
      method: "post",
      data: {
        type: 1,
        id: location_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
        let dataArray = res.data.data.province
        multiArray1 = dataArray;
        //根据默认市获取对应区
        that.loadCountry(that.data.city_id)
      }
    })
  },
  //获取区县
  loadCountry(location_id) {
    let that = this;
    wx.request({
      url: "http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp",
      method: "post",
      data: {
        type: 2,
        id: location_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
        let dataArray = res.data.data.province
        multiArray2 = dataArray;

        let province_id = that.data.location_id; //默认的省份id 
        let city_id = that.data.city_id; //默认的市区id 
        let multiArray0Index = 0,
          multiArray1Index = 0;
        multiArray0.map(function(v, i) {
          //获取省份所在列的位置
          if (v.location_id == province_id) {
            multiArray0Index = i;
          }
        })
        multiArray1.map(function(v, i) {
          //获取市所在列的位置
          if (v.location_id == city_id) {
            multiArray1Index = i;
          }
        })
        //市区对应的第一个区县id
        let select_id = dataArray[0].location_id
        //初始化
        that.setData({
          multiArray2: dataArray,
          multiArray: [multiArray0, multiArray1, multiArray2], //封装obj
          multiIndex: [multiArray0Index, multiArray1Index, 0],
          country_id: select_id
        })

        that.search()

      }
    })
  },
  search() {
    //根据条件查询 
  },

  //改变多列选择
  changePicker(obj) {

    let province_id = obj.province_id;
    let city_id = obj.city_id;
    let column = obj.column;
    let valueIndex = obj.valueIndex;

    let that = obj.that;
    let newArray1 = [],
      newArray2 = [];

    console.log('province_id:' + province_id);

    let province_index = 0;
    //遍历省
    multiArray0.map(function(value, index) {
      if (value.location_id == province_id) {
        province_index = index;

        //请求市信息
        wx.request({
          url: "http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp",
          method: "post",
          data: {
            type: 1,
            id: province_id,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            let dataArray = res.data.data
            newArray1 = dataArray;
            let city_index = 0;
            let country_id = newArray1[0].location_id;;
            newArray1.map(function(v2, i2) {
              if (v2.location_id == city_id) {
                city_index = i2;
                country_id = v2.location_id
              }
            })
            if (column == 2) {
              let select_id = multiArray2[valueIndex].location_id
              //不请求区县信息
              that.setData({
                multiIndex: [province_index, city_index, valueIndex],
                country_id: select_id
              })
              that.searchHospitalByTab()
            } else {
              //加载区县列表
              wx.request({
                url: "http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp",
                method: "post",
                data: {
                  type: 0,
                  id: country_id,
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function(res2) {
                  let dataArray2 = res2.data.data
                  newArray2 = dataArray2;

                  // 判断如果为空的情况下

                  if (newArray1.length == 0) {
                    newArray1.push({
                      location_id: '-1',
                      location_name: '-',
                    })
                  }
                  if (newArray2.length == 0) {
                    newArray2.push({
                      location_id: '-1',
                      location_name: '-',
                    })
                  }
                  let select_id = newArray2[0].location_id
                  multiArray1 = newArray1;
                  multiArray2 = newArray2;

                  that.setData({
                    multiArray: [multiArray0, multiArray1, multiArray2],
                    multiIndex: [province_index, city_index, 0],
                    city_id: country_id,
                    country_id: select_id
                  })

                  that.searchHospitalByTab()
                }
              })
            }

          }
        })
      }


    })

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