$(document).ready(function () {
  $("#action").change(function () {
    $('#default').prop('checked', true);
    switch (this.value) {
      case "get":
        $("#id").show();
        $(".user").hide();
        $("#users").removeClass("actif update");
        $(".product").hide();
        $("#products").removeClass("actif update");
        $(".category").hide();
        $("#categories").removeClass("actif update");
        $(".order").hide();
        $("#orders").removeClass("actif update");
        break;
      case "add":
        $("#id").hide();
        $(".user").hide();
        $("#users").addClass("actif");
        $("#users").removeClass("update");
        $(".product").hide();
        $("#products").addClass("actif");
        $("#products").removeClass("update");
        $(".category").hide();
        $("#categories").addClass("actif");
        $("#categories").removeClass("update");
        $(".order").hide();
        $("#orders").addClass("actif");
        $("#orders").removeClass("update");
        break;
      case "put":
        $("#id").hide();
        $(".user").hide();
        $("#users").addClass("actif update");
        $(".product").hide();
        $("#products").addClass("actif update");
        $(".category").hide();
        $("#categories").addClass("actif update");
        $(".order").hide();
        $("#orders").addClass("actif update");
        break;
      case "delete":
        $("#id").show();
        $(".user").hide();
        $("#users").removeClass("actif update");
        $(".product").hide();
        $("#products").removeClass("actif update");
        $(".category").hide();
        $("#categories").removeClass("actif update");
        $(".order").hide();
        $("#orders").removeClass("actif update");
        break;
    }
  });
  $("#users").click(function () {
    if ($("#users").hasClass("actif")) {
      $(".product").hide();
      $(".order").hide();
      $(".category").hide();
      $(".user").show();
    }
    if ($("#users").hasClass("update")) {
      $("#id").show();
    }
  });
  $("#products").click(function () {
    if ($("#products").hasClass("actif")) {
      $(".user").hide();
      $(".order").hide();
      $(".category").hide();
      $(".product").show();
    }
    if ($("#users").hasClass("update")) {
      $("#id").show();
    }
  });
  $("#orders").click(function () {
    if ($("#orders").hasClass("actif")) {
      $(".user").hide();
      $(".product").hide();
      $(".category").hide();
      $(".order").show();
    }
    if ($("#users").hasClass("update")) {
      $("#id").show();
    }
  });
  $("#categories").click(function () {
    if ($("#categories").hasClass("actif")) {
      $(".user").hide();
      $(".product").hide();
      $(".order").hide();
      $(".category").show();
    }
    if ($("#users").hasClass("update")) {
      $("#id").show();
    }
  });
});