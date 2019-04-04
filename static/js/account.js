(function(){
    let = document.getElementById('show-pass');
    show-pass.addEventListener('click', showPass);
    
    function showPass() {
        let x = document.getElementById('password');
        if (x.type === 'password') {
            x.type = 'text';
        } else {
            x.type = 'password';
        }
    }
}){}