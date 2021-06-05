// <input type="file" onchange="parseExcelFile1(this)">
function parseExcelFile1(inputElement) {
    var files = inputElement.files || [];
    if (!files.length) return;
    var file = files[0];
  
    console.time();
    var reader = new FileReader();
    reader.onloadend = function(event) {
      var arrayBuffer = reader.result;
      // debugger
  
      var options = { type: 'array' };
      var workbook = XLSX.read(arrayBuffer, options);
      console.timeEnd();
  
      var sheetName = workbook.SheetNames
      var sheet = workbook.Sheets[sheetName]
      result1.innerHTML = XLSX.utils.sheet_to_html(sheet)
    };
    reader.readAsArrayBuffer(file);
  }