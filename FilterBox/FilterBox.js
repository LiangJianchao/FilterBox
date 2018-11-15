(function ($, window) {
    function FilterBox(params) {
        /* 
        new FilterBox({
          selectItems: {key:value},//已经选择的类别名 key 类别名，value 类别
          options: options,//所有类别和类别对应的类别名{key:["item","item"]}
          $content: $(".content"),
          callBack: function () {
            //todo get options
            //this.selectItems,this.options
            console.log("selectItems=", this.selectItems);
            console.log("options=", this.options)
            this.init();
          }
        }); */
        this.options = params.options || [];
        this.$content = params.$content || null;
        this.selectItems = params.selectItems || [];
        this.$fbox;
        this.callBack = params.callBack;
        this.init();
    }
    FilterBox.prototype.init = function () {
        this.$content.empty();
        this.$fbox = $(`<div class="fbox"></div>`);
        this.renderNavbar();
        this.renderOptions();
        this.$content.append(this.$fbox);
        this.addEvent();
    };
    FilterBox.prototype.renderNavbar = function () {
        let $fnavbar = $(`<ul class="fnavbar"></ul>`);
        $.each(this.selectItems, (key, value) => {
            if (value != "") {
                let $li = $(`<li>${value}</li>`);
                $li.data("name", key);
                $li.data("value", value);
                $fnavbar.append($li);
            }
        });
        this.$fbox.append($fnavbar);
    };
    FilterBox.prototype.renderOptions = function () {
        let $fcon = $(`<div class="fcon"></div>`);
        $.each(this.options, (key, option) => {
            let $fitem = $(`<div class="fitem"></div>`);
            $fitem.append(`<h3 class="fname">${key}:</h3>`);
            let $foption = $(`<ul class="foption"></ul>`);
            $.each(option, function (index2, item) {
                $foption.append(
                    `<li data-name="${key}" data-value="${item}">${item}</li>`
                );
            });
            $fitem.append($foption);
            //console.log(this);
            $fitem.append(`<div class="more">展开</div>`);
            $fcon.append($fitem);
        });
        this.$fbox.append($fcon);
    };
    FilterBox.prototype.addEvent = function () {
        let _this = this;
        _this.$content.find(".more").off("click").on("click", function (e) {
            $(this)
                .parent().find(".foption").toggleClass("heightAuto");
            if (
                $(this).parent().find(".foption").hasClass("heightAuto")
            ) {
                $(this).text("收起");
            } else {
                $(this).text("展开");
            }
        });
        _this.$content.find(".fnavbar li").off("click").on("click", function () {
            let name = $(this).data("name");
            _this.selectItems[name] = "";
            _this.callBack(_this.selectItems);
            //console.log(_this.selectItems)
        });
        _this.$content.find(".fcon li").off("click").on("click", function () {
            let name = $(this).data("name");
            let value = $(this).data("value");
            _this.selectItems[name] = value;
            _this.callBack();
        });
    };
    window.createFilterBox = function (params) {
        return new FilterBox(params);
    }
}(jQuery, window));