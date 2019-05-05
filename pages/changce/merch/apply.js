// pages/changce/merch/apply.js
var a = getApp(),
  t = a.requirejs("core"),
  e = a.requirejs("jquery"),
  n = a.requirejs("foxui");
Page({
  data: {},
  onShow: function () {
    this.getData()
  },
  getData: function () {
    var a = this;
    t.get("changce/merch/apply", {}, function (z) {
      if (z.canapply==1){
        z.show = true;
        a.setData(z);
      }else{
        t.alert(z.message);
        //wx.navigateBack();
      }
    }, false, true)
  },
  typeChange: function (a) {
    var t = a.detail.value,
      e = this.data.type_array[t].type;
    this.setData({
      applytype: e,
      applyIndex: t
    })
  },
  bankChange: function (a) {
    var t = a.detail.value;
    this.setData({
      bankIndex: t
    })
  },
  inputChange: function (a) {
    var t = this.data.reg,
      n = a.currentTarget.dataset.type,
      i = e.trim(a.detail.value);
      t[n] = i;
      this.setData({
        reg: t
      });
      //console.log(this.data.reg);
  },
  submit: function (a) {
    var e,
      i = this,
      s = this.data;
    if (s.canapply && !s.isSubmit) {
      if (!s.reg.merchname)
        return void n.toast(i, "请填写商户名称");
      if (!s.reg.salecate)
        return void n.toast(i, "请填写主营项目");
      if (!s.reg.realname)
        return void n.toast(i, "请填写联系人");
      if (!s.reg.mobile) return void n.toast(i, "请填写手机号");
      if (!s.reg.uname) return void n.toast(i, "请填写账号");
      if (!s.reg.upass) return void n.toast(i, "请填写密码");
        t.confirm('确认要提交申请吗？', function () {
          i.setData({
            isSubmit: true
          }),
            t.post("changce/merch/apply", s.reg, function (a) {
              if (a.status!=1)
                return n.toast(i, a.result.message), void i.setData({
                  isSubmit: false
                });
              n.toast(i, "申请成功，请等待审核！"),
                setTimeout(function () {
                  wx.navigateBack()
                }, 2000)
            }, true, true)
        })
    }
  },
  confirmjoin: function (a) {
    var e,
      i = this,
      s = this.data;
    if (!s.isSubmit) {
      i.setData({
        isSubmit: true
      });
        t.post("changce/merch/confirmjoin", s.reg, function (a) {
          if (a.status != 1)
            return n.toast(i, a.result.message), void i.setData({
              isSubmit: false
            });
          n.toast(i, "入驻成功！"),
            setTimeout(function () {
              wx.navigateBack()
            }, 2000)
        }, true, true);
    }
  }
})