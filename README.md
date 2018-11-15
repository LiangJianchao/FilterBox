# FilterBox
商品品类筛选

```
window.createFilterBox({
	selectItems: {key:value},//已经选择的类别名 {"品牌":"品牌一","尺寸":"尺寸1"} key 类别名，value 类别
	options: options,//所有类别和类别对应的类别名{key:["item","item"]}
	$content: $(".content"),
	callBack: function () {
		//todo get options
		//this.selectItems,this.options
		console.log("selectItems=", this.selectItems);
		console.log("options=", this.options)
		this.init();
	}
});
```
