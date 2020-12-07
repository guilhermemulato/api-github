document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  M.Modal.init(elems);

  var elems2 = document.querySelectorAll(".tabs");
  var instance = M.Tabs.init(elems2);
});
