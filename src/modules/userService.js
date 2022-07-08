export class UserService {
    getUsers() {
        return fetch('http://localhost:1054/users').then(res => res.json());
    }

    addUser(user) {
        return fetch('http://localhost:1054/users', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user)
        }).then(res => res.json());
    }

    removeUser(id) {
        return fetch(`http://localhost:1054/users/${id}`, {
            method: 'DELETE'
        }).then(res => res.json());
    }

    changeUser(id, data) {
        return fetch(`http://localhost:1054/users/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        }).then(res => res.json());
    }

    getUser(id) {
        return fetch(`http://localhost:1054/users/${id}`).then(res => res.json());
    }

    editUser(id, user) {
        return fetch(`http://localhost:1054/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json",
            },
        }).then(res => res.json());
    }

    filterUsers(filterOption) {
        return fetch(`http://localhost:1054/users?${filterOption}=true`).then(res => res.json());
    }

    getSortUsers(sortOption) {
        return fetch(`http://localhost:1054/users?_sort=${sortOption.name}&_order=${sortOption.value}`).then(res => res.json());
    }

    getSearchUsers(str) {
        return fetch(`http://localhost:1054/users?name_like=${str}`).then(res => res.json());
    }
}