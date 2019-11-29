var t = getApp(),
  a = t.requirejs("core");
var f = getApp();

var useropenid = ""; 
Page({ 
  data: {
    globalimg: t.globalData.appimg,
    showIcon: true,
    gloheight: t.globalData.gloheight,
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
    mydata:'',
    issueShow:false,
    retain_po:'1',
    btnCss:'background: #01d7a1',

    txtShow:true,
    vieShow:false,
    focus:false
  },

  onLoad: function (options) {
    var userinfo = f.getCache('userinfo');
    useropenid = userinfo.openid;
    var m = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    m.retain();
    m.listBtn();
    
    if (options.imgList != undefined) {
      m.setData({
        tempFilePaths: options.imgList.split(','),
        fileName: options.fileList.split(',')
      })

      var query = wx.createSelectorQuery();
      var nodesRef = query.selectAll(".item");
      nodesRef.fields({
        dataset: true,
        rect: true
      }, (result) => {
        m.setData({
          elements: result
        })
      }).exec();
    }
  },

  // 是否有上次编辑内容
  retain:function(e){
    var m = this;
    a.get("drcircle.my.log",{
      openid: useropenid
    },function(e){
      console.log(e);
      if(e.error == 0){
        for (var i = 0; i < e.message.img.length; i++) {
          m.data.tempFilePaths.push(e.message.img[i].url);
          m.data.fileName.push(e.message.img[i].filename)
        }
      
        m.setData({
          releaseText: e.message.content,
          tempFilePaths: m.data.tempFilePaths,
          fileName:m.data.fileName,
          btnId: e.message.goods_id
        })
        m.listBtn();
        var query = wx.createSelectorQuery();
        var nodesRef = query.selectAll(".item");
        nodesRef.fields({
          dataset: true,
          rect: true
        }, (result) => {
          m.setData({
            elements: result
          })
        }).exec();
      }
    })
  },

  // 商品推荐
  listBtn:function(e){
    var m = this;
    a.get("drcircle.my.good", {
      goods_id: m.data.btnId
    }, function (e) {
      console.log(e);
      if(e.error == 0){
        m.setData({
          message: e.message,
          btnId: m.data.btnId
        })
      }
    })
  },

  // 推荐跳转提示
  shopErr:function(){
    var m = this;
    a.get("drcircle.my.shop",{
      openid: useropenid
    },function(e){
      console.log(e);
      if(e.error == 0){
        wx.navigateTo({
          url: '/pages/expert/tuijian/recommend?btnId=' + m.data.btnId,
        })
      }else{
        wx.showModal({
          title: '提示',
          content: e.message,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else {
              console.log('用户点击取消')
            }
          }
        })
      }
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
    var that = this;
    that.setData({
      releaseText: e.detail.value
    })
    var query = wx.createSelectorQuery();
    query.select('.release_text').boundingClientRect(function (rect) {
      that.setData({
        textHeight: rect.height
      })
    }).exec();
  },

  // 上传
  choose: function (options) {
    var select = options.currentTarget.dataset.select;
    var that = this,
    tempFilePaths = this.data.tempFilePaths;
    wx.chooseImage({
      count: 9 - tempFilePaths.length, 
      sizeType: ['compressed'], 
      sourceType: [select],
      success: function (res) {
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          wx.showLoading({
            title: '上传中...',
            mask: true
          })
          wx.uploadFile({
            url: 'https://www.paokucoin.com/app/ewei_shopv2_api.php?i=1&r=util.uploader.upload&file=file',
            filePath: res.tempFilePaths[i],
            name: "file",
            header: {'content-type': 'multipart/form-data'},
            success: function (n) {
              wx.hideLoading();
              var o = JSON.parse(n.data);
              if(o.error == 0){
                that.data.fileName.push(o.files[0].filename);
                tempFilePaths.push(o.files[0].url);
                that.setData({
                  tempFilePaths: tempFilePaths,
                  showBall: false,
                  btnCss: 'background: #01d7a1;'
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
              }else{
                wx.showToast({
                  title: o.message,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
              
          });
        };  
      }
    })
  },

  // 删除
  deletePic: function (e) {
    var m = this;
    var images = m.data.tempFilePaths;
    var imgfile = m.data.fileName;
    var index = e.currentTarget.dataset.id;


    imgfile.splice(index,1);
    images.splice(index, 1);

    if (imgfile.length == 0) {
      m.setData({
        btnCss: 'background: #e5e5e5;'
      })
    }
    m.setData({
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
    var maskImg = e.currentTarget.dataset.img;
    this.setData({
      maskImg: maskImg, 
      hidden: false,
      flag: true,
      x: e.currentTarget.offsetLeft,
      y: e.currentTarget.offsetTop
    })
    
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
    let data = this.data.tempFilePaths;
    let fileImg = this.data.fileName;

    for (var j = 0; j < list.length; j++) {
      const item = list[j];
      if (x > item.left && x < item.right && y > item.top && y < item.bottom) {
        const endIndex = item.dataset.index;
        const beginIndex = this.data.beginIndex;

        if (beginIndex < endIndex) {
          let tem = data[beginIndex];
          let fel = fileImg[beginIndex]
          for (let i = beginIndex; i < endIndex; i++) {
            data[i] = data[i + 1]
            fileImg[i] = fileImg[i + 1]
          }
          data[endIndex] = tem;
          fileImg[endIndex] = fel;
        }

        if (beginIndex > endIndex) {
          let tem = data[beginIndex];
          let fel = fileImg[beginIndex]

          for (let i = beginIndex; i > endIndex; i--) {
            data[i] = data[i - 1]
            fileImg[i] = fileImg[i - 1]
          }
          data[endIndex] = tem;
          fileImg[endIndex] = fel;
        }
        this.setData({
          tempFilePaths: data,
          fileName: fileImg
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
      const x = e.touches[0].pageX;
      const y = e.touches[0].pageY;
      if (this.data.textHeight > 70) {
        this.setData({
          x: x - 75, 
          y: y - this.data.textHeight*2
        })
      } else {
        this.setData({
          x: x - 75,
          y: y - 310
        })
      }
    }
  },

  // 发布
  submit:function(){
    var that = this;
    var text = that.data.releaseText;
    var pic = that.data.fileName; 
    wx.showToast({
      title: '发布中',
      icon: 'loading',
      duration: 1000,
      mask: true
    });
    if (pic != 0){
      a.get("drcircle.my.fabu",{
        openid: useropenid,
        content: text,
        img: pic,
        goods_id:that.data.btnId
      },function(e){
        wx.hideLoading();
        if(e.error == 0){
          that.setData({
            tempFilePaths:[],
            fileName:[]
          })
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          
          wx.setStorageSync('pageA', 1);
          wx.navigateBack({
            delta: 1,
          })

          that.data.retain_po = '2';
        } else if (e.error == 1){
          wx.showToast({
            title: e.message,
            icon: 'none',
            duration: 2000
          })
        }

      })
    }
  },

  // 文本框聚焦
  replyBtn: function (e) {
    var m = this;
    wx.pageScrollTo({
      scrollTop: 0,
    });
    m.setData({
      focus: true,
      vieShow:false,
      txtShow:true,
      
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
    if (text.length == 0 && pic == 0) {
      m.del_log();
    }else{
      if (m.data.retain_po == 1){
        wx.showModal({
          title: '是否保留此次编辑',
          cancelText: '不保留',
          confirmText: '保留',
          success: function (res) {
            if (res.cancel) {
              m.del_log();
            } else {
              m.savilog();
            }
          },
        })
      }
    }
  },
  // 不保留
  del_log:function(){
    a.get("drcircle.my.del_log", {
      openid: useropenid,
    }, function (e) {
      console.log(e);
      if(e.error == 1){
        wx.showToast({
          title: e.message,
          duration: 2000
        })
      }
    });
  },
  // 保留
  savilog:function(){
    var m = this;
    var text = m.data.releaseText;
    var pic = m.data.fileName;
    a.get("drcircle.my.savelog", {
      openid: useropenid,
      content: text,
      img: pic,
      goods_id: m.data.btnId
    }, function (e) {
      console.log(e);
      if(e.error == 1){
        wx.showToast({
          title: e.message,
          duration: 2000
        })
      }
    });
  },

  onPageScroll: function (e) {
    var m = this;
    if(e.scrollTop >0){
      m.setData({
        txtShow: false,
        vieShow:true,
        focus:false
      })
    }else{
      m.setData({
        txtShow: true,
        vieShow:false
      })
    }
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },

})