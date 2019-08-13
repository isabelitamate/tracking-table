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
                { "15653328449160": { "hotel_id": "123", "hotel_name": "Hotel 1", "hotel_chain": "Palo", "hotel_type": "Web oficial", "analytics_ua": "UA-111111-1", "analytics_type": "Universal", "analytics_account": "ANALYTICS2", "analytics_status": "Inactivo", "gtm_id": "", "gtm_status": "Inactivo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Inactivo", "bing_id": "", "bing_status": "Inactivo", "affilied_id": "", "affilied_status": "Inactivo", "comentarios": "Muy bueno", "DT_RowId": "15653328449160" }, "15653329647440": { "hotel_id": "123", "hotel_name": "Hotel 1", "hotel_chain": "Palo", "hotel_type": "Web oficial", "analytics_ua": "UA-111112-2", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS4", "analytics_status": "Activo", "gtm_id": "", "gtm_status": "Inactivo", "ads_id": "4564", "ads_conv": "jffsadfASDGdhsdfgASDFasdfa", "ads_external": "Sí", "ads_status": "Activo", "bing_id": "", "bing_status": "Inactivo", "affilied_id": "", "affilied_status": "Inactivo", "comentarios": "", "DT_RowId": "15653329647440" }, "15653331388420": { "hotel_id": "123", "hotel_name": "Hotel 1", "hotel_chain": "Palo", "hotel_type": "Web oficial", "analytics_ua": "UA-222222-2", "analytics_type": "Universal", "analytics_account": "ANALYTICS6", "analytics_status": "Inactivo", "gtm_id": "GTM-1111111", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "", "bing_status": "Activo", "affilied_id": "", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653331388420" }, "15653332064350": { "hotel_id": "234", "hotel_name": "Hotel 2", "hotel_chain": "Cuerda", "hotel_type": "Motor", "analytics_ua": "UA-222222-1", "analytics_type": "Universal", "analytics_account": "ANALYTICS7", "analytics_status": "Activo", "gtm_id": "GTM-333444", "gtm_status": "Activo", "ads_id": "45645", "ads_conv": "dfASDFFAfafff75aff5afAF", "ads_external": "Sí", "ads_status": "Activo", "bing_id": "455645", "bing_status": "Activo", "affilied_id": "789964", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653332064350" }, "15653332762410": { "hotel_id": "345", "hotel_name": "Hotel 3", "hotel_chain": "Muro", "hotel_type": "Motor", "analytics_ua": "UA-4668789-7", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS4", "analytics_status": "Activo", "gtm_id": "GTM-789456", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "", "bing_status": "Activo", "affilied_id": "", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653332762410" }, "15653334252190": { "hotel_id": "345", "hotel_name": "Hotel 3", "hotel_chain": "Muro", "hotel_type": "Motor", "analytics_ua": "", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS1", "analytics_status": "Activo", "gtm_id": "GTM-456789", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "4556465", "bing_status": "Activo", "affilied_id": "", "affilied_status": "Activo", "comentarios": "Lorem ipsum dolor sit amet, commodo est.", "DT_RowId": "15653334252190" }, "15653337812340": { "hotel_id": "456", "hotel_name": "Hotel 4", "hotel_chain": "Muro", "hotel_type": "Motor", "analytics_ua": "UA-789456-5", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS1", "analytics_status": "Activo", "gtm_id": "", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "", "bing_status": "Activo", "affilied_id": "464654", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653337812340" }, "15653338186360": { "hotel_id": "456", "hotel_name": "Hotel 4", "hotel_chain": "Muro", "hotel_type": "Motor", "analytics_ua": "", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS1", "analytics_status": "Activo", "gtm_id": "", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "465465", "bing_status": "Activo", "affilied_id": "465456", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653338186360" }, "15653338464860": { "hotel_id": "456", "hotel_name": "Hotel 4", "hotel_chain": "Muro", "hotel_type": "Web oficial", "analytics_ua": "", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS1", "analytics_status": "Activo", "gtm_id": "GTM-456456", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "", "bing_status": "Activo", "affilied_id": "", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653338464860" }, "15653339235410": { "hotel_id": "567", "hotel_name": "Hotel 5", "hotel_chain": "Flor", "hotel_type": "Web oficial", "analytics_ua": "UA-789456-3", "analytics_type": "Universal", "analytics_account": "ANALYTICS8", "analytics_status": "Activo", "gtm_id": "", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "456456", "bing_status": "Activo", "affilied_id": "789778", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653339235410" }, "15653339602980": { "hotel_id": "567", "hotel_name": "Hotel 5", "hotel_chain": "Flor", "hotel_type": "Motor", "analytics_ua": "", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS1", "analytics_status": "Activo", "gtm_id": "GTM-789456", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "", "bing_status": "Activo", "affilied_id": "", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653339602980" }, "15653339965290": { "hotel_id": "678", "hotel_name": "Hotel 6", "hotel_chain": "Pez", "hotel_type": "Motor", "analytics_ua": "UA-435245-6", "analytics_type": "Asíncrono", "analytics_account": "ANALYTICS1", "analytics_status": "Activo", "gtm_id": "", "gtm_status": "Activo", "ads_id": "", "ads_conv": "", "ads_external": "No", "ads_status": "Activo", "bing_id": "", "bing_status": "Activo", "affilied_id": "", "affilied_status": "Activo", "comentarios": "", "DT_RowId": "15653339965290" } } )
        )
        location.reload(true);


        // $.ajax({
        //     type: 'GET',
        //     dataType: 'json',
        //     url: 'js/data.json',
        //     data: data,
        //     async: false,
        //     success: function (data) {
        //         localStorage.setItem('trackingStorage', JSON.stringify(data))
        //         location.reload(true);
        //     }
        // });

    }


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Set up the EDITOR


    editor = new $.fn.dataTable.Editor({
        table: "#tracking",
        fields: [{
            label: "ID",
            labelInfo: "Required",
            className: "numeric-input required no-edit",
            name: "hotel_id"
        }, {
            label: "Nombre",
            labelInfo: "Required",
            className: "required no-edit",
            name: "hotel_name"
        }, {
            label: "Cadena",
            className: "no-edit",
            name: "hotel_chain"
        }, {
            label: "Tipo",
            className: "no-edit",
            name: "hotel_type",
            type: "select",
            def: "Web oficial",
            options: ['Web oficial', 'Motor']
        }, {
            label: "UA",
            fieldInfo: "UA-XXXXXX-X",
            name: "analytics_ua"
        }, {
            label: "Tipo",
            name: "analytics_type",
            type: "select",
            def: "Asíncrono",
            options: ['Asíncrono', 'Universal']
        }, {
            label: "Serv. Account",
            name: "analytics_account",
            type: "select",
            def: "ANALYTICS1",
            options: ['ANALYTICS1', 'ANALYTICS2', 'ANALYTICS3', 'ANALYTICS4', 'ANALYTICS5', 'ANALYTICS6', 'ANALYTICS7', 'ANALYTICS8', 'ANALYTICS9', 'ANALYTICS10']
        }, {
            label: "Status",
            name: "analytics_status",
            type: "select",
            def: "Activo",
            options: ['Activo', 'Inactivo']
        }, {
            label: "ID",
            fieldInfo: "GTM-XXXXXX",
            name: "gtm_id"
        }, {
            label: "Status",
            name: "gtm_status",
            type: "select",
            def: "Activo",
            options: ['Activo', 'Inactivo']
        }, {
            label: "ID",
            className: "numeric-input",
            name: "ads_id"
        }, {
            label: "Conv. Label",
            name: "ads_conv"
        }, {
            label: "External Campain",
            name: "ads_external",
            type: "select",
            def: "No",
            options: ['No', 'Sí']
        }, {
            label: "Status",
            name: "ads_status",
            type: "select",
            def: "Activo",
            options: ['Activo', 'Inactivo']
        }, {
            label: "ID",
            className: "numeric-input",
            name: "bing_id"
        }, {
            label: "Status",
            name: "bing_status",
            type: "select",
            def: "Activo",
            options: ['Activo', 'Inactivo']
        }, {
            label: "ID",
            className: "numeric-input",
            name: "affilied_id"
        }, {
            label: "Status",
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

        scrollX: false,

        // edit
        dom: "<'tracking-header default-box' fB>r<'tracking't><'flex-space-between tracking-footer'ip>",
        data: $.map(trackingStorage, function (value, key) {
            return value;
        }),
        columns: [{ // Checkbox select column
                data: null,
                defaultContent: '',
                className: 'checkbox-container',
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
            style: '',
            selector: 'td.checkbox-container'
        },
        // select: true,
        buttons: [{
                extend: "create",
                className: "btn btn-primary",
                editor: editor
            },
            {
                extend: "edit",
                className: "btn btn-primary",
                editor: editor
            },
            {
                extend: "remove",
                className: "btn btn-primary",
                editor: editor
            }
        ],
        oLanguage: {
            sSearch: ""
        }
    });


    // Activate an inline edit on click of a table cell

    table.on('click', 'tbody td.editable', function (e) {
        // editor.inline(this);
        editor.inline(this, {
            onBlur: 'submit'
        });
    });



    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAGINATION


    // Styles
    function paginationStyle() {
        $('.paginate_button').addClass('btn btn-default');
        $('.paginate_button.current').addClass('btn btn-primary');
    } 
    paginationStyle();

    table.on('draw', function () {
            
        paginationStyle();

    });
    

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CUSTOM SELECT


    // Modificaciones en el selector de Datatable

    table.on('user-select', function (e, dt, type, cell, originalEvent) { // CUSTOM BASIC SELECT/ DESELECT (target item)
        
        e.preventDefault(); // previene todo
        var target = $(originalEvent.target.closest("tr")); // row target

        if (! target.is('.selected')) { // si no está seleccionado se selecciona

            table.row( target ).select();
        } else {

            table.row( target ).deselect();
        }

        // Modify select all

        if (table.rows({ selected: true, page: 'current' })[0].length == table.rows({ page: 'current' })[0].length) {

            console.log('todos');
            $('.js-multi-select').removeClass('some-selected');
            $('.js-multi-select').addClass('all-selected');

        } else if ( table.rows({ selected: true, page: 'current' })[0].length ) {

            console.log('alguno');
            $('.js-multi-select').removeClass('all-selected');
            $('.js-multi-select').addClass('some-selected');

        } else if (table.rows({ selected: false, page: 'current' })[0].length) {

            console.log('no queda ninguno');
            $('.js-multi-select').removeClass('all-selected');
            $('.js-multi-select').removeClass('some-selected');
        } 

    });

    // Select / Deselect all

    $('.js-multi-select').on('click', function() {
        
        if (table.rows({ selected: true, page: 'current' })[0].length ) {

            table.rows('.selected', { page: 'current' }).deselect();
            $(this).removeClass('some-selected');
            $(this).removeClass('all-selected');
        } else {

            table.rows({ page: 'current' }).select();
            $(this).addClass('all-selected');
        }
    });

    table.on('select', function (e, dt, row, indexes) { // SELECT GROUP

        var target = table.row(indexes).nodes().to$();
        var next = target.next(); // siguiente row

        if (!next.is('.selected, .group')) { // selecciona si no está seleccionada o es group

            table.row(next).select();
        }
    });

    table.on('deselect', function (e, dt, row, indexes) { // DESELECT GROUP

        var target = table.row(indexes).nodes().to$();
        var next = target.next(); // siguiente row

        table.row($(next)).deselect(); // deselecciona la siguiente
    });


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ FORM MODIFICATIONS


    table.on('buttons-action', function (e, buttonApi, dataTable, node, config) {


        // ----> DISABLE / ENABLE HOTEL INPUTS

        if ( buttonApi.text() == 'New' ) { // NEW form

            $('.DTE_Field.no-edit input').attr("disabled", false);
            $('.DTE_Field.no-edit select').attr("disabled", false);

            $('.DTE_Form_Buttons button').attr("disabled", true); // disable submit button for require inputs validation
        
        } else if ( buttonApi.text() == 'Edit' ) { // EDIT form

            $('.DTE_Field.no-edit input').attr("disabled", true);
            $('.DTE_Field.no-edit select').attr("disabled", true);
        }

        // ----> FORM DIVISOR AND TYPE FIELDS

        if ((buttonApi.text() == 'New') || (buttonApi.text() == 'Edit') && (!$('DTE_Field_divisor').length)) { // NEW & EDIT form

            $('.DTE_Field_Name_analytics_ua').before("<div class='DTE_Field_divisor'><span>Google Analytics</span></div>");
            $('.DTE_Field_Name_gtm_id').before("<div class='DTE_Field_divisor'><span>Google GTM</span></div>");
            $('.DTE_Field_Name_ads_id').before("<div class='DTE_Field_divisor'><span>Google ADS</span></div>");
            $('.DTE_Field_Name_bing_id').before("<div class='DTE_Field_divisor'><span>Bing</span></div>");
            $('.DTE_Field_Name_affilied_id').before("<div class='DTE_Field_divisor'><span>Affilied</span></div>");

            $('.DTE_Field.required input').attr("required", "true");
            $('.DTE_Field.numeric-input input').attr("type", "number");
        }

        // ----> REQUIRED INPUTS 
        
        $('.required input').on('blur', function() {
            
            $('.required input').each( function() {

                if ( $(this).val() == "" ) {
                    $('.DTE_Form_Buttons button').attr("disabled", true);
                    return false;
                } else {
                    $('.DTE_Form_Buttons button').attr("disabled", false);
                }
            });
        });


    });


  });

