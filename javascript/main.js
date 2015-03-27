/**********************************************************************************************
 *
 * Document ready function
 *
 **********************************************************************************************/

$(document).ready(function ()
{
    $('#user-list').show();
    $('#user-profile').hide();
    $('#usersearch').val('');

    get_autocomplete("q=anthony")

    $('#usersearch').keypress(function() {
        typewatch(function () {
            var searchInput = $('#usersearch').val();
            get_autocomplete("q="+searchInput);
        }, 500);
    });

    $(document).on('click','.idname', function(){
        get_lookup('username='+$(this).attr('id'));
        $('#user-list').hide();
        $('#user-profile').show();
    });

    $('.menu').on('click',function(){
        switch($(this).attr('id')){

            case 'menu_home':
                $('#user-list').show();
                $('#user-profile').hide();
                break;

            case 'menu_citizenlist':
                break;

            case 'menu_citizenform':
                break;

            case 'menu_citizenprofile':
                break;

            case 'menu_encrypt':
                break;

            case 'menu_decrypt':
                break;

        }
    })

   $('.loginbtn').on('click',function(){
        var username=document.dataCache.data.them.basics.username;
        $('#username').html(username);
        //get_salt('email_or_username='+username+"&csrf_token="+document.dataCache.data.csrf_token);
        get_salt('email_or_username='+username,document.dataCache.data.csrf_token);
    })

});

var typewatch = (function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();


function get_salt(queryString,xsrf){

    /*$.get('https://keybase.io/_/api/1.0/getsalt.json?' + queryString, function(data){
        document.dataCache['salt'] = data;
        var a=0;
    });*/

    $.ajax({
        data:{requrl:'https://keybase.io/_/api/1.0/getsalt.json?'+queryString+'&csrf_token='+xsrf},
        url:"php/proxy.php",
        dataType:"json",
        async:false,
        success:function(data) {
            document.dataCache['salt'] = data;
            $('#salt').html(data.salt);

            var scrypt = scrypt_module_factory();
            var pwh=scrypt.crypto_scrypt(scrypt.encode_utf8("pleaseletmein"),
                scrypt.encode_utf8(data.salt),
                Math.pow(2,15), 8, 1, 224);
            //pwh = scrypt.crypto_scrypt('passphrase', scrypt.hex2bin(data.salt), N=2^15, r=8, p=1, dkLen=224);
            alert(scrypt.to_hex(pwh));
        },
        error:function(xhr, ajaxOptions, thrownError) {
           //alert(xhr.statusText);
        }
    });

    /*$.ajax({
        url:'https://keybase.io/_/api/1.0/getsalt.json?'+queryString,
        headers:{ "X-CSRF-Token" : xsrf },
        dataType:"jsonp",
        async:false,
        success:function(data) {
            document.dataCache['salt'] = data;
            $('#salt').html(data.salt);
        },
        error:function(xhr, ajaxOptions, thrownError) {
            alert(xhr.statusText);
        }
    });*/

}

function get_autocomplete(queryString){

    document.dataCache=Array();
    $.get('https://keybase.io/_/api/1.0/user/autocomplete.json?'+queryString, function( data ) {

        document.dataCache['data']=data;

        var autohtml='';
        autohtml+='<table class="table table-hover" id="idtable">'+
        '<thead>'+
        '<tr>'+
        '<th class="sortable">'+
        'Identity'+
        '</th>'+
        '<th class="sortable">'+
        '<span class="line"></span>Full Name'+
        '</th>'+
        '<th class="sortable">'+
        '<span class="line"></span>Twitter'+
        '</th>'+
        '<th class="sortable align-right">'+
        '<span class="line"></span>Fingerprint'+
        '</th>'+
        '</tr>'+
        '</thead><tbody>';
        var obj=document.dataCache['data'].completions;
        $.each( obj, function( index, identity ) {

            var picurl='';
            if (identity.thumbnail == null){
                picurl='img/no_image_available.jpg';
            } else {
                picurl=identity.thumbnail;
            }

            var fullname="";
            if (typeof identity.components.full_name != "undefined"){
               fullname=identity.components.full_name.val;
            }

            var twitter="";
            if (typeof identity.components.twitter != "undefined"){
                twitter='<i class="fa fa-twitter ">'+identity.components.twitter.val;
            }

            var fingerprint="";
            if (typeof identity.components.key_fingerprint != "undefined"){
                fingerprint=identity.components.key_fingerprint.val.substr(-16).toUpperCase();
                var fingerprints=fingerprint.split(/(....)/).filter(String)
                fingerprint=fingerprints[0]+' '+fingerprints[1]+' '+fingerprints[2]+' '+fingerprints[3]+' '+'<i class="fa icon-key ">';
            }
            autohtml+='<tr class="idrow" ><td><img src="'+picurl+'" alt="contact" class="img-circle small-avatar hidden-phone" />';
            autohtml+='<a href="#" class="idname" id="'+identity.components.username.val+'">'+identity.components.username.val+'</a></td>';
            autohtml+='<td>'+fullname+'</td> ' +
            '<td>'+twitter+'</td> ' +
            '<td class="align-right"> '+fingerprint+' </td> </tr>'
        });
        autohtml+="</tbody></table>"

        $('#autocomplete').html(autohtml);

    });
}


function get_lookup(queryString){

    document.dataCache=Array();
    $.get('https://keybase.io/_/api/1.0/user/lookup.json?'+queryString, function( data ) {

        document.dataCache['data']=data;

        $('.name').html(document.dataCache['data'].them.profile.full_name);
        $('.identity').html(document.dataCache['data'].them.id);
        $('.avatar').attr("src",document.dataCache['data'].them.pictures.primary.url);
        $('.biopara').html(document.dataCache['data'].them.profile.bio);


        var proofhtml='';
        proofhtml+='<table>';

        var dochtml='';
        dochtml='<table class="table table-hover indented"> <thead> ' +
        '<tr> <th class="col-md-2">Type </th> ' +
        '<th class="col-md-3"> <span class="line"></span>Detail </th> ' +
        '<th class="col-md-3"> <span class="line"></span>Proof </th> </tr> ' +
        '</thead> <tbody>';

        var obj=document.dataCache['data'].them.proofs_summary.all;

        $.each( obj, function( index, proof ) {

            var icon="";
            if (proof.proof_type=='twitter'){
                icon='<i class="fa fa-2x fa-twitter "></i>';
            }
            if (proof.proof_type=='github'){
                icon='<i class="fa fa-2x fa-github "></i>';
            }
            if (proof.proof_type=='reddit'){
                icon='<i class="fa fa-2x fa-reddit"></i>';
            }
            if (proof.proof_type=='coinbase'){
                icon='<i class="fa fa-2x fa-bitcoin "></i>';
            }

            if (proof.proof_type=='generic_web_site'){
                icon='<i class="fa fa-2x fa-globe "></i>';
            }
            proofhtml+="<tr><td>"+icon+"</td><td class='bigtext'><a target='_blank' href='"+proof.service_url+"'>"+proof.nametag+"</a></td></tr>";

            dochtml+="<tr><td>Social Proof</td><td>"+proof.presentation_group+"</td><td><a target='_blank' href='"+proof.human_url+"'>"+proof.presentation_tag+"</a></td></tr>";

        });
        proofhtml+="</table>";
        dochtml+="</tbody></table>";

        $('.identity').html(proofhtml);
        $('#documentlist').html(dochtml);

    });
}