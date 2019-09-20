console.log('working');

$(document).ready(()=> {
    $('#datepicker-range-example').datepicker({
        autoclose: true,
        assumeNearbyYear: true,
        disableTouchKeyboard: true,
        todayHighlight: true,
        toggleActive: true,
    });
});