document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  M.Modal.init(elems);

  var elems2 = document.querySelectorAll(".tabs");
  M.Tabs.init(elems2);

  var elems3 = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems3);
});
