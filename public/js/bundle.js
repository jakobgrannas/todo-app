webpackJsonp([0],{0:function(e,exports,t){var n=t(1),r=t(157),o=t(158),i=t(165);r.init(),o.getProductData(),n.render(n.createElement(i,null),document.getElementById("todo-app"))},157:function(e,exports){e.exports={init:function(){localStorage.clear(),localStorage.setItem("product",JSON.stringify([{id:1,type:"pants",sku:"pants1",name:"Great pair o' pants",price:2500,imageUrl:"http://bjornborg.scene7.com/is/image/bjornborg/992703_902_1?$BB700$&fmt=jpeg"},{id:2,type:"underwear",sku:"briefs1",name:"Underwear",price:500,imageUrl:"http://bjornborg.scene7.com/is/image/bjornborg/151215-109031_90011_1?$BB700$&fmt=jpeg"},{id:3,type:"shirt",sku:"shirt1",name:"Not just any shirt",price:200,imageUrl:"http://bjornborg.scene7.com/is/image/bjornborg/146167-206001_70701_1?$BB700$&fmt=jpeg"}]))}}},158:function(e,exports,t){var n=t(159);e.exports={getProductData:function(){var e=JSON.parse(localStorage.getItem("product"));n.receiveProduct(e)}}},159:function(e,exports,t){var n=t(160),r=t(164),o={receiveProduct:function(e){n.handleAction({actionType:r.RECEIVE_DATA,data:e})},filterSelected:function(e){n.handleAction({actionType:r.FILTER_SELECTED,type:e.type,isActive:e.isActive})}};e.exports=o},160:function(e,exports,t){var n=t(161).Dispatcher,r=new n;r.handleAction=function(e){this.dispatch({source:"VIEW_ACTION",action:e})},e.exports=r},164:function(e,exports,t){var n=t(6);e.exports=n({FILTER_SELECTED:null,RECEIVE_DATA:null})},165:function(e,exports,t){var n=t(1),r=n.createClass({displayName:"TodoApp",render:function(){return n.createElement("p",null,"Hej!")}});e.exports=r}});