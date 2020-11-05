const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 10;
let page = 1;
async function getPosts() {
  const res = await fetch(`
  https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}
  `);
  return res.json();
}

//show posts in DOM
async function showPosts() {
  const posts = await getPosts();
  posts.forEach(post=>{
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="post-number">${post.id}</div>
      <div class="post-info">
        <div class="post-title">${post.title}</div>
        <div class="post-body">
        ${post.body}
        </div>
      </div>
    `;

    postContainer.appendChild(postEl)
  })
}

showPosts();

function showLoading() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}
window.addEventListener('scroll',()=>{

  const {scrollTop,scrollHeight,clientHeight} = document.documentElement;

  let scrollTotal = scrollTop + clientHeight;
  if (scrollTotal >= scrollHeight) {
    showLoading();
  }
})

filter.addEventListener('input',(e)=>{
  let search = e.target.value.toLowerCase();
  let posts = document.querySelectorAll('.post')
  
  posts.forEach(post=>{
    let title = post.querySelector('.post-title').innerText.toLowerCase();
    let body = post.querySelector('.post-body').innerText.toLowerCase();
    if (title.indexOf(search) > -1 || body.indexOf(search) > -1) {
      post.style.display = 'flex'
    }else{
      post.style.display = 'none'
    }

  })
})