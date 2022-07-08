(()=>{"use strict";const e=e=>{const t=document.getElementById("table-body");t.innerHTML="",e.forEach((e=>{t.insertAdjacentHTML("beforeend",`\n            <tr data-key="${e.id}">\n                <th scope="row">${e.id}</th>\n                <td>${e.name}</td>\n                <td>${e.email}</td>\n                <td>${e.children?"Есть":"Нет"}</td>\n                <td>\n                    <div class="form-check form-switch">\n                        <input class="form-check-input" type="checkbox" role="switch"\n                            id="form-children" ${e.permissions?"checked":""}>\n                    </div>\n                </td>\n                <td>\n                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">\n                    <button type="button" class="btn btn-warning btn-edit">\n                        <i class="bi-pencil-square"></i>\n                    </button>\n                    <button type="button" class="btn btn-danger btn-remove">\n                        <i class="bi-person-x"></i>\n                    </button>\n                </div>\n                </td>\n            </tr>\n        `)}))};window.userService=new class{getUsers(){return fetch("http://localhost:1054/users").then((e=>e.json()))}addUser(e){return fetch("http://localhost:1054/users",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}).then((e=>e.json()))}removeUser(e){return fetch(`http://localhost:1054/users/${e}`,{method:"DELETE"}).then((e=>e.json()))}changeUser(e,t){return fetch(`http://localhost:1054/users/${e}`,{method:"PATCH",body:JSON.stringify(t),headers:{"Content-type":"application/json"}}).then((e=>e.json()))}getUser(e){return fetch(`http://localhost:1054/users/${e}`).then((e=>e.json()))}editUser(e,t){return fetch(`http://localhost:1054/users/${e}`,{method:"PUT",body:JSON.stringify(t),headers:{"Content-type":"application/json"}}).then((e=>e.json()))}filterUsers(e){return fetch(`http://localhost:1054/users?${e}=true`).then((e=>e.json()))}getSortUsers(e){return fetch(`http://localhost:1054/users?_sort=${e.name}&_order=${e.value}`).then((e=>e.json()))}getSearchUsers(e){return fetch(`http://localhost:1054/users?name_like=${e}`).then((e=>e.json()))}},userService.getUsers().then((t=>{e(t)})),(()=>{const t=document.querySelector("form"),n=document.querySelector("#form-name"),r=document.querySelector("#form-email"),s=document.querySelector("#form-children");t.addEventListener("submit",(o=>{if(o.preventDefault(),!t.dataset.method){const o={name:n.value,email:r.value,children:s.checked,permissions:!1};userService.addUser(o).then((()=>{userService.getUsers().then((n=>{e(n),t.reset()}))}))}}))})(),document.getElementById("table-body").addEventListener("click",(t=>{if(t.target.closest(".btn-remove")){const n=t.target.closest("tr").dataset.key;userService.removeUser(n).then((t=>{userService.getUsers().then((t=>{e(t)}))}))}})),document.getElementById("table-body").addEventListener("click",(t=>{if(t.target.closest("input[type=checkbox]")){const n=t.target.closest("tr"),r=n.querySelector("input[type=checkbox]"),s=n.dataset.key;userService.changeUser(s,{permissions:r.checked}).then((t=>{userService.getUsers().then((t=>{e(t)}))}))}})),(()=>{const t=document.getElementById("table-body"),n=document.querySelector("form"),r=document.querySelector("#form-name"),s=document.querySelector("#form-email"),o=document.querySelector("#form-children");t.addEventListener("click",(e=>{if(e.target.closest(".btn-edit")){const t=e.target.closest("tr").dataset.key;userService.getUser(t).then((e=>{r.value=e.name,s.value=e.email,o.value=e.children,n.dataset.method=t}))}})),n.addEventListener("submit",(t=>{if(t.preventDefault(),n.dataset.method){const t=n.dataset.method,c={name:r.value,email:s.value,children:o.checked,permissions:!1};userService.editUser(t,c).then((()=>{userService.getUsers().then((t=>{e(t),n.reset(),n.removeAttribute("data-method")}))}))}}))})(),(()=>{const t=document.getElementById("btn-isChildren"),n=document.getElementById("btn-isPermissions"),r=document.getElementById("btn-isAll");t.addEventListener("click",(()=>{userService.filterUsers("children").then((t=>{e(t)}))})),n.addEventListener("click",(()=>{userService.filterUsers("permissions").then((t=>{e(t)}))})),r.addEventListener("click",(()=>{userService.getUsers().then((t=>{e(t)}))}))})(),(()=>{const t=document.getElementById("sort-is-children");let n=!1;t.style.cursor="pointer",t.addEventListener("click",(()=>{userService.getSortUsers({name:"children",value:n?"asc":"desc"}).then((t=>{e(t)})),n=!n}))})(),(()=>{const t=document.getElementById("search-input"),n=((e,t=300)=>{let n;return(...r)=>{clearTimeout(n),n=setTimeout((()=>{e.apply(void 0,r)}),t)}})((()=>{userService.getSearchUsers(t.value).then((t=>{e(t)}))}),500);t.addEventListener("input",n)})()})();