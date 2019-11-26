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
    wx.request({
      url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp',
      data: {
        type: 0,
        id: 0
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res);
        var xiaoquList = res.data.data.province;
        console.log(xiaoquList)
        var xiaoquArr = xiaoquList.map(item => {　　　　 // 此方法将省名称区分到一个新数组中
          // console.log(item.name)
          return item.name;
        });
        console.log(xiaoquArr)
        that.setData({
          multiArray: [xiaoquArr, []],
          xiaoquList,
          xiaoquArr
        })
        var default_xiaoqu_id = xiaoquList[0]['id'];　　　　 //获取默认的省对应的id
        if (default_xiaoqu_id) {
          console.log(default_xiaoqu_id)
          that.searchClassInfo(default_xiaoqu_id)　　　　　　 // 如果存在调用获取对应的省级数据
        }
      }
    })
  },
  //市级
  searchClassInfo(xiaoqu_id) {
    var that = this;
    if (xiaoqu_id) {
      this.setData({
        pid: xiaoqu_id
      }, () => {
        wx.request({
          url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp',
          https: '',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          data: {
            type:1,
            id: that.data.pid
          },
          success: function(res) {
            console.log(res);
            var classList = res.data.data.province;
            var classArr = classList.map(item => {
              // console.log(item.name)
              return item.name;
            })
            var xiaoquArr = that.data.xiaoquArr;
            that.setData({
              multiArray: [xiaoquArr, classArr],
              classArr,
              classList
            })
            var default_xiaoqu_id = classList[0]['id'];　　　　 //获取默认的市对应的id
            if (default_xiaoqu_id) {
              console.log(default_xiaoqu_id)
              that.searchRegionInfo(default_xiaoqu_id)　　　　　　 // 如果存在调用获取对应的省级数据
            }
          }
        })
      })
    }
  },
  //区
  searchRegionInfo(xiaoqu_id) {
    var that = this;
    if (xiaoqu_id) {
      this.setData({
        pid: xiaoqu_id
      }, () => {
        wx.request({
          url: 'http://192.168.3.102/app/ewei_shopv2_api.php?i=1&r=app.superior.address&comefrom=wxapp',
          https: '',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          data: {
            type: 2,
            id: that.data.pid
          },
          success: function (res) {
            console.log(res);
            var regionList = res.data.data.province;
            var regionArr = regionList.map(item => {
              // console.log(item.name)
              return item.name;
            })
            var xiaoquArr = that.data.xiaoquArr;
            var classArr = that.data.classArr
            that.setData({
              multiArray: [xiaoquArr, classArr,regionArr],
              regionArr,
              regionList,
            })
          }
        })
      })
    }
  },
  bindMultiPickerColumnChange: function(e) {
    //e.detail.column 改变的数组下标列, e.detail.value 改变对应列的值
    console.log(e);
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    data.multiIndex[e.detail.column] = e.detail.value;
    var pid_session = this.data.pid;　　　　 // 保持之前的省id 与新选择的id 做对比，如果改变则重新请求数据
    switch (e.detail.column) {
      case 0:
        var xiaoquList = this.data.xiaoquList;
        var pid = xiaoquList[e.detail.value]['id'];
        if (pid_session != pid) {　　　　 // 与之前保持的省id做对比，如果不一致则重新请求并赋新值
          this.searchClassInfo(pid);
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var class_key = 0;
    var classList = this.data.classList;
    var select_key = e.detail.value[1];
    var real_key = select_key - 1;
    if (real_key < class_key) {
      this.setData({
        cid: 0
      })
    } else {
      this.setData({
        cid: classList[real_key]['cid']　　　　　　 // class_id 代表着选择的市级对应的 班级id
      })
    }
    this.setData({
      multiIndex: e.detail.value
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