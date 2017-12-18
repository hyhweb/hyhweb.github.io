$(function() {
    $('#tree-box').panel({
        title:'树组件',
        collapsible:true,
        height:'auto'
    }).tree({
        url:'./../src/data/tree.json',
        /*data: [{
            text: 'Item1',
            state: 'closed',
            children: [{
                text: 'Item11'
            }, {
                text: 'Item12'
            }]
        }, {
            text: 'Item2'
        }]*/

    })
})