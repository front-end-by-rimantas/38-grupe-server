const handler = {};

handler.account = (data, res) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handler._account[data.httpMethod](data, res);
    }

    return res.end(JSON.stringify('Tavo norimas HTTPmethod yra nepalaikomas'));
}

handler._account = {};

// GET
handler._account.get = (data, res) => {
    return res.end(JSON.stringify('Account: get'));
}

// POST
handler._account.post = (data, res) => {
    return res.end(JSON.stringify('Account: post'));
}

// PUT (kapitalinis info pakeistimas) / PATCH (vienos info dalies pakeitimas)
handler._account.put = (data, res) => {
    return res.end(JSON.stringify('Account: put'));
}

// DELETE
handler._account.delete = (data, res) => {
    return res.end(JSON.stringify('Account: delete'));
}

export default handler;