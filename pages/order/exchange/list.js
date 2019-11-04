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
    carts: [], // 购物车列表

    hasList: false, // 列表是否有数据

    totalPrice: 0, // 总价，初始为0

    selectAllStatus: false // 全选状态，默认全选
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

      carts: [

        {
          id: 1,
          title: '新鲜芹菜 半斤',
          image: 'https://www.paokucoin.com/attachment/images/1/2019/09/jJLLGzjl3HG01GR0gzGLLznRB6H7hF.jpg',
          num: 1,
          price: 10,
          selected: false
        },

        {
          id: 2,
          title: '素米 500g',
          image: 'https://www.paokucoin.com/attachment/images/1/2019/09/E3X0rX7jXaXZ3aXKQmnaRlzzXAN0m3.jpg',
          num: 1,
          price: 20,
          selected: false
        }

      ]

    });

  },
  getTotalPrice() {

    let carts = this.data.carts; // 获取购物车列表

    let total = 0;

    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据

      if (carts[i].selected) { // 判断选中才会计算价格

        total += carts[i].num * carts[i].price; // 所有价格加起来

      }

    }

    this.setData({ // 最后赋值到data中渲染到页面

      carts: carts,

      totalPrice: total.toFixed(2)

    });

  },
  selectList(e) {

    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index

    let carts = this.data.carts; // 获取购物车列表

    const selected = carts[index].selected; // 获取当前商品的选中状态

    carts[index].selected = !selected; // 改变状态

    this.setData({

      carts: carts

    });

    this.getTotalPrice(); // 重新获取总价

  },
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus; // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice(); // 重新获取总价
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