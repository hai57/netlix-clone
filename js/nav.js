const createNav = () => {
    let nav = document.querySelector('.navbar');

    
    nav.innerHTML = `
        <div class="navbar-brand">
            <h1 class="logo">ARIA</h1>
            <h2 class="DN">ĐÀ NẴNG</h2>
        </div>

        <div class="navbar-nav-items">
          
        <a class="user-nav">
        <img class="logo-user" id="user-img" src="img/user.png" alt="">
          <div class="login-logout-popup hide">
          <p class = "account-info">Log in as, name</p>
          <button id="user-btn" >Log out</button>
          </div>
        </a>
        <div class="seller-nav hide">
          <img class="logo-seller" id="seller-img" src="img/seller.png" alt="">
          <div class="seller-popup hide">
            <p class = "seller-link">Want to be a <a href="/seller">seller</a></p>
          </div>
        </div>
        </div>
    `;
}

createNav();

// nav popup
const userImageButton = document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');
const sellerImageButton = document.querySelector('#seller-img');
const sellerPop = document.querySelector('.seller-popup');
const sellertext = document.querySelector('.seller-link');
const sellerNavShow = document.querySelector('.seller-nav');

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
})
sellerImageButton.addEventListener('click', () => {
  sellerPop.classList.toggle('hide');
})

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if(user != null) {
        //mean user log in
        popuptext.innerHTML = `log in as, ${user.name}`;
        actionBtn.innerHTML = 'log out';
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.reload();
        })
        sellerNavShow.classList.remove('hide');
    } else {
        //user is log out
        popuptext.innerHTML = 'log in to place order';
        actionBtn.innerHTML = 'log in';
        actionBtn.addEventListener('click', () => {
                location.href = '/login';
        })
    }
}