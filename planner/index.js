class Item {
	constructor(content, listNumber) {
		this.content = content;
		this.listNumber = listNumber;
		this.attr = "data-itemid";
		this.class = "tdItem";
	}

	addToList() {
		let number_Id = 0;
		let list;
		let mask;
		switch (this.listNumber) {
			case "1":
				list = List1;
				mask = Mask1;
				break;
			case "2":
				list = List2;
				mask = Mask2;
				break;
			case "3":
				list = List3;
				mask = Mask3;
				break;
			case "4":
				list = List4;
				mask = Mask4;
				break;
		}
		list.children().each(function (index, el) {
			let element_Id = $(el).attr("data-itemid").slice(5);
			if (element_Id > number_Id) number_Id = element_Id;
		});
		number_Id++;
		// Отправляем новую задачу сразу в память
		localStorage.setItem(mask + number_Id, this.content);
		// и добавляем её в конец списка
		$("<li></li>")
			.addClass("tdItem")
			.attr("data-itemid", mask + number_Id)
			.text(this.content)
			.appendTo(list);
	}
}

var List1 = $("#tdl1App ul");
var Mask1 = "tdl1_";
var List2 = $("#tdl2App ul");
var Mask2 = "tdl2_";
var List3 = $("#tdl3App ul");
var Mask3 = "tdl3_";
var List4 = $("#tdl4App ul");
var Mask4 = "tdl4_";

function showTasks() {
	var Storage_size = localStorage.length;
	if (Storage_size > 0) {
		for (var i = 0; i < Storage_size; i++) {
			var key = localStorage.key(i);

			if (key.indexOf(Mask1) == 0) {
				$("<li></li>")
					.addClass("tdItem")
					.attr("data-itemid", key)
					.text(localStorage.getItem(key))
					.appendTo(List1);
			}

			if (key.indexOf(Mask2) == 0) {
				$("<li></li>")
					.addClass("tdItem")
					.attr("data-itemid", key)
					.text(localStorage.getItem(key))
					.appendTo(List2);
			}

			if (key.indexOf(Mask3) == 0) {
				$("<li></li>")
					.addClass("tdItem")
					.attr("data-itemid", key)
					.text(localStorage.getItem(key))
					.appendTo(List3);
			}

			if (key.indexOf(Mask4) == 0) {
				$("<li></li>")
					.addClass("tdItem")
					.attr("data-itemid", key)
					.text(localStorage.getItem(key))
					.appendTo(List4);
			}
		}
	}
}
showTasks();

$("input").on("keydown", function (e) {
	if (e.keyCode != 13) return;
	var str = e.target.value;
	e.target.value = "";
	// Если в поле ввода было что-то написано — начинаем обрабатывать
	if (str.length > 0) {
		let task = new Item(str, e.target.getAttribute("list-number"));
		task.addToList();
	}
});

$(document).on("click", ".tdItem", function (e) {
	var target = $(e.target);
	localStorage.removeItem(target.attr("data-itemid"));
	target.remove();
});
