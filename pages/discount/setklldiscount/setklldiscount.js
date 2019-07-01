// pages/discount/setklldiscount/setklldiscount.js
var moneynum = ""
var calorienum = ""
var itemid = ''
var message = ''
var remoneynum=''
var recalorienum=''
var a, e, i = getApp(),
  s = i.requirejs("core");
var f = getApp();
var merchid=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        moneytext:'',
        calorietext:'',
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: '卡路里折扣', //导航栏 中间的标题
            // 此页面 页面内容距最顶部的距离
            height: f.globalData.height * 2 + 20,
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(t) {
      console.log(t)
        var userinfo = f.getCache('userinfo');
        merchid=userinfo.merchInfo.id
        var a=this
        if (t.itemid == '' || t.itemid == undefined) {

        } else {
            itemid = t.itemid
            s.get("payment/index/edit", {
              id: itemid
            }, function (e) {
              console.log(e)
              calorienum = e.result.data.deduct;
              moneynum = e.result.data.money;
              console.log(calorienum)
              console.log(moneynum)
              a.setData({
                moneytext: e.result.data.money,
                calorietext: e.result.data.deduct
              })
            })

        }
    },

    setmoney: function(e) {
      const that = this;
      that.setData({
        moneynum: e.detail.value
      })
    },
    setcalorie: function(e) {
      const that = this;
      that.setData({
        calorienum: e.detail.value
      })
    },
    // 确认
    confirm: function(a) {
      console.log(a)
        if (itemid == '' || itemid == undefined) {
            console.log('没有itemid')
          s.post("payment/index/set", {
              money: this.data.moneynum,
              deduct: this.data.calorienum,
            cate: 1,
            merchid:merchid
          }, function (e) {
            console.log(e)
            if (e.status == 0) {
              message = e.result.message
              wx.showModal({
                title: '提示',
                content: message,
                success: function (res) {
                  if (res.confirm) { //这里是点击了确定以后
                    console.log('用户点击确定')
                  } else { //这里是点击了取消以后
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              message = e.result.message
              wx.showModal({
                title: '提示',
                content: message,
                success: function (res) {
                  if (res.confirm) { //这里是点击了确定以后
                    console.log('用户点击确定')
                    wx.navigateTo({
                      url: '/pages/discount/klldiscount/klldiscount',
                    })
                  } else { //这里是点击了取消以后
                    console.log('用户点击取消')
                  }
                }
              })
              // wx.navigateTo({
              //     url: '/pages/discount/klldiscount/klldiscount',
              // })
            }
          })

        } else {
          // var r = this, a = r.data;
          if (moneynum != this.data.moneynum && this.data.moneynum!=undefined){
                console.log('输入框有变化')
                remoneynum = this.data.moneynum
            }else{
                remoneynum = moneynum
            }
         
          if (calorienum != this.data.calorienum && this.data.calorienum != undefined) {
                console.log('输入框没有变化')
            recalorienum = this.data.calorienum
            } else {
                recalorienum = calorienum
            }
          console.log(recalorienum)
          console.log(remoneynum)
          console.log(this.data.calorienum);
          console.log(this.data.moneynum);

          s.post("payment/index/set", {
            money: remoneynum,
            deduct: recalorienum,
            cate: 1,
            id: itemid,
            merchid:merchid
          }, function (e) {
            console.log(e)
            if (e.status == 0) {
              message = e.result.message
              console.log(message)
              wx.showModal({
                title: '提示',
                content: message,
                success: function (res) {
                  if (res.confirm) { //这里是点击了确定以后
                    console.log('用户点击确定')
                  } else { //这里是点击了取消以后
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              message = e.result.message
              console.log(message)
              wx.showModal({
                title: '提示',
                content: message,
                success: function (res) {
                  if (res.confirm) { //这里是点击了确定以后
                    console.log('用户点击确定')
                    wx.navigateTo({
                        url: '/pages/discount/klldiscount/klldiscount',
                    })
                  } else { //这里是点击了取消以后
                    console.log('用户点击取消')
                  }
                }
              })
            }
          })
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