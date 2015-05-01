var server_name = "http://127.0.0.1:3000/";
var socket = io('/display]');
console.log('Client: Connecting to server '+server_name);

var handle_keys_msg = function(ip, keys){

	$.each($('#table_area').children("table"), function(){
		if(this.id === ip){
			this.remove();
			//break;
		}
	});
	var $tbl = create_table(ip, keys);
	$('#table_area').append($tbl);
};

var create_table = function(id, keys) {
	var table = $('<table></table>').addClass('table table-bordered table-striped').attr("id", id);
	var capt = $('<caption></caption>').text('Key details for node '+id);
	var thead = $('<thead></thead>');

	var tr = $('<tr></tr>');
	var th = $('<th></th>').text('Sr. no.');
	tr.append(th);
	var th = $('<th></th>').text('Keys contained');
	tr.append(th);
	thead.append(tr);

	var tbody = $('<tbody></tbody>');
	for(var i=0; i<keys.length; i++) {
		var row = $('<tr></tr>');
		var td = $('<td></td>').addClass('bar').text(i+1);
		row.append(td);
		td = $('<td></td>').addClass('bar').text(keys[i]);
		row.append(td);
    	tbody.append(row);
	}

	table.append(capt);
	table.append(thead);
	table.append(tbody);

	var $div = $('<div></div>').addClass('table-responsive col-md-6 fixed-ht');
	$div.append(table);

	return $div;
};

socket.on('ip_keys_msg', function(data){
	var ip = data.ip;
	var keys = data.keys.split(",");
	handle_keys_msg(ip, keys);
});

//handle_keys_msg('1.2.3.4', [111,222,333,444]);