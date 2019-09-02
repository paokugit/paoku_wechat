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
    fileName:[],
    disabled: true,
    elements: [],
    textHeight: '',
    
    btnId:0,
    message:{},
    shopErr:1,
    hintT:'',

    mydata:'',
    issueShow:false,
    retain_po:'1'
  },

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;

    var m = this;
    m.retain();
    m.listBtn();
    m.shop();
  
    if (options.imgList != undefined) {
      m.setData({
        tempFilePaths: options.imgList.split(','),
        fileName: options.fileList.split(',')
      })
    }
  },

  // 是否有上次编辑内容
  retain:function(e){
    var m = this;
    a.get("drcircle.my.log",{
      openid: useropenid
    },function(e){
      if(e.error == 0){
        for (var i = 0; i < e.message.img.length; i++) {
          m.data.tempFilePaths.push(e.message.img[i].url);
          m.data.fileName.push(e.message.img[i].filename)
        }
        m.setData({
          releaseText: e.message.content,
          tempFilePaths: m.data.tempFilePaths,
          btnId: e.message.goods_id
        })
        m.listBtn();
      }
    })
  },

  // 商品推荐
  listBtn:function(e){
    var m = this;
    a.get("drcircle.my.good", {
      goods_id: m.data.btnId
    }, function (e) {
      m.setData({
        message: e.message,
        btnId: m.data.btnId
      })
    })
  },

  // 推荐跳转提示
  shop:function(){
    var m = this;
    a.get("drcircle.my.shop",{
      openid: useropenid
    },function(e){
      m.setData({
        shopErr:e.error,
        hintT:e.message
      })
    })
  },
  shopBtn:function(){
    wx.navigateTo({
      url: '/pages/expert/tuijian/recommend?btnId='+this.data.btnId,
    })
  },
  tiShiBtn:function(){
    this.setData({
      showTishi:true
    })
  },

  imgBall:function(e){
    this.setData({
      showBall: true
    })
  },
  showBall:function(e){
    this.setData({
      showBall: false,
      showTishi:false
    })
  },

  // 内容
  gaysText(e) {
    this.setData({
      releaseText: e.detail.value
    })
  },

  // 上传
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
          wx.uploadFile({
            url: 'https://paokucoin.com/app/ewei_shopv2_api.php?i=1&r=util.uploader.upload&file=file',
            filePath: res.tempFilePaths[i],
            name: "file",
            header: {'content-type': 'multipart/form-data'},
            success: function (n) {
              var o = JSON.parse(n.data);
              that.data.fileName.push(o.files[0].filename);
              tempFilePaths.push(o.files[0].url);
              that.setData({
                tempFilePaths: tempFilePaths,
                showBall: false
              });
            }
          });
        };  
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

  // 删除
  deletePic: function (e) {
    var images = this.data.tempFilePaths;
    var imgfile = this.data.fileName;

    var index = e.currentTarget.dataset.id;
    imgfile.splice(index,1);
    images.splice(index, 1);
    this.setData({
      tempFilePaths: images,
      fileName: imgfile
    })
  },

  // 预览
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

  // 长按
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

  // 触摸开始
  touchs: function (e) {
    this.setData({
      beginIndex: e.currentTarget.dataset.index
    })
  },

  // 触摸结束
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

  // 滑动
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

  // 发布
  submit:function(){
    var that = this;
    var text = that.data.releaseText;
    var pic = that.data.fileName;  
    a.get("drcircle.my.fabu",{
      openid: useropenid,
      content: text,
      img: pic,
      goods_id:that.data.btnId
    },function(e){
      if(e.error == 0){
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.setData({
          mydata: {
            pageB: 1
          }
        })
        wx.navigateBack({
          delta: 1,
        })

        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        
        that.data.retain_po = '2';
      }
    })
  },


  onShow: function () {
    var m = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    let json = currPage.data.mydata;
    m.data.btnId = json.b;
    m.listBtn();
  },

  onUnload:function(){
    var m = this;
    var text = m.data.releaseText;
    var pic = m.data.fileName;
    if (m.data.retain_po == 1){
      wx.showModal({
        title: '是否保留此次编辑',
        success: function (res) {
          if (res.cancel) {
            a.get("drcircle.my.del_log", {
              openid: useropenid,
            }, function (e) {
              console.log(e);
            });
          } else {
            a.get("drcircle.my.savelog",{
              openid: useropenid,
              content: text,
              img: pic,
              goods_id: m.data.btnId
            },function(e){
              console.log(e);
            });
          }
        },
      })
    }

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },

})