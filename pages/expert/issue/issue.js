var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = ""; 
Page({
  data: {
    globalimg: t.globalData.appimg,
    nvabarData: {
      showCapsule: 1,
      title: '发布',
      height: t.globalData.height * 2 + 20,
    },
    showBall: false,
    showTishi:false,
    arrayNull: true,
    releaseText: '',
    replayMore: false,
    hidden: true,
    flag: false,
    x: 0,
    y: 0,
    tempFilePaths: [],
    disabled: true,
    elements: [],
    textHeight: ''
    
  },

  onLoad: function (options) {
    var m = this;

    if (options.imgList != undefined) {
      m.setData({
        tempFilePaths: options.imgList.split(',')
      })
    }
  },

  imgBall:function(e){
    this.setData({
      showBall: true
    })
  },
  showBall:function(e){
    this.setData({
      showBall: false
    })
  },

  choose: function (options) {
    var select = options.currentTarget.dataset.select;
    var that = this,
    tempFilePaths = this.data.tempFilePaths;
    wx.chooseImage({
      count: 9 - tempFilePaths.length, 
      sizeType: ['original', 'compressed'], 
      sourceType: [select],
      success: function (res) {
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          tempFilePaths.push(res.tempFilePaths[i])
        };        
        that.setData({
          tempFilePaths: tempFilePaths,
          showBall: false
        });

        var query = wx.createSelectorQuery();
        var nodesRef = query.selectAll(".item");
        nodesRef.fields({
          dataset: true,
          rect: true
        }, (result) => {
          that.setData({
            elements: result
          })
        }).exec();
      }
    })
  },

  previewImage: function (event) {
    var src = event.currentTarget.dataset.src; 
    var imgList = event.currentTarget.dataset.list; 
    var imgArr = [];
    for (var i = 0; i < imgList.length; i++) {
      imgArr.push(imgList[i]);
    }
    wx.previewImage({
      current: src, 
      urls: imgArr 
    })
  },

  _longtap: function (e) {
    var maskImg = e.currentTarget.dataset.img
    this.setData({
      maskImg: maskImg, 
      hidden: false,
      flag: true,
      x: e.currentTarget.offsetLeft,
      y: e.currentTarget.offsetTop
    })
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('.release_text').boundingClientRect(function (rect) {
      that.setData({
        textHeight: rect.height
      })
    }).exec();
  },

  touchs: function (e) {
    this.setData({
      beginIndex: e.currentTarget.dataset.index
    })
  },

  touchend: function (e) {
    if (!this.data.flag) {
      return;
    }
    const x = e.changedTouches[0].pageX
    const y = e.changedTouches[0].pageY
    const list = this.data.elements;
    let data = this.data.tempFilePaths
    for (var j = 0; j < list.length; j++) {
      const item = list[j];
      if (x > item.left && x < item.right && y > item.top && y < item.bottom) {
        const endIndex = item.dataset.index;
        const beginIndex = this.data.beginIndex;

        if (beginIndex < endIndex) {
          let tem = data[beginIndex];
          for (let i = beginIndex; i < endIndex; i++) {
            data[i] = data[i + 1]
          }
          data[endIndex] = tem;
        }

        if (beginIndex > endIndex) {
          let tem = data[beginIndex];
          for (let i = beginIndex; i > endIndex; i--) {
            data[i] = data[i - 1]
          }
          data[endIndex] = tem;
        }

        this.setData({
          tempFilePaths: data
        })
      }
    }
    this.setData({
      hidden: true,
      flag: false
    })
  },

  touchm: function (e) {
    if (this.data.flag) {
      const x = e.touches[0].pageX
      const y = e.touches[0].pageY
      if (this.data.textHeight > 70) {
        this.setData({
          x: x - 75,
          y: y - this.data.textHeight * 2
        })
      } else {
        this.setData({
          x: x - 75,
          y: y - 140
        })
      }

    }
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

 

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})