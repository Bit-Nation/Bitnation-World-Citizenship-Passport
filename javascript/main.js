/**********************************************************************************************
 *
 * Document ready function
 *
 **********************************************************************************************/

$(document).ready(function ()
{
	document.dataCache=Array();
 	$.get('https://keybase.io/_/api/1.0/user/lookup.json?usernames=anthonyculligan', function( data ) {
  
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

});