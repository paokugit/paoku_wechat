var e = getApp(), t = e.requirejs("core"), i = e.requirejs("biz/diyform");

Page({
    data: {
        areas: [],
        // 组件所需的参数
        nvabarData: {
            showCapsule: 1, 
            title: '', 
            height: e.globalData.height * 2 + 20,
        },
    },
    onLoad: function(t) {
        var i = this;
        setTimeout(function() {
            i.setData({
                areas: e.getCache("cacheset").areas
            });
        }, 300);
    },
    onShow: function() {
        this.getData();
    },
    getData: function() {
        var e = this;
        t.get("commission/register", {}, function(t) {
            70003 != t.error ? (t.show = !0, wx.setNavigationBarTitle({
                title: "申请成为" + t.set.texts.agent || "申请"
            }), e.setData(t), e.setData({
                diyform: {
                    f_data: t.f_data,
                    fields: t.fields
                }
            })) : wx.redirectTo({
                url: "/pages/commission/index"
            });
        });
    },
    inputChange: function(e) {
        "realname" == e.target.id ? this.setData({
            "member.realname": e.detail.value
        }) : "mobile" == e.target.id ? this.setData({
            "member.mobile": e.detail.value
        }) : "weixin" == e.target.id ? this.setData({
            "member.weixin": e.detail.value
        }) : "icode" == e.target.id && this.setData({
            "member.icode": e.detail.value
        });
    },
    submit: function(e) {
        if (0 == this.data.template_flag) {
            if (!this.data.member.realname) return void t.alert("请填写,真实姓名!");
            if (!this.data.member.mobile) return void t.alert("请填写,手机号!");
            r = {
                realname: this.data.member.realname,
                mobile: this.data.member.mobile
            };
        } else {
            var a = this.data.diyform;
            if (!i.verify(this, a)) return void t.alert("请检查必填项是否填写");
            var r = {
                memberdata: this.data.diyform.f_data,
                agentid: this.data.mid,
                icode: this.data.member.icode,
                weixin: this.data.member.weixin
            };
        }
        t.post("commission/register", r, function(e) {
            0 != e.error ? t.alert(e.message) : wx.redirectTo({
                url: 1 == e.check ? "/pages/commission/index" : "/pages/commission/register/index"
            });
        });
    },
    DiyFormHandler: function(e) {
        return i.DiyFormHandler(this, e);
    },
    selectArea: function(e) {
        return i.selectArea(this, e);
    },
    bindChange: function(e) {
        return i.bindChange(this, e);
    },
    onCancel: function(e) {
        return i.onCancel(this, e);
    },
    onConfirm: function(e) {
        return i.onConfirm(this, e);
    },
    getIndex: function(e, t) {
        return i.getIndex(e, t);
    }
});