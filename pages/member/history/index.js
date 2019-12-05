var t = getApp(), a = t.requirejs("core");

t.requirejs("foxui");
var useropenid = "";
Page({
    data: {
        icons: t.requirejs("icons"),
        page: 1,
        loading: !1,
        loaded: !1,
        isedit: !1,
        isCheckAll: !1,
        checkObj: {},
        checkNum: 0,
        list: [],
      showIcon: true,
      globalimg: t.globalData.appimg,
    },
    onLoad: function(a) {
        var userinfo = t.getCache('userinfo');
        useropenid = userinfo.openid;
      console.log(useropenid);

        t.url(a), this.getList();
    },
    onShow: function() {
        var a = t.getCache("isIpx"), e = this;
        console.error(a), a ? e.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar",
            paddingb: "padding-b"
        }) : e.setData({
            isIpx: !1,
            iphonexnavbar: "",
            paddingb: ""
        });
    },
    onReachBottom: function() {
      this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var t = this;
        t.setData({
            loading: !0
        });
        wx.request({
          url: 'http://192.168.3.104:8081/app/ewei_shopv2_api.php?i=1&r=app.personcenter.footprint&comefrom=wxapp', 
          data: {
            openid: useropenid,
            page: t.data.page
          },
          success(res) {
            console.log(res);

            if(res.data.error == 0){

              let totalList = res.data.data.list;
              var arr = t.data.list.concat(totalList);
              if (t.data.list.length != 0) {
                var rea = [];
                var narr = [];
                for (var i = 0; i < arr.length; i++) {
                  var n = rea.indexOf(arr[0].type);
                  if (n == -1) {
                    rea.push(arr[i].type);
                    console.log(rea);
                    
                    narr.push({ type: arr[i].type, time: arr[i].time, dt: arr[i].dt })
                  } else {
                    for (var j = 0; j < arr[i].dt.length; j++) {
                      narr[n].dt.push(arr[i].dt[j])
                    }
                  }
                }
                arr = narr;
              }
              
              console.log(arr);
              var e = {
                loading: !1,
                loaded: !0,
                total: res.data.data.total,
                pagesize: res.data.data.pagesize,
                show: !0
              };
              res.data.data.list.length > 0 && (e.page = t.data.page + 1, e.list = arr,
              res.data.data.list.length < res.data.data.pagesize && (e.loaded = !0)), t.setData(e);
            }else if(res.data.error == 1){
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          }
        }) 
    },
    itemClick: function(t) {
        var e = this, i = a.pdata(t).id, s = a.pdata(t).goodsid;
        if (e.data.isedit) {
            var c = e.data.checkObj, n = e.data.checkNum;
            c[i] ? (c[i] = !1, n--) : (c[i] = !0, n++);
            var o = !0;
            for (var l in c) if (!c[l]) {
                o = !1;
                break;
            }
            e.setData({
                checkObj: c,
                isCheckAll: o,
                checkNum: n
            });
        } else wx.navigateTo({
            url: "/pages/goods/detail/index?id=" + s
        });
    },
    btnClick: function(t) {
        var e = this, i = t.currentTarget.dataset.action;
      
        if ("edit" == i) {
            c = {};
            for (var s in this.data.list) 
              for(var i in this.data.list[s].dt) c[this.data.list[s].dt[i].id] = !1;
            e.setData({
                isedit: !0,
                checkObj: c,
                isCheckAll: !1
            });
        } else if ("delete" == i) {
            var c = e.data.checkObj, n = [];

            

            for (var s in c) c[s] && n.push(s);
            if (n.length < 1) return;
          console.log(n);
            a.confirm("删除后不可恢复，确定要删除吗？", function() {
                a.post("member/history/remove", {
                    ids: n
                }, function(t) {
                    e.setData({
                        isedit: !1,
                        checkNum: 0,
                        page: 0,
                        list: []
                    }), e.getList();
                });
            });
        } else "finish" == i && e.setData({
            isedit: !1,
            checkNum: 0
        });
    },
    checkAllClick: function() {
      console.log(!this.data.isCheckAll);
      console.log(this.data.checkObj);
        var t = !this.data.isCheckAll, a = this.data.checkObj, e = {
            isCheckAll: t,
            checkObj: a
        };
        for (var i in a) e.checkObj[i] = !!t;
        e.checkNum = t ? this.data.list.length : 0, this.setData(e);
    }
});