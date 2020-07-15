$(function () {
  // 一、键盘弹起事件
  $("#title").on("keyup", function (e) {
    if (e.keyCode == 13) {
      // console.log(123);
      if ($(this).val().trim() == "") {
        alert("请输入计划！");
      } else {
        var value = $(this).val();
        // 获取本地数据
        var data = getData();
        // 修改数据
        data.push({ title: value, done: false });
        // 储存数据
        saveData(data);
        // 渲染数据
        load();
        // 清空表单
        $(this).val("");
      }
    }
  });

  // 二、删除功能
  // 删除按钮a是动态创建的元素  所以需要事件委托
  $("ol,ul").on("click", "a", function () {
    // 获取数据
    var data = getData();
    // 修改数据
    for (var i = 0; i < data.length; i++) {
      if (data[i].title == $(this).siblings("p").html()) {
        // console.log(data[i]);
        var newData = data.filter(function (value) {
          return value != data[i];
        });
      }
    }
    // 删除li
    $(this).parents("li").remove();
    // 存储数据
    saveData(newData);
  });

  // 三、根据复选框状态判断位置

  $("ul,ol").on("click", "input", function () {
    // 获取数据
    var data = getData();
    // 修改数据
    // 如果点击的复选框li里的文字和数据内title一致，则让数据的done和复选框状态保持一致
    for (var i = 0; i < data.length; i++) {
      if (data[i].title == $(this).siblings("p").html()) {
        data[i].done = $(this).prop("checked");
      }
    };
    // 存储数据
    saveData(data);
    // 渲染数据
    load();
  });

  // 封装函数之获取数据
  function getData() {
    var data = localStorage.getItem("todolist");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  // 封装函数之存储数据
  function saveData(data) {
    localStorage.setItem("todolist", JSON.stringify(data));
  }
  load();
  // 封装函数之渲染页面
  function load() {
    // 每次渲染数据之前先清空
    $("ol,ul").html("");
    // $("ul").html("");
    // 先获取数据
    var data = getData();
    // 声明两个变量用于统计数量
    var doneCount = 0;
    var todoCount = 0;
    // 循环数据
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i]);
      if (data[i].done) {
        $("#donelist").prepend(`<li>
                                    <input type="checkbox" checked>
                                    <p>${data[i].title}</p>
                                    <a href="javascript:;"></a>
                                    </li>`);
        doneCount++;
      } else {
        $("#todolist").prepend(
                                    `<li>
                                    <input type="checkbox">
                                    <p>${data[i].title}</p>
                                    <a href="javascript:;"></a>
                                    </li>`
        );
        todoCount++;
      }
    };
    $('#todocount').html(todoCount);
    $('#donecount').html(doneCount);
  }
});
