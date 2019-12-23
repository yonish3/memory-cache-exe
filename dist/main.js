
const pageLoad = async function(){
    let data = await $.get(`/getWisdom/`)
    $('div').empty().append(data)
}


$('button').on('click', function (){
    pageLoad()
})
