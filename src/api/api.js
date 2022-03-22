export const getPosts =  () => {
  return fetch(`https://gorest.co.in/public/v2/posts`,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer 06d81240c2ee7e3dd5fe72b84251f2bb37bd3a2135a2afdeb691f5097d7f85f3`
    },
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const createPost = (userId,post) => {
    return fetch(`https://gorest.co.in/public/v2/users/${userId}/posts`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer 06d81240c2ee7e3dd5fe72b84251f2bb37bd3a2135a2afdeb691f5097d7f85f3`
        },
        body: JSON.stringify(post)
    })
        .then(response => {
            console.log(post)
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const updatePost = (postId,post) => {
    return fetch(`https://gorest.co.in/public/v2/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer 06d81240c2ee7e3dd5fe72b84251f2bb37bd3a2135a2afdeb691f5097d7f85f3`
        },
        body: JSON.stringify(post)
    })
        .then(response => {
            console.log(post)
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const getPost =  (postId) => {
    return fetch(`https://gorest.co.in/public/v2/posts/${postId}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer 06d81240c2ee7e3dd5fe72b84251f2bb37bd3a2135a2afdeb691f5097d7f85f3`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };

export const deletePost = (postId) => {
    return fetch(`https://gorest.co.in/public/v2/posts/${postId}`,{
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer 06d81240c2ee7e3dd5fe72b84251f2bb37bd3a2135a2afdeb691f5097d7f85f3`

        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {return err;});
  };


//User
export const getUsers =  () => {
  return fetch(`https://gorest.co.in/public/v2/users`,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer 06d81240c2ee7e3dd5fe72b84251f2bb37bd3a2135a2afdeb691f5097d7f85f3`
    },
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const getUserPosts =  (userId) => {
    return fetch(`https://gorest.co.in/public/v2/users/${userId}/posts`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer 06d81240c2ee7e3dd5fe72b84251f2bb37bd3a2135a2afdeb691f5097d7f85f3`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };
export const deleteUser = (userId) => {
    return fetch(`https://gorest.co.in/public/v2/users/${userId}`,{
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer 06d81240c2ee7e3dd5fe72b84251f2bb37bd3a2135a2afdeb691f5097d7f85f3`

        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {return err;});
};
export const createUser = (user) => {
    return fetch(`https://gorest.co.in/public/v2/users`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer 06d81240c2ee7e3dd5fe72b84251f2bb37bd3a2135a2afdeb691f5097d7f85f3`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};


export const updateUser = (userId,user) => {
    return fetch(`https://gorest.co.in/public/v2/users/${userId}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer 06d81240c2ee7e3dd5fe72b84251f2bb37bd3a2135a2afdeb691f5097d7f85f3`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const getComments =  (postId) => {
    return fetch(`https://gorest.co.in/public/v2/posts/${postId}/comments`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer 06d81240c2ee7e3dd5fe72b84251f2bb37bd3a2135a2afdeb691f5097d7f85f3`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };