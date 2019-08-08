var editor; // use a global for the submit and return data rendering in the examples
var groupColumn = 1;

$(document).ready(function () {

    
    // Object that will contain the local state
    var todo = {};

    // Create or update the todo localStorage entry
    if (localStorage.getItem('todo')) {
        todo = JSON.parse(localStorage.getItem('todo'));
    }

    // Set up the editor
    editor = new $.fn.dataTable.Editor({
        table: "#example",
        fields: [{
            label: "ID:",
            name: "hotel_id"
        }, {
            label: "Nombre:",
            name: "hotel_name"
        }, {
            label: "Cadena:",
            name: "hotel_chain"
        }, {
            label: "Tipo:",
            name: "hotel_type",
            type: "select",
            def: "Web oficial",
            options: ['Web oficial', 'Motor']
        }, {
            label: "Analytics UA:",
            name: "analytics_ua"
        }, {
            label: "Analytics Tipo:",
            name: "analytics_type",
            type: "select",
            def: "Asíncrono",
            options: ['Asíncrono', 'Universal']
        }, {
            label: "Analytics Serv. Account:",
            name: "analytics_account"
        }, {
            label: "Analytics Status:",
            name: "analytics_status",
            type: "select",
            def: "Activo",
            options: ['Activo', 'Inactivo']
        }, {
            label: "GTM ID:",
            name: "gtm_id"
        }, {
            label: "GTM Status:",
            name: "gtm_status",
            type: "select",
            def: "Activo",
            options: ['Activo', 'Inactivo']
        }],
        ajax: function (method, url, d, successCallback, errorCallback) {
            var output = {
                data: []
            };

            if (d.action === 'create') {
                // Create new row(s), using the current time and loop index as
                // the row id
                var dateKey = +new Date();

                $.each(d.data, function (key, value) {
                    var id = dateKey + '' + key;

                    value.DT_RowId = id;
                    todo[id] = value;
                    output.data.push(value);
                });
            } else if (d.action === 'edit') {
                // Update each edited item with the data submitted
                $.each(d.data, function (id, value) {
                    value.DT_RowId = id;
                    $.extend(todo[id], value);
                    output.data.push(todo[id]);
                });
            } else if (d.action === 'remove') {
                // Remove items from the object
                $.each(d.data, function (id) {
                    delete todo[id];
                });
            }

            // Store the latest `todo` object for next reload
            localStorage.setItem('todo', JSON.stringify(todo));

            // Show Editor what has changed
            successCallback(output);
        }
    });

    // Initialise the DataTable
    var table = $('#example').DataTable({


        // Columnas

        "columnDefs": [{
            "visible": true,
            "targets": groupColumn
        }],
        "order": [
            [groupColumn, 'asc']
        ],
        "drawCallback": function (settings) {
            var api = this.api();
            var rows = api.rows({
                page: 'current'
            }).nodes();
            var last = null;

            api.column(groupColumn, {
                page: 'current'
            }).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="group"><td colspan="1">' + group + '</td></tr>'
                    );
                    last = group;
                }
            });
        },


        // Scroll

        scrollX: true,

        // edit
        dom: "Bfrtip",
        data: $.map(todo, function (value, key) {
            return value;
        }),
        columns: [{ // Checkbox select column
                data: null,
                defaultContent: '',
                className: 'select-checkbox',
                orderable: false
            },

            { data: "hotel_id" },
            { data: "hotel_name" },
            { data: "hotel_chain" },
            { data: "hotel_type" },
            { data: "analytics_ua", className: 'editable' },
            { data: "analytics_type", className: 'editable' },
            { data: "analytics_account", className: 'editable' },
            { data: "analytics_status", className: 'editable' },
            { data: "gtm_id", className: 'editable' },
            { data: "gtm_status", className: 'editable' }


         ],
        order: [1, 'asc'],
        keys: {
            columns: '.editable',
            keys: [ 9 ],
            editor: editor,
            editOnFocus: true
        },
        select: {
            style: 'os',
            selector: 'td.select-checkbox'
        },
        // select: true,
        buttons: [{
                extend: "create",
                editor: editor
            },
            {
                extend: "edit",
                editor: editor
            },
            {
                extend: "remove",
                editor: editor
            }
        ]


    });

    // Activate an inline edit on click of a table cell
    
    table.on('click', 'tbody td.editable', function (e) {
        // editor.inline(this);
        editor.inline(this, {
            onBlur: 'submit'
        });
    });




    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CUSTOM SELECT

    table.on('select', function (e, dt, row, indexes) {

        console.log('selección');
        var target = table.row(indexes).nodes().to$();
        var next = target.next(); // siguiente row
        
        if (!next.is('.selected, .group')) { // selecciona si no está seleccionada o es group
            table.row(next).select(); 

        }
        
    });
    
    table.on('deselect', function (e, dt, row, indexes) {

        console.log('deselección');
        var target = table.row(indexes).nodes().to$();
        table.row($('+ .selected', target)).deselect(); // deselecciona la siguiente
        
    });
    
    table.on('user-select', function (e, dt, type, cell, originalEvent) {
        
        var target = $(originalEvent.target.closest("tr"));

        if ( target.is('.selected') ) { // OJO ----> cancelamos el evento para hacerlo
            e.preventDefault();

            table.row( target ).deselect();
        }

    });
    





    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ STICKY

    $('#example tbody [role=row]')




});





