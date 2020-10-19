export const fetchPost = (path, body, callback) => {
    const formData = new FormData();
    formData.append("body", JSON.stringify(body));
    fetch(`/api/${path}`,
        {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${sessionStorage.authorization}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            callback(data);
        });
};