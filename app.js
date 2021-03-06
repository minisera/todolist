const addTask = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

(function(){
  // 初期化処理
  // ローカルストレージに格納されている値を取得し、リストを生成する
  for(var key in localStorage){
      var html = localStorage.getItem(key);
      if (html) {
          list.innerHTML += localStorage.getItem(key);
      }
  }
})();

const saveTaskToLocalStorage = (task, html) => {
  // null は、localStorage に保存しない
  if(html){
      // localStorage は、0 から始まる
      localStorage.setItem(task, html);
      return;
  }
  return;
}

const deleteTaskFromLocalStorage = task => {
  localStorage.removeItem(task);
  return;
}

const createTodoList = task => {
    // HTML テンプレートを生成
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;
    saveTaskToLocalStorage(task, html); 
}

addTask.addEventListener('submit', e => {
    // デフォルトのイベントを無効
    e.preventDefault();

    // タスクに入力した値を空白を除外して格納
    // name属性addのvalueを取得
    const task = addTask.add.value.trim();
    if(task.length) {
        // Todo List の HTML を作成
        createTodoList(task);
        // タスクに入力した文字をクリア
        addTask.reset();
    }
});

// 削除機能
// タスクリストをクリックして、もしdeleteクラスであれば削除する。
list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')){
      console.log(e.target.parentElement)
      e.target.parentElement.remove();
      const task = e.target.parentElement.textContent.trim()
      deleteTaskFromLocalStorage(task);
  }
});

// 検索機能

const filterTasks = (term) => {

    Array.from(list.children)
        // フィルタ条件
        // 条件に一致しない要素は表示しない
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'));
        
        Array.from(list.children)
        // 条件に一致する要素は表示する
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
    // 空白削除かつ、小文字に変換(大文字・小文字の区別をなくす)
    const term = search.value.trim().toLowerCase();
    filterTasks(term);
});