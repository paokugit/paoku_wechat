var t = getApp().requirejs("core");
var ii = getApp();

var useropenid = "";

var goodname = '';
Page({

    data: {
        globalimg: ii.globalData.appimg,
      showIcon: true,
        list_friend: [],
        total: 'abc',
        page: 1,
        totalPage: ''
    },

    onLoad: function(options) {
        var userinfo = ii.getCache('userinfo');
        useropenid = userinfo.openid;
    },

    bindInput: function(t) {
        goodname = t.detail.value;

        this.setData({
            list_friend: [],
            total: 'abc',
            page: 1
        })

    },

    seekBtn: function(e) {
        var m = this;
        if (goodname == '') {
            wx.showToast({
                title: '请输入微信昵称、姓名、手机号',
                icon: 'none',
                duration: 2000,
            })
        } else {
            wx.showLoading({
              title: '加载中...',
              mask: true
            })
            t.get("commission.down.search", {
                openid: useropenid,
                keywords: goodname,
                page: m.data.page
            }, function(e) {
                console.log(e);
                wx.hideLoading();
                if (e.status == 1){

                  let totalPage = Math.ceil(e.result.total / e.result.pageSize);
                  let totalList = e.result.list;
                  m.setData({
                    list_friend: m.data.list_friend.concat(totalList),
                    total: e.result.total,
                    totalPage: totalPage
                  })
                } else if (e.status == 0){
                  wx.showToast({
                    title: e.result.message,
                    icon: 'none',
                    duration: 2000
                  })
                }
            })
        }
    },

    hint: function() {
        wx.showToast({
            title: '不是您的好友',
            icon: 'none',
            duration: 1000,
        })
    },

    onReachBottom: function() {
        var m = this;
        let page = m.data.page;
        let totalPage = m.data.totalPage;
        if (page < totalPage) {
            m.setData({
                page: page + 1
            });

            wx.showToast({
                title: '加载中...',
                icon: 'none',
                duration: 1000,
            });
            setTimeout(function() {
                m.seekBtn();
            }, 1000)
        } else {
            wx.showToast({
                title: '查询完了哦...',
                icon: 'none',
                duration: 2000
            })
        }

    }
})