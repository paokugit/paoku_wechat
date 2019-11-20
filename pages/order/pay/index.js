var t = getApp(), e = t.requirejs("core"), o = t.requirejs("foxui");
var goodsid = '', sharemid = t.getCache("sharemid");
var errormessage=""
var orderId=""
Page({
    data: {
        globalimg: t.globalData.appimg,
        icons: t.requirejs("icons"),
        success: !1,
        successData: {},
        coupon: !1,
        operateDis:'block',
        popupDis:'none',
        jiankangDis:'none',
        xingxuanDis:'none',
      showIcon: true,
    },
    onLoad: function(e) {
        this.setData({
            options: e
        }), t.url(e);
        console.log("lalala")
        console.log(e)
        orderId = e.id
    //   e.success == 1 ? this.setData({
    //     success: !0
    //   }):''
    },
    backbtn: function () {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },

    onShow: function() {
        this.get_list();
    },
    get_list: function() {
        var t = this;
        e.get("order/pay", t.data.options, function(o) {
            50018 != o.error ? (!o.wechat.success && "0.00" != o.order.price && o.wechat.payinfo && e.alert(o.wechat.payinfo.message + "\n不能使用微信支付!"), 
            t.setData({
                list: o,
                show: !0
            })) : wx.navigateTo({
                url: "/pages/order/details/index?id=" + t.data.options.id
            });
        });
    },
    pay: function(t) {
        console.log(2)
        console.log(t)
        var o = e.pdata(t).type, a = this, i = this.data.list.wechat;
        "wechat" == o ? e.pay(i.payinfo, function(t) {
            "requestPayment:ok" == t.errMsg && a.complete(o);
        }) : "credit" == o ? e.confirm("确认要余额支付吗?", function() {
            a.complete(o);
          }, function () { }) : "RVC" == o ? e.confirm("确认要RVC支付吗?", function () {
            a.complete(o);
          }, function () { }) : "cash" == o ? e.confirm("确认要使用货到付款吗?", function() {
            a.complete(o);
        }, function() {}) : a.complete(o);
    },
    // pay:function(e){
    //   console.log(e.currentTarget.dataset.type);
    //   let type = e.currentTarget.dataset.type;
    //   if (type == 'wechat'){
    //     e.pay(i.payinfo, function (t) {
    //         "requestPayment:ok" == t.errMsg && a.complete(o);
    //     })
    //   } else if (type == 'credit'){
    //     e.confirm("确认要余额支付吗?", function () {
    //         a.complete(o);
    //     }, function () { })
    //   } else if (type == 'RVC'){
    //     e.confirm("确认要RVC支付吗?", function () {
    //       a.complete(o);
    //     }, function () { })
    //   }else{
    //     e.confirm("确认要使用货到付款吗?", function () {
    //         a.complete(o);
    //     }, function() {})
    //   }
    // },
    complete: function(t) {
        var a = this;
        e.post("order/pay/complete", {
            id: a.data.options.id,
            type: t,
            mid: sharemid,
        }, function(t) {
            console.log(t)
            if(t.error>0){
                errormessage=t.message
                wx.showModal({
                    title: '提示',
                    content: errormessage,
                })
            }
            goodsid=t.goods.goodsid
            console.log(goodsid)
            if(goodsid==7){
                a.setData({
                    operateDis: 'none',
                    popupDis: 'block'
                })
            }
            if (goodsid == 3) {
                a.setData({
                    operateDis: 'none',
                    jiankangDis: 'block'
                })
            }
            if (goodsid == 4) {
                a.setData({
                    operateDis: 'none',
                    xingxuanDis: 'block'
                })
            }
            if (0 != t.error) o.toast(a, t.message); else {
                wx.setNavigationBarTitle({
                    title: "支付成功"
                });
                var e = Array.isArray(t.ordervirtual);
                a.setData({
                    success: !0,
                    successData: t,
                    order: t.order,
                    ordervirtual: t.ordervirtual,
                    ordervirtualtype: e
                });
            }
        }, !0, !0);
    },
    vipBtn:function(){
        wx.navigateTo({
            url: '/packageA/pages/changce/merch/detail?id='+10,
        })
    },
    
    onUnload: function () {
        console.log('监听页面卸载111');
        wx.redirectTo({
            url: "/pages/order/detail/index?id=" + orderId
        })
        
    },
//    查看奖励
    rewardBtn: function() {
        wx.navigateTo({
          url: '/packageA/pages/discount/zkbaccount/zkbaccount' ,
        })
    },
    shop: function(t) {
        0 == e.pdata(t).id ? this.setData({
            shop: 1
        }) : this.setData({
            shop: 0
        });
    },
    phone: function(t) {
        e.phone(t);
    },
    closecoupon: function() {
        this.setData({
            coupon: !1
        });
    }
});