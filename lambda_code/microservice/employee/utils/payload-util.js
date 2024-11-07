module.exports = {
	success: function (message, obj) {
		return {
			message: message,
			data: obj,
		};
	},
	error: function (status, code, message) {
		return {
			timestamp: Date.now(),
			error: {
				status: status,
				code: code,
				message: message,
			},
		};
	},
};
