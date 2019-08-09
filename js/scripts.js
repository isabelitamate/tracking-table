var editor; // use a global for the submit and return data rendering in the trackings
var groupColumn = 1;

$(document).ready(function () {

    
    // Object that will contain the local state
    var trackingStorage = {};

    // Create or update the trackingStorage localStorage entry
    if (localStorage.getItem('trackingStorage')) {
        trackingStorage = JSON.parse(localStorage.getItem('trackingStorage'));
    }

    // Crear datos si no existen
    // if (!localStorage.getItem('trackingStorage')) {
    //     localStorage.setItem('trackingStorage',
    //         JSON.stringify(
    //             { "15651631528400": { "hotel_id": "234", "hotel_name": "Hotel 1", "hotel_chain": "Piedra", "hotel_type": "Web oficial", "analytics_ua": "UA-123-F", "analytics_type": "Asíncrono", "analytics_account": "Analytics 1", "analytics_status": "Inactivo", "gtm_id": "5", "gtm_status": "Activo", "DT_RowId": "15651631528400" }, "15651633496580": { "hotel_id": "234", "hotel_name": "Hotel 1", "hotel_chain": "Piedra", "hotel_type": "Web oficial", "analytics_ua": "UA-345-Z", "analytics_type": "Universal", "analytics_account": "Analytics", "analytics_status": "Inactivo", "gtm_id": "7", "gtm_status": "Inactivo", "DT_RowId": "15651633496580" }, "15651688696620": { "hotel_id": "235", "hotel_name": "Hotel 2", "hotel_chain": "Palo", "hotel_type": "Web oficial", "analytics_ua": "UA-345-X", "analytics_type": "Universal", "analytics_account": "", "analytics_status": "Activo", "gtm_id": "8", "gtm_status": "Activo", "DT_RowId": "15651688696620" }, "15651718939500": { "hotel_id": "234", "hotel_name": "Hotel 1", "hotel_chain": "Piedra", "hotel_type": "Web oficial", "analytics_ua": "UA-111-C", "analytics_type": "Asíncrono", "analytics_account": "Analytics 2", "analytics_status": "Activo", "gtm_id": "1", "gtm_status": "Activo", "DT_RowId": "15651718939500" }, "15652553192620": { "hotel_id": "235", "hotel_name": "Hotel 2", "hotel_chain": "Palo", "hotel_type": "Web oficial", "analytics_ua": "", "analytics_type": "Asíncrono", "analytics_account": "", "analytics_status": "Activo", "gtm_id": "", "gtm_status": "Activo", "DT_RowId": "15652553192620" }, "15652553694220": { "hotel_id": "492", "hotel_name": "Hotel 3", "hotel_chain": "Tenedor", "hotel_type": "Motor", "analytics_ua": "UA-643-X", "analytics_type": "Asíncrono", "analytics_account": "Analytics", "analytics_status": "Inactivo", "gtm_id": "45", "gtm_status": "Inactivo", "DT_RowId": "15652553694220" }, "15652554125920": { "hotel_id": "492", "hotel_name": "Hotel 3", "hotel_chain": "Tenedor", "hotel_type": "Motor", "analytics_ua": "UA-021-F", "analytics_type": "Universal", "analytics_account": "Analytics 2", "analytics_status": "Activo", "gtm_id": "4", "gtm_status": "Inactivo", "DT_RowId": "15652554125920" }, "15652554514560": { "hotel_id": "932", "hotel_name": "Hotel 4", "hotel_chain": "", "hotel_type": "Motor", "analytics_ua": "UA-431-B", "analytics_type": "Universal", "analytics_account": "Analytics", "analytics_status": "Activo", "gtm_id": "2", "gtm_status": "Inactivo", "DT_RowId": "15652554514560" }, "15652555000560": { "hotel_id": "532", "hotel_name": "Hotel 5", "hotel_chain": "Tomate", "hotel_type": "Motor", "analytics_ua": "UA-432-N", "analytics_type": "Asíncrono", "analytics_account": "Analytics 2", "analytics_status": "Inactivo", "gtm_id": "6", "gtm_status": "Activo", "DT_RowId": "15652555000560" }, "15652555456450": { "hotel_id": "532", "hotel_name": "Hotel 5", "hotel_chain": "Tomate", "hotel_type": "Motor", "analytics_ua": "UA-646-R", "analytics_type": "Asíncrono", "analytics_account": "Analytics 2", "analytics_status": "Inactivo", "gtm_id": "9", "gtm_status": "Activo", "DT_RowId": "15652555456450" }, "15652556125590": { "hotel_id": "661", "hotel_name": "Hotel 6", "hotel_chain": "Felpudo", "hotel_type": "Motor", "analytics_ua": "UA-232-P", "analytics_type": "Universal", "analytics_account": "Analytics 2", "analytics_status": "Inactivo", "gtm_id": "3", "gtm_status": "Activo", "DT_RowId": "15652556125590" }, "15652556569040": { "hotel_id": "661", "hotel_name": "Hotel 6", "hotel_chain": "Felpudo", "hotel_type": "Motor", "analytics_ua": "UA-214-X", "analytics_type": "Universal", "analytics_account": "Analytics 5", "analytics_status": "Activo", "gtm_id": "6", "gtm_status": "Inactivo", "DT_RowId": "15652556569040" } }
    //         )
    //     )
    // }

    // Set up the editor
    editor = new $.fn.dataTable.Editor({
        table: "#tracking",
        fields: [{
            label: "ID:",
            className: "numeric-input required no-edit",
            name: "hotel_id"
        }, {
            label: "Nombre:",
            className: "required no-edit",
            name: "hotel_name"
        }, {
            label: "Cadena:",
            className: "no-edit",
            name: "hotel_chain"
        }, {
            label: "Tipo:",
            className: "no-edit",
            name: "hotel_type",
            type: "select",
            def: "Web oficial",
            options: ['Web oficial', 'Motor']
        }, {
            label: "Analytics UA:",
            fieldInfo: "UA-XXXXXX-X",
            name: "analytics_ua"
        }, {
            label: "Analytics Tipo:",
            name: "analytics_type",
            type: "select",
            def: "Asíncrono",
            options: ['Asíncrono', 'Universal']
        }, {
            label: "Analytics Serv. Account:",
            name: "analytics_account",
            type: "select",
            def: "ANALYTICS1",
            options: ['ANALYTICS1', 'ANALYTICS2', 'ANALYTICS3', 'ANALYTICS4', 'ANALYTICS5', 'ANALYTICS6', 'ANALYTICS7', 'ANALYTICS8', 'ANALYTICS9', 'ANALYTICS10']
        }, {
            label: "Analytics Status:",
            name: "analytics_status",
            type: "select",
            def: "Inactivo",
            options: ['Inactivo', 'Activo']
        }, {
            label: "GTM ID:",
            fieldInfo: "GTM-XXXXXX",
            name: "gtm_id"
        }, {
            label: "GTM Status:",
            name: "gtm_status",
            type: "select",
            def: "Inactivo",
            options: ['Inactivo', 'Activo']
        }, {
            label: "Ads ID",
            className: "numeric-input",
            name: "ads_id"
        }, {
            label: "Ads Conv. Label",
            name: "ads_conv"
        }, {
            label: "Ads External Campain",
            name: "ads_external",
            type: "select",
            def: "No",
            options: ['No', 'Sí']
        }, {
            label: "Ads Status",
            name: "ads_status",
            type: "select",
            def: "Inactivo",
            options: ['Inactivo', 'Activo']
        }, {
            label: "Bing ID",
            className: "numeric-input",
            name: "bing_id"
        }, {
            label: "Bing Status",
            name: "bing_status",
            type: "select",
            def: "Inactivo",
            options: ['Inactivo', 'Activo']
        }, {
            label: "Affilied ID",
            className: "numeric-input",
            name: "affilied_id"
        }, {
            label: "Affilied Status",
            name: "affilied_status",
            type: "select",
            def: "Inactivo",
            options: ['Inactivo', 'Activo']
        }, {
            label: "Comentarios",
            name: "comentarios",
            type: "textarea"
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
                    trackingStorage[id] = value;
                    output.data.push(value);
                });
            } else if (d.action === 'edit') {
                // Update each edited item with the data submitted
                $.each(d.data, function (id, value) {
                    value.DT_RowId = id;
                    $.extend(trackingStorage[id], value);
                    output.data.push(trackingStorage[id]);
                });
            } else if (d.action === 'remove') {
                // Remove items from the object
                $.each(d.data, function (id) {
                    delete trackingStorage[id];
                });
            }

            // Store the latest `trackingStorage` object for next reload
            localStorage.setItem('trackingStorage', JSON.stringify(trackingStorage));

            // Show Editor what has changed
            successCallback(output);
        }

    });

    // Initialise the DataTable
    var table = $('#tracking').DataTable({


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
        data: $.map(trackingStorage, function (value, key) {
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
            { data: "analytics_ua", className: 'editable', orderable: false },
            { data: "analytics_type", className: 'editable', orderable: false },
            { data: "analytics_account", className: 'editable', orderable: false },
            { data: "analytics_status", className: 'editable', orderable: false },
            { data: "gtm_id", className: 'editable', orderable: false },
            { data: "gtm_status", className: 'editable', orderable: false },
            { data: "ads_id", className: 'editable', orderable: false },
            { data: "ads_conv", className: 'editable', orderable: false },
            { data: "ads_external", className: 'editable', orderable: false },
            { data: "ads_status", className: 'editable', orderable: false },
            { data: "bing_id", className: 'editable', orderable: false },
            { data: "bing_status", className: 'editable', orderable: false },
            { data: "affilied_id", className: 'editable', orderable: false },
            { data: "affilied_status", className: 'editable', orderable: false },
            { data: "comentarios", className: 'editable' }
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
                className: "",
                editor: editor
            },
            {
                extend: "edit",
                className: "",
                editor: editor
            },
            {
                extend: "remove",
                className: "",
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

        // console.log('selección');
        var target = table.row(indexes).nodes().to$();
        var next = target.next(); // siguiente row
        
        if (!next.is('.selected, .group')) { // selecciona si no está seleccionada o es group
            
            table.row(next).select(); 
        }
    });
    
    table.on('deselect', function (e, dt, row, indexes) {

        // console.log('deselección');
        var target = table.row(indexes).nodes().to$();
        var next = target.next(); // siguiente row
        
        table.row($(next)).deselect(); // deselecciona la siguiente
    });

    
    // Modificaciones en el selector de Datatable

    table.on('user-select', function (e, dt, type, cell, originalEvent) {
        
        e.preventDefault(); // previene todo
        var target = $(originalEvent.target.closest("tr")); // row target

        if (! target.is('.selected')) { // si no está seleccionado se selecciona
            
            table.row( target ).select();
        } else {

            table.row( target ).deselect();
        }
    });
    
    // Select / Deselect all
    
    $('.js-multi-select').on('click', function() {

        if (table.rows({ selected: true, page: 'current' })[0].length ) {

            table.rows('.selected', { page: 'current' }).deselect();
        } else {

            table.rows({ page: 'current' }).select();
        }
    });



    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ FORM MODIFICATIONS


    table.on('buttons-action', function (e, buttonApi, dataTable, node, config) {

        if ( (buttonApi.text() == 'New') || (buttonApi.text() == 'Edit') ) { // Validation

            $('.DTE_Field.required input').attr("required", "true");
            $('.DTE_Field.numeric-input input').attr("type", "number");
        }

        if ( buttonApi.text() == 'Edit' ) { // Disable fields on edit form

            $('.DTE_Field.no-edit input').attr("readonly", "true");
        }
    
    });





});





