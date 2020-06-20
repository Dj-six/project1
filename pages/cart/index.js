
import {getSetting,chooseAddress,openSetting,showModal,showToast} from '../../utils/asyncWx'
import regeneratorRuntime from '../../lib/runtime/runtime';


Page({
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow() {
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    
    this.setData({address});
    this.setCart(cart);
  },

  // 点击收货地址
  async handleChooseAddress() {
    try {
      // 获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"]
      // 判断权限状态
      if(scopeAddress === false) {
        // 调用获取收货地址
        await openSetting();
      }
      // 调用收货地址
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
      // 存入缓存中
      wx.setStorageSync("address", address);
    }catch (error) {
      console.log(error);
    }
  },
  

  // 商品的选中
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },


  setCart(cart) {
    let allChecked = true;
    // 总价格
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }else {
        allChecked = false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length !=0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart);
  },

  // 全选按钮的点击
  handleAllItem() {
    let {cart,allChecked} =this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  // 商品数量的编辑
  async numEdit(e) {
    const {operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    if(cart[index].num ===1 && operation === -1) {
      const res = await showModal({content:"您是否要删除？"});
      if(res.confirm) {
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },

  async handlePay() {
    const {address,totalNum} = this.data;
    if (!address.userName) {
      await showToast({title:"您还没有选择收货地址"});
      return;
    }
    if(totalNum === 0) {
      await showToast({title:"您还没有选购商品"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})