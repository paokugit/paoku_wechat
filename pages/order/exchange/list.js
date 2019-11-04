var o = getApp(),
  e = o.requirejs("core"),
  c = o.requirejs("biz/goodspicker"),
  a = o.requirejs("biz/order");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    gloheight: o.globalData.gloheight,
    globalimg: o.globalData.appimg,
    batchIds: '', //选中的ids

    carts: [

      {
        id: "1",
        title: '新鲜芹菜 半斤',
        image: 'https://www.paokucoin.com/attachment/images/1/2019/09/jJLLGzjl3HG01GR0gzGLLznRB6H7hF.jpg',
        num: 1,
        price: 10,
        selected: false
      },

      {
        id: "2",
        title: '素米 500g',
        image: 'https://www.paokucoin.com/attachment/images/1/2019/09/E3X0rX7jXaXZ3aXKQmnaRlzzXAN0m3.jpg',
        num: 1,
        price: 20,
        selected: false
      }
    ],
    select_all: false,
    listData: [{
        code: "1",
        text: "测试1"
      },
      {
        code: "2",
        text: "测试2"
      },
      {
        code: "3",
        text: "测试3"
      }
    ],
    hasList: false, // 列表是否有数据

    totalPrice: 0, // 总价，初始为0

    selectAllStatus: false // 全选状态，默认非全选
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      show: !0,
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
  onShow() {
    this.setData({
      hasList: true, // 既然有数据了，那设为true吧
    });
  },
  //全选与反全选
  selectAll: function(e) {
    console.log(e)
    var that = this;
    let selectAllStatus = that.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    var arr = []; //存放选中id的数组
    console.log(selectAllStatus)
    for (let i = 0; i < that.data.carts.length; i++) {
      that.data.carts[i].selected = selectAllStatus; 
      if (selectAllStatus == true) {
        // 全选获取选中的值
        arr = arr.concat(that.data.carts[i].id.split(','));
      }
    }
    console.log(arr)
    that.setData({
      carts: that.data.carts,
      batchIds: arr,
      selectAllStatus: selectAllStatus
    })
  },
  selectList(e) {
    console.log(e)
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let carts = this.data.carts; // 获取购物车列表
    const selected = carts[index].selected; // 获取当前商品的选中状态
    carts[index].selected = !selected; // 改变状态
    this.setData({
      carts: carts
    });

  },

  confirmbtn: function() {
    console.log(this.data.batchIds)
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