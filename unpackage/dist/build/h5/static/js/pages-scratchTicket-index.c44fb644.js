(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-scratchTicket-index"],{"0877":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.box-ly-b-ay[data-v-2c1a9d57]{display:flex;flex-direction:row;justify-content:center;align-items:center;width:100%}.content[data-v-2c1a9d57]{position:relative}.content_image[data-v-2c1a9d57]{position:absolute}.content_canvasBox_canvas[data-v-2c1a9d57]{width:100%;height:100%}',""]),t.exports=e},"0d85":function(t,e,i){"use strict";i.r(e);var a=i("fb76"),n=i("5c995");for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("4b5a");var o=i("f0c5"),c=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"2c1a9d57",null,!1,a["a"],void 0);e["default"]=c.exports},"0f9b":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.blow[data-v-298b0dd8]{background-size:contain;margin:%?0?% auto;box-sizing:border-box;position:relative;overflow:hidden}.blow .box[data-v-298b0dd8]{width:100%;height:100%;border-radius:%?10?%;position:relative;overflow:hidden}.blow .box .result[data-v-298b0dd8]{height:100%;display:flex;justify-content:center;align-items:center}.box[data-v-298b0dd8]{display:flex;flex-direction:row;justify-content:center;align-items:center;width:100%}',""]),t.exports=e},"115d":function(t,e,i){t.exports=i.p+"static/img/gmt_01.3d9ae304.jpg"},"1b8f":function(t,e,i){"use strict";i.r(e);var a=i("80db"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},"277e":function(t,e,i){"use strict";i.r(e);var a=i("723b"),n=i("1b8f");for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("61fb");var o=i("f0c5"),c=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"298b0dd8",null,!1,a["a"],void 0);e["default"]=c.exports},4054:function(t,e,i){var a=i("0877");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("25f19171",a,!0,{sourceMap:!1,shadowMode:!1})},"4b5a":function(t,e,i){"use strict";var a=i("4054"),n=i.n(a);n.a},5630:function(t,e,i){var a=i("0f9b");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("09a5bdfc",a,!0,{sourceMap:!1,shadowMode:!1})},"5c995":function(t,e,i){"use strict";i.r(e);var a=i("983d"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},"61fb":function(t,e,i){"use strict";var a=i("5630"),n=i.n(a);n.a},"723b":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("scratchTicket",{staticStyle:{margin:"0rpx 32rpx 0rpx 32rpx"},attrs:{type:6,canvasId:"canvasId3",height:1200,width:600,refs:"card",percentage:13,disabled:!1,title:"刮自定义",watermark:"刮一刮",result_img:"https://s3.bmp.ovh/imgs/2023/07/19/544a382d2838fc7a.jpg",mask_img:"https://s3.bmp.ovh/imgs/2023/07/19/c47570e598164a39.jpg",is_show:t.is_show_blow},on:{complete:function(e){arguments[0]=e=t.$handleEvent(e),t.seatShow.apply(void 0,arguments)},init:function(e){arguments[0]=e=t.$handleEvent(e),t.init_blow.apply(void 0,arguments)}}})],1)},n=[]},"80db":function(t,e,i){"use strict";i("7a82");var a=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("0d85")),s={components:{scratchTicket:n.default},data:function(){return{is_show_blow:!1}},onload:function(){this.loadData()},onShow:function(){},onReady:function(){uni.showModal({title:"小游戏·彩票试刮",content:"此游戏仅为体验即开票规则，开奖结果仅供参考",showCancel:!1,confirmText:"我知道了",success:function(t){t.confirm&&console.log("用户点击确定")}}),setTimeout((function(){}),50)},methods:{init_blow:function(){this.is_show_blow=!0},seatShow:function(){}}};e.default=s},"983d":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("a9e3"),i("ac1f"),i("14d9");var a=null,n={props:{canvasId:{type:String,default:"blow"},result_img:{type:String,default:"https://s3.bmp.ovh/imgs/2023/07/19/544a382d2838fc7a.jpg"},mask_img:{type:String,default:"https://s3.bmp.ovh/imgs/2023/07/19/c47570e598164a39.jpg"},is_show:{type:Boolean,default:!1},height:{type:Number,default:200},width:{type:Number,default:300},percentage:{type:Number,default:45},touchSize:{type:Number,default:20},fillColor:{type:String,default:"#ddd"},watermark:{type:String,default:"刮一刮"},watermarkColor:{type:String,default:"#c5c5c5"},watermarkSize:{type:Number,default:14},title:{type:String,default:"刮一刮开奖"},titleColor:{type:String,default:"#888"},titleSize:{type:Number,default:24},disabled:{type:Boolean,default:!1},init_show:{type:Boolean,default:!1}},data:function(){return{startX:null,startY:null,computing:!1,complete:!1,reset:!1,ready:!1,storePoints:[]}},watch:{init_show:function(t){t&&this.initBlow()}},mounted:function(){a=uni.createCanvasContext(this.canvasId,this),this.initBlow()},methods:{initBlow:function(){var t=this;this.computing=!1,this.complete=!1,this.reset=!1,this.ready=!1,a.clearRect(0,0,this.width,this.height),a.setFillStyle(this.fillColor),a.fillRect(0,0,this.width,this.height),this.ready=!0,this.fillWatermark(),this.fillTitle(),uni.downloadFile({url:i("115d"),success:function(e){t.width,t.height;var i=uni.createSelectorQuery().in(t);i.select(".content_canvasBox_canvas").boundingClientRect((function(t){console.log("data",t),a.drawImage(e.tempFilePath,0,0,t.width,t.height),a.draw()})).exec()}}),a.draw(),setTimeout((function(e){t.$emit("init",{})}),50)},fillWatermark:function(t){if(this.watermark){var e=this.watermark.length*this.watermarkSize;a.save(),a.rotate(-10*Math.PI/180);var i=0,n=0,s=0;while((i<=5*this.width||n<=5*this.height)&&s<300)a.setFillStyle(this.watermarkColor),a.setFontSize(this.watermarkSize),a.fillText(this.watermark,i,n),i+=e+1.6*e,i>this.width&&n<=this.height&&(i=100*-Math.random(),n+=3*this.watermarkSize),s++;a.restore()}},fillTitle:function(t){this.title&&(a.setTextAlign("center"),a.setTextBaseline("middle"),a.setFillStyle(this.titleColor),a.setFontSize(this.titleSize),a.fillText(this.title,this.width/2/2,this.height/2/2))},touchstart:function(t){this.disabled||(this.startX=t.touches[0].x,this.startY=t.touches[0].y)},touchend:function(t){this.getFilledPercentage()},touchmove:function(t){this.complete||this.disabled||(a.moveTo(this.startX,this.startY),a.clearRect(this.startX,this.startY,this.touchSize,this.touchSize),a.draw(!0),this.startX=t.touches[0].x,this.startY=t.touches[0].y)},getFilledPercentage:function(t){var e=this;this.computing||(this.computing=!0,uni.canvasGetImageData({canvasId:this.canvasId,x:0,y:0,width:this.width,height:this.height,success:function(t){for(var i=t.data,a=[],n=0;n<i.length;n+=4)i[n+3]<128&&a.push(i[n+3]);var s=(a.length/(i.length/2)*100).toFixed(2);s>=e.percentage&&e.success(),e.computing=!1,console.log(s)},fail:function(t){console.log(t)}},this))},success:function(t){this.complete=!0,this.reset||(this.reset=!0,a.moveTo(0,0),a.clearRect(0,0,this.width,this.height),a.stroke(),a.draw(!0),this.$emit("complete",{}))}}};e.default=n},fb76:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"box-ly-b-ay",staticStyle:{position:"relative"},attrs:{id:t.canvasId}},[i("v-uni-view",{staticClass:"content",style:{width:t.width+"rpx",height:t.height+"rpx"}},[t.is_show?i("v-uni-image",{staticClass:"content_image",style:{width:t.width+"rpx",height:t.height+"rpx"},attrs:{src:t.result_img}}):t._e(),i("v-uni-view",{staticClass:"content_canvasBox",style:{width:t.width+"rpx",height:t.height+"rpx"}},[i("v-uni-canvas",{staticClass:"content_canvasBox_canvas",attrs:{"disable-scroll":!0,"canvas-id":t.canvasId},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.touchstart.apply(void 0,arguments)},touchend:function(e){arguments[0]=e=t.$handleEvent(e),t.touchend.apply(void 0,arguments)},touchmove:function(e){arguments[0]=e=t.$handleEvent(e),t.touchmove.apply(void 0,arguments)}}})],1)],1)],1)],1)},n=[]}}]);