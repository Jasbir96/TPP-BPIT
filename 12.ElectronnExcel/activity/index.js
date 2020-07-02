const $ = require("jquery");
$(document).ready(
    function () {
        $("#grid .cell").on("click", function () {
            let rid = Number($(this).attr("ri"));
            let cid = Number($(this).attr("ci"));
            let ciAdrr = String.fromCharCode(cid + 65);
            $("#address-container").val(ciAdrr +( rid+1));
        })
    }
);