var editor; // use a global for the submit and return data rendering in the trackings
var groupColumn = 1;

$(document).ready(function () {

    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ LOCALSTORAGE

    // Object that will contain the local state
    var trackingStorage = {};

    // Create or update the trackingStorage localStorage entry
    if (localStorage.getItem('trackingStorage')) {
        trackingStorage = JSON.parse(localStorage.getItem('trackingStorage'));
    }

    // Crear datos si no existen
    if (!localStorage.getItem('trackingStorage')) {
        localStorage.setItem('trackingStorage',
            JSON.stringify(
                { "15653328449160": { "hotel_id": "123", "hotel_name": "Hotel 1", "hotel_chain": "Palo", "hotel_type": "Web oficial", "analytics_ua": "UA-111111-1", "analytics_type": "Universal", "analytics_account": "ANALYTICS2", "analytics_status": "Inactivo", "gtm_id": "", "gtm_status": "Inactivo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Inactivo", "bing_id": "", "bing_status": "Inactivo", "affilied_id": "", "affilied_status": "Inactivo", "comentarios": "Muy bueno", "DT_RowId": "15653328449160" }, "15653329647440": { "hotel_id": "123", "hotel_name": "Hotel 1", "hotel_chain": "Palo", "hotel_type": "Web oficial", "analytics_ua": "UA-111112-2", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS4", "analytics_status": "Activo", "gtm_id": "", "gtm_status": "Inactivo", "ads_id": "4564", "ads_conv": "jffsadfASDGdhsdfgASDFasdfa", "ads_external": "Sí", "ads_status": "Activo", "bing_id": "", "bing_status": "Inactivo", "affilied_id": "", "affilied_status": "Inactivo", "comentarios": "", "DT_RowId": "15653329647440" }, "15653331388420": { "hotel_id": "123", "hotel_name": "Hotel 1", "hotel_chain": "Palo", "hotel_type": "Web oficial", "analytics_ua": "UA-222222-2", "analytics_type": "Universal", "analytics_account": "ANALYTICS6", "analytics_status": "Inactivo", "gtm_id": "GTM-1111111", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "", "bing_status": "Activo", "affilied_id": "", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653331388420" }, "15653332064350": { "hotel_id": "234", "hotel_name": "Hotel 2", "hotel_chain": "Cuerda", "hotel_type": "Motor", "analytics_ua": "UA-222222-1", "analytics_type": "Universal", "analytics_account": "ANALYTICS7", "analytics_status": "Activo", "gtm_id": "GTM-333444", "gtm_status": "Activo", "ads_id": "45645", "ads_conv": "dfASDFFAfafff75aff5afAF", "ads_external": "Sí", "ads_status": "Activo", "bing_id": "455645", "bing_status": "Activo", "affilied_id": "789964", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653332064350" }, "15653332762410": { "hotel_id": "345", "hotel_name": "Hotel 3", "hotel_chain": "Muro", "hotel_type": "Motor", "analytics_ua": "UA-4668789-7", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS4", "analytics_status": "Activo", "gtm_id": "GTM-789456", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "", "bing_status": "Activo", "affilied_id": "", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653332762410" }, "15653334252190": { "hotel_id": "345", "hotel_name": "Hotel 3", "hotel_chain": "Muro", "hotel_type": "Motor", "analytics_ua": "", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS1", "analytics_status": "Activo", "gtm_id": "GTM-456789", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "4556465", "bing_status": "Activo", "affilied_id": "", "affilied_status": "Activo", "comentarios": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar metus orci, in vulputate purus tempor eu. Nam molestie erat eu magna mattis sodales. Proin et arcu pellentesque sapien vulputate sagittis non nec purus. Curabitur id felis dictum, aliquet orci ac, commodo est.", "DT_RowId": "15653334252190" }, "15653337812340": { "hotel_id": "456", "hotel_name": "Hotel 4", "hotel_chain": "Muro", "hotel_type": "Motor", "analytics_ua": "UA-789456-5", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS1", "analytics_status": "Activo", "gtm_id": "", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "", "bing_status": "Activo", "affilied_id": "464654", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653337812340" }, "15653338186360": { "hotel_id": "456", "hotel_name": "Hotel 4", "hotel_chain": "Muro", "hotel_type": "Motor", "analytics_ua": "", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS1", "analytics_status": "Activo", "gtm_id": "", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "465465", "bing_status": "Activo", "affilied_id": "465456", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653338186360" }, "15653338464860": { "hotel_id": "456", "hotel_name": "Hotel 4", "hotel_chain": "Muro", "hotel_type": "Web oficial", "analytics_ua": "", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS1", "analytics_status": "Activo", "gtm_id": "GTM-456456", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "", "bing_status": "Activo", "affilied_id": "", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653338464860" }, "15653339235410": { "hotel_id": "567", "hotel_name": "Hotel 5", "hotel_chain": "Flor", "hotel_type": "Web oficial", "analytics_ua": "UA-789456-3", "analytics_type": "Universal", "analytics_account": "ANALYTICS8", "analytics_status": "Activo", "gtm_id": "", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "456456", "bing_status": "Activo", "affilied_id": "789778", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653339235410" }, "15653339602980": { "hotel_id": "567", "hotel_name": "Hotel 5", "hotel_chain": "Flor", "hotel_type": "Motor", "analytics_ua": "", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS1", "analytics_status": "Activo", "gtm_id": "GTM-789456", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "", "bing_status": "Activo", "affilied_id": "", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653339602980" }, "15653339965290": { "hotel_id": "678", "hotel_name": "Hotel 6", "hotel_chain": "Pez", "hotel_type": "Motor", "analytics_ua": "UA-435245-6", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS1", "analytics_status": "Activo", "gtm_id": "", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "", "bing_status": "Activo", "affilied_id": "", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653339965290" } }            )
        )
        location.reload(true);
    }


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Set up the EDITOR


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
            def: "Activo",
            options: ['Activo', 'Inactivo']
        }, {
            label: "GTM ID:",
            fieldInfo: "GTM-XXXXXX",
            name: "gtm_id"
        }, {
            label: "GTM Status:",
            name: "gtm_status",
            type: "select",
            def: "Activo",
            options: ['Activo', 'Inactivo']
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
            def: "Activo",
            options: ['Activo', 'Inactivo']
        }, {
            label: "Bing ID",
            className: "numeric-input",
            name: "bing_id"
        }, {
            label: "Bing Status",
            name: "bing_status",
            type: "select",
            def: "Activo",
            options: ['Activo', 'Inactivo']
        }, {
            label: "Affilied ID",
            className: "numeric-input",
            name: "affilied_id"
        }, {
            label: "Affilied Status",
            name: "affilied_status",
            type: "select",
            def: "Activo",
            options: ['Activo', 'Inactivo']
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


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Initialise the DATATABLE


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
        dom: "<'flex-space-between default-box'fB>r<'default-box't><'flex-space-between tracking-footer'ip>",
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





