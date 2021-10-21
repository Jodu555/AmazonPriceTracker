const tokens = new Map();

function addToken(token, user) {
	tokens.forEach((value, key) => {
		if (JSON.stringify(value) == JSON.stringify(user)) {
			tokens.delete(key);
		}
	});
	tokens.set(token, user);
}

function removeToken(token) {
	tokens.delete(token);
}

function getUser(token) {
	return tokens.get(token);
}

function authentication(req, res, next) {
	const token = req.headers['auth-token'];
	if (token) {
		if (getUser(token)) {
			req.credentials = {
				token,
				user: getUser(token),
			};
			next();
		} else {
			next(new Error('Invalid auth-token'))
		}
	} else {
		next(new Error('Missing auth-token in headers'));
	}
}

module.exports = {
	addToken,
	removeToken,
	getUser,
	authentication,
};
