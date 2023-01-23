$(document).ready(function () {
  $("#action").change(function () {
    $('#default').prop('checked', true);
    switch (this.value) {
      case "get":
        $(".IDs").hide();
        $(".user").hide();
        $("#users").addClass("id");
        $("#users").removeClass("delete data");
        $(".product").hide();
        $("#products").addClass("id");
        $("#products").removeClass("delete data");
        $(".category").hide();
        $("#categories").addClass("id");
        $("#categories").removeClass("delete data");
        $(".order").hide();
        $("#orders").addClass("id");
        $("#orders").removeClass("delete data");
        $(".orderProduct").hide();
        $("#orderProducts").addClass("id");
        $("#orderProducts").removeClass("delete data");
        break;
      case "add":
        $(".IDs").hide();
        $(".user").hide();
        $("#users").addClass("data");
        $("#users").removeClass("delete id");
        $(".product").hide();
        $("#products").addClass("data");
        $("#products").removeClass("delete id");
        $(".category").hide();
        $("#categories").addClass("data");
        $("#categories").removeClass("delete id");
        $(".order").hide();
        $("#orders").addClass("data");
        $("#orders").removeClass("delete id");
        $(".orderProduct").hide();
        $("#orderProducts").addClass("data id");
        $("#orderProducts").removeClass("delete");
        break;
      case "put":
        $(".IDs").hide();
        $(".user").hide();
        $("#users").addClass("data id");
        $("#users").removeClass("delete");
        $(".product").hide();
        $("#products").addClass("data id");
        $("#products").removeClass("delete");
        $(".category").hide();
        $("#categories").addClass("data id");
        $("#categories").removeClass("delete");
        $(".order").hide();
        $("#orders").addClass("data id");
        $("#orders").removeClass("delete");
        $(".orderProduct").hide();
        $("#orderProducts").addClass("data id");
        $("#orderProducts").removeClass("delete");
        break;
      case "delete":
        $(".IDs").hide();
        $(".user").hide();
        $("#users").addClass("delete");
        $("#users").removeClass("data id");
        $(".product").hide();
        $("#products").addClass("delete");
        $("#products").removeClass("data id");
        $(".category").hide();
        $("#categories").addClass("delete");
        $("#categories").removeClass("data id");
        $(".order").hide();
        $("#orders").addClass("delete");
        $("#orders").removeClass("data id");
        $(".orderProduct").hide();
        $("#orderProducts").addClass("delete");
        $("#orderProducts").removeClass("data id");
        break;
    }
  });
  $("#users").click(function () {
    if ($("#users").hasClass("data")) {
      $(".product").hide();
      $(".order").hide();
      $(".category").hide();
      $(".user").show();
      $(".orderProduct").hide();
      $(".IDs").hide();
    }
    if ($("#users").hasClass("id")) {
      $(".IDs").hide();
      $("#id").show();
    }
    if ($("#users").hasClass("delete")) {
      $(".product").hide();
      $(".order").hide();
      $(".category").hide();
      $(".user").hide();
      $(".orderProduct").hide();
      $(".IDs").hide();
      $("#id").show();
    }
  });
  $("#products").click(function () {
    if ($("#products").hasClass("data")) {
      $(".user").hide();
      $(".order").hide();
      $(".category").hide();
      $(".product").show();
      $(".orderProduct").hide();
      $(".IDs").hide();
      $("#categoryId").show();
    }
    if ($("#products").hasClass("id")) {
      $(".IDs").hide();
      $("#id").show();
      $("#categoryId").show();
    }
    if ($("#products").hasClass("delete")) {
      $(".product").hide();
      $(".order").hide();
      $(".category").hide();
      $(".user").hide();
      $(".orderProduct").hide();
      $(".IDs").hide();
      $("#id").show();
    }
  });
  $("#categories").click(function () {
    if ($("#categories").hasClass("data")) {
      $(".user").hide();
      $(".product").hide();
      $(".order").hide();
      $(".category").show();
      $(".orderProduct").hide();
      $(".IDs").hide();
    }
    if ($("#categories").hasClass("id")) {
      $(".IDs").hide();
      $("#id").show();
    }
    if ($("#categories").hasClass("delete")) {
      $(".product").hide();
      $(".order").hide();
      $(".category").hide();
      $(".user").hide();
      $(".orderProduct").hide();
      $(".IDs").hide();
      $("#id").show();
    }
  });
  $("#orders").click(function () {
    if ($("#orders").hasClass("data")) {
      $(".user").hide();
      $(".product").hide();
      $(".category").hide();
      $(".order").show();
      $(".orderProduct").hide();
      $(".IDs").hide();
      $("#userId").show();
    }
    if ($("#orders").hasClass("id")) {
      $(".IDs").hide();
      $("#id").show();
      $("#userId").show();
    }
    if ($("#orders").hasClass("delete")) {
      $(".product").hide();
      $(".order").hide();
      $(".category").hide();
      $(".user").hide();
      $(".orderProduct").hide();
      $(".IDs").hide();
      $("#id").show();
    }
  });
  $("#orderProducts").click(function () {
    if ($("#orderProducts").hasClass("data")) {
      $(".user").hide();
      $(".product").hide();
      $(".category").hide();
      $(".order").hide();
      $(".orderProduct").show();
      $(".IDs").hide();
    }
    if ($("#orderProducts").hasClass("id")) {
      $(".IDs").hide();
      $("#orderId").show();
      $("#productId").show();
    }
    if ($("#orderProducts").hasClass("delete")) {
      $(".product").hide();
      $(".order").hide();
      $(".category").hide();
      $(".user").hide();
      $(".orderProduct").hide();
      $(".IDs").hide();
      $("#orderId").show();
      $("#productId").show();
    }
  });
});
