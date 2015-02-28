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


});

var typewatch = (function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

function get_autocomplete(queryString){

    document.dataCache=Array();
    $.get('https://keybase.io/_/api/1.0/user/autocomplete.json?'+queryString, function( data ) {

        document.dataCache['data']=data;

        var autohtml='';
        autohtml+='<table class="table table-hover">'+
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
            autohtml+='<tr><td><img src="'+picurl+'" alt="contact" class="img-circle small-avatar hidden-phone" />';
            autohtml+='<a href="user-profile.html" class="name">'+identity.components.username.val+'</a></td>';
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

        $('.name').html(document.dataCache['data'].them[0].profile.full_name);
        $('.identity').html(document.dataCache['data'].them[0].id);
        $('.avatar').attr("src",document.dataCache['data'].them[0].pictures.primary.url);
        $('.biopara').html(document.dataCache['data'].them[0].profile.bio);


        var proofhtml='';
        proofhtml+='<table>';
        var obj=document.dataCache['data'].them[0].proofs_summary.all;
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
            proofhtml+="<tr><td>"+icon+"</td><td class='bigtext'>"+proof.proof_type+"</td></tr>"
        });
        proofhtml+="</table>"

        $('.identity').html(proofhtml);

    });
}