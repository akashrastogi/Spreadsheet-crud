var spreadsheetId = '1mJd0LiAzKibwXWtFOkbl8QX8rC-msl1QD4leJxtIv4s';

function doGet(e) {
  Logger.log('doGet called');
  var data = getAllProducts();
  return ContentService.createTextOutput(JSON.stringify(data, 0, 4)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var res = '';
  if (e.parameter.type == 'delete'){
    deleteProducts();
    res = 'All products deleted successfully';
  }
  else if (e.parameter.type == 'update'){
    updateProducts();
    res = 'Product updated successfully';
  }
  else {
    addProducts();
    res = 'Products added successfully';
  }
  Logger.log(res);
  return ContentService.createTextOutput(res);
}

// add products
function addProducts() {
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('first_sheet');
  var totalRows = sheet.getLastRow();
  Logger.log(totalRows);
  var start = totalRows + 1;
  var last = totalRows + 10;
  for(var i=start; i<=last; i++){
    sheet.appendRow(['product name ' + i, 'product version ' + i]);
  }
}

// Get all products
function getAllProducts() {
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('first_sheet');
  var data = sheet.getDataRange().getValues();
  var arrJson = [];
  for (var i = 0; i < data.length; i++) {
    var product = {
      product_name : data[i][0],
      product_version: data[i][1]
    };
    arrJson.push(product);
  }
  return arrJson;
}

// Update products
function updateProducts() {
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('first_sheet');
  var row = 7;
  var column = 2;
  sheet.getRange(row, column).setValue('updated value');
}

// Delete products
function deleteProducts() {
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('first_sheet');
  var lastRow = sheet.getLastRow();
  for (var i = lastRow; i >= 1 ; i--) {
    sheet.deleteRow(i);
  }
}
