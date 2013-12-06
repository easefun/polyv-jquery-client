$(function() {
  var upload = null;

  $('.js-stop').click(function(e) {
    e.preventDefault();

    if (upload) {
      upload.stop();
    }
  });

  $('input[type=file]').change(function() {
    var $input  = $(this);
    var $parent = $input.parent();
    var file    = this.files[0];
    console.log('selected file', file);
	var re = /(?:\.([^.]+))?$/;
	var ext = re.exec(file.name)[1];

    $('.js-stop').removeClass('disabled');

    var options = {
      endpoint: 'http://v.polyv.net:1080/files/',
      resetBefore: $('#reset_before').prop('checked'),
      resetAfter: false,
	  title:"title",
	  desc:"desc",
	  ext:ext,
	  writeToken:"Y07Q4yopIVXN83n-MPoIlirBKmrMPJu0"
    };
	

    $('.progress').addClass('active');

    upload = polyv.upload(file, options)
      .fail(function(error) {
        alert('Failed because: ' + error);
      })
      .always(function() {
        $input.val('');
        $('.js-stop').addClass('disabled');
        $('.progress').removeClass('active');
      })
      .progress(function(e, bytesUploaded, bytesTotal) {
        var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
        $('.progress .bar').css('width', percentage + '%');
        console.log(bytesUploaded, bytesTotal, percentage + '%');
      })
      .done(function(url, file) {
        var $download = $('<a>Download ' + file.name + ' (' + file.size + ' bytes)</a><br />').appendTo($parent);
        $download.attr('href', url);
        $download.addClass('btn').addClass('btn-success');
      });
  });
});
